import { Dispensary } from './searchDispensary';
import { Faq } from './faq';
import { Review } from './review';

export interface Listing {
  id: string;
  image: string;
  address: string;
  distance: string;
  coords?: {
    lat?: number;
    lng?: number;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  openTime: string;
  about: string;
  closeTime: string;
  amenities: Array<string>;
  category: string;
  href: string;
  name: string;
  rating: number;
  reviewCount: number;
  reviews: Array<Review>;
  faqs: Array<Faq>;
}

export interface ListingProps {
  listing: Dispensary;
  amenities?: boolean;
  classNames?: string;
  discount?: string;
}

export interface DispensaryProps {
  listing: Dispensary;
  amenities?: boolean;
  classNames?: string;
  discount?: string;
}
