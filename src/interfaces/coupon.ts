import { Dispensary } from './searchDispensary';
import { Image } from './image';
import { Product } from './searchProduct';

export interface Coupon {
  code: string;
  saving: string;
  products: Product[];
  business: Dispensary;
  image: Image;
}
