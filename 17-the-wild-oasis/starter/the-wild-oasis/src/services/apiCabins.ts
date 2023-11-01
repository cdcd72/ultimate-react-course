import supabase, { supabaseUrl } from './supabase';
import { ICabin } from '../models/ICabin';
import { ICreateEditCabin } from '../models/ICreateEditCabin';
import { PostgrestError } from '@supabase/supabase-js';

export async function getCabins(): Promise<ICabin[]> {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded!');
  }
  return data.map((item) => {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      image_url: item.image_url,
      regularPrice: item.regular_price,
      discount: item.discount,
      maxCapacity: item.max_capacity,
      createdAt: new Date(item.created_at),
    };
  });
}

export async function createEditCabin(
  cabin: ICreateEditCabin,
  id?: number
): Promise<ICabin> {
  const hasImageUrl = cabin.image_url !== '';
  const hasImage = cabin.image !== undefined;
  // Prevent unexpect bucket path
  const imageName = `${Math.random()}-${cabin.image?.name}`.replace('/', '');

  let imagePath: string | undefined = '';

  if (hasImage) {
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  } else {
    if (hasImageUrl) {
      imagePath = cabin.image_url;
    }
  }

  let data;
  let error: PostgrestError | null = null;

  // 1-A. Create cabin
  if (!id) {
    const { data: insertedData, error: insertedError } = await supabase
      .from('cabins')
      .insert([
        {
          name: cabin.name,
          description: cabin.description,
          image_url: imagePath,
          regular_price: cabin.regularPrice,
          discount: cabin.discount,
          max_capacity: cabin.maxCapacity,
        },
      ])
      .select()
      .single();

    data = insertedData;
    error = insertedError;
  }

  // 1-B. Update cabin
  if (id) {
    const { data: updatedData, error: updatedError } = await supabase
      .from('cabins')
      .update({
        name: cabin.name,
        description: cabin.description,
        image_url: imagePath,
        regular_price: cabin.regularPrice,
        discount: cabin.discount,
        max_capacity: cabin.maxCapacity,
      })
      .eq('id', id)
      .select()
      .single();

    data = updatedData;
    error = updatedError;
  }

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created!');
  }

  if (!hasImage) return data;

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabin.image!);

  // 3. Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error(
      'Cabin image could not be uploaded and the cabin was not created!'
    );
  }

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    image_url: data.image_url,
    regularPrice: data.regular_price,
    discount: data.discount,
    maxCapacity: data.max_capacity,
    createdAt: new Date(data.created_at),
  };
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted!');
  }
}
