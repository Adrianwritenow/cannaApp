import { Dispensary } from '../searchDispensary';
import { Faq } from './../faq';
import { Review } from '../review';

export interface BusinessSlideoverProps {
  dispensary?: Dispensary;
  reviews?: Review[];
  active?: boolean;
  setView?: Function;
  name?: string;
  faqs?: Faq[];
}
