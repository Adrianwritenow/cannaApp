import { Dispensary } from './searchDispensary';
import { Product } from './searchProduct';

export interface Vendor {
  listing: Dispensary;
  product: Product;
}
