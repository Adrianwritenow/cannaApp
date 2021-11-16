import { Cannabanoids } from "./cannabanoids";
import { Image } from "./image";
import { Specification } from "./Specification";
export interface Product {
  id: number;
  imageSrc: string;
  about: string;
  imageAlt: string;
  type: string;
  category: string;
  brand: string;
  vendor: string;
  specifications: Array<Specification>;
  href: string;
  name: string;
  rating: number;
  price: string;
  reviewCount: number;
  images?: Array<Image>;
  cannabanoids?: Cannabanoids;
}
