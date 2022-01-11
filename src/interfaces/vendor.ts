import { Dispensary } from './dispensary';
import { Product } from './product';

export interface Vendor {
  listing: Dispensary;
  product: Product;
}
