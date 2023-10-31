import supabase, { supabaseUrl } from './supabase';
import { ICabin } from '../models/ICabin';
import { ICreateCabin } from '../models/ICreateCabin';

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
      image: item.image,
      regularPrice: item.regular_price,
      discount: item.discount,
      maxCapacity: item.max_capacity,
      createdAt: new Date(item.created_at),
    };
  });
}

export async function createCabin(cabin: ICreateCabin): Promise<ICabin> {
  // Prevent unexpect bucket path
  const imageName = `${Math.random()}-${cabin.image.name}`.replace('/', '');

  // 1. Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([
      {
        name: cabin.name,
        description: cabin.description,
        image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`,
        regular_price: cabin.regularPrice,
        discount: cabin.discount,
        max_capacity: cabin.maxCapacity,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be created!');
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, cabin.image);

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
    image: data.image,
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
