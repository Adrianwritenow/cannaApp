import { Faq } from "./faq";
import { Review } from "./review";

export interface Listing {
  id: string;
  image: string;
  address: string;
  distance: string;
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
