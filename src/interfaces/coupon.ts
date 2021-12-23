import { Image } from "./image";
import { Listing } from "./listing";
import { Product } from "./product";

export interface Coupon {
  code: string;
  saving: string;
  products: Product[];
  business: Listing;
  image: Image;
}
