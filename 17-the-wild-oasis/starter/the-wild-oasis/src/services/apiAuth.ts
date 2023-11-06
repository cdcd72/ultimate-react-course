import supabase from './supabase';
import { ILogin } from '../models/ILogin';
import { User } from '@supabase/supabase-js';

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
