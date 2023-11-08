import { User } from '@supabase/supabase-js';

import supabase, { supabaseUrl } from './supabase';
import { ILogin } from '../models/ILogin';
import { IRegister } from '../models/IRegister';
import { IUpdateUser } from '../models/IUpdateUser';

export async function register(info: IRegister): Promise<User | null> {
  const { data, error } = await supabase.auth.signUp({
    email: info.email,
    password: info.password,
    options: {
      data: {
        fullName: info.fullName,
        avatar: '',
      },
    },
  });
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function login(info: ILogin): Promise<User | null> {
  const { data, error } = await supabase.auth.signInWithPassword(info);
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function getCurrentUser(): Promise<User | null> {
  // 1. Check session is valid
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  // 2. Get user info again
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({
  fullName,
  avatar,
  password,
}: {
  fullName?: string;
  avatar?: File | null;
  password?: string;
}): Promise<User | null> {
  // 1. Update password or fullName
  let updateData: IUpdateUser | undefined = undefined;

  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  if (!updateData) return null;

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  if (!avatar) return data?.user;

  // 2. Upload the avatar image
  const imageName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(imageName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const { data: data2, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`,
    },
  });

  if (error2) throw new Error(error2.message);

  return data2?.user;
}
