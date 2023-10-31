export interface ICreateCabin {
  name: string;
  description: string;
  image: File;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
}
