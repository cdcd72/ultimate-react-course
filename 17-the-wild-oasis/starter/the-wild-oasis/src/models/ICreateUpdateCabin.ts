export interface ICreateUpdateCabin {
  name: string;
  description: string;
  image_url?: string;
  image?: File;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
}
