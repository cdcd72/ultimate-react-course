import supabase from './supabase';
import { ICabin } from '../models/ICabin';

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

export async function deleteCabin(id: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted!');
  }
}
