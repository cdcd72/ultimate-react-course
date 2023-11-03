export interface ICabin {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  image?: File;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
  createdAt: Date;
}
