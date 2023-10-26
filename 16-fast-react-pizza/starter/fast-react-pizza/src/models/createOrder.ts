import { ICartItem } from './cartItem';

export interface ICreateOrder {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: ICartItem[];
  position: string;
}
