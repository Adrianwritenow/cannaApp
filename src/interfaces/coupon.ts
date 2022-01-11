import { Dispensary } from './dispensary';
import { Image } from './image';
import { Product } from './product';

export interface Coupon {
  code: string;
  saving: string;
  products: Product[];
  business: Dispensary;
  image: Image;
}
