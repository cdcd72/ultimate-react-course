export interface ICreateEditCabin {
  name: string;
  description: string;
  image_url?: string;
  image?: File;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
}
