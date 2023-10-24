import { ICartItem } from './cartItem';

export interface IOrder {
  id?: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: ICartItem[];
  orderPrice?: number;
  priorityPrice?: number;
  status?: string;
  //position: string;
  estimatedDelivery?: string;
}
