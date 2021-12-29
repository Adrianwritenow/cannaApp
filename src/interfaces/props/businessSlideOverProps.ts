import { Dispensary } from '../searchDispensary';
import { Faq } from './../faq';
import { Listing } from '../listing';

export interface BusinessSlideoverProps {
  dispensary?: Dispensary;
  active?: boolean;
  setView?: Function;
  name?: string;
  faqs?: Faq[];
}
