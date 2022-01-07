import { Faq } from '../faq';
import { Product } from '../searchProduct';
import { Review } from '../review';

export interface ProductSlideoverProps {
  product?: Product;
  reviews?: Review[];
  active?: boolean;
  setView?: Function;
  name?: string;
  faqs?: Faq[];
  button?: boolean;
}
