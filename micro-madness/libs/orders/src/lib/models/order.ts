import { OrderItem } from './order-item';
import { User } from '@micro-madness/users';

export class Order {
  id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  user?: any;
  dateOrdered?: string;
}
