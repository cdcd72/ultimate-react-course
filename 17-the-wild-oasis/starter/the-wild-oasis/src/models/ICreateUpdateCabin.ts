export interface ICreateUpdateCabin {
  name: string;
  description: string;
  imageUrl?: string;
  image?: File;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
}
