import { Cart } from './cart';

export interface Order {
  id: string;
  customer: string;
  // phone: string;
  // address: string;
  priority: boolean;
  estimatedDelivery: string;
  cart: Cart[];
  //position: string;
  orderPrice: number;
  priorityPrice: number;
  status: string;
}
