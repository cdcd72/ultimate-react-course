import { Cart } from './cart';

export interface Order {
  id?: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  cart: Cart[];
  orderPrice?: number;
  priorityPrice?: number;
  status?: string;
  //position: string;
  estimatedDelivery?: string;
}
