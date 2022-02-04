import { ResultWithLocationHours } from './locationData';

export type Coupon = ResultWithLocationHours & {
  _id: string;
  _index: string;
  _score: Float32Array;
  _source: {
    id: number;
    deal_image: string[];
    discount: string[];
    dispensary: number[];
    dispensary_name: string[];
    dispensary_image: string[];
    dispensary_rating: number[];
    dispensary_city: string[];
    dispensary_state: string[];
    dispensary_reviews_count: number[] | [0];
    display_discount: boolean[];
    likes_count: string[];
    price: number[];
    publish_start: number[];
    showcased: boolean[];
    slug: string[];
    title: string[];
    type: string[];
    category: string[];
    rating: number[];
    lat: number[];
    lon: number[];
    _language: string;
  };
};
export interface DealsState {
  deals: Coupon[] | [];
  featuredDeals: Coupon[] | [];
  filters: [];
  total: number;
  activeFilter?: string;
}
