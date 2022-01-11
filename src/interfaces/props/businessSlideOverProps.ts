import { Dispensary } from '../dispensary';
import { Faq } from './../faq';
import { Review } from '../review';

export interface BusinessSlideoverProps {
  dispensary?: Dispensary;
  reviews?: Review[];
  active?: boolean;
  setView?: Function;
  name?: string;
  faqs?: Faq[];
  button?: boolean;
}
