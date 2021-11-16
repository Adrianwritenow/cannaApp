import { Listing } from "./listing";
import { Product } from "./product";

export interface Vendor {
  listing: Listing;
  product: Product;
}
