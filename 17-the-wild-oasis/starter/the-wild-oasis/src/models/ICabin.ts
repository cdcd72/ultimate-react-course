export interface ICabin {
  id: number;
  name: string;
  description: string;
  image: string;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
  createdAt: Date;
}
