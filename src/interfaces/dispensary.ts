import { ResultWithLocationHours } from './locationData';

export type Dispensary = ResultWithLocationHours & {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    id: number;
    address_line1: string[];
    address_line2: string[];
    amenities: string[];
    country_code: string[];
    created_: number[];
    description: string[];
    delivery_and_pickup_info: string[];
    image: string[];
    facebook: string[];
    instagram: string[];
    twitter: string[];
    licenses?: string[];
    license_type: string[];
    featured: [boolean];
    phone_number: string[];
    website: string[];
    postal_code: string[];
    products?: number[];
    lat: number[];
    lon: number[];
    email: string[];
    coordinates: string[];
    rating: number[];
    reviews_count: number[] | [0];
    sponsored: boolean[];
    langcode: string[];
    name: string[];
    status: boolean[];
    _language: string;
    _type: string;
    locality: string[];
    administrative_area: string[];
  };
};

export interface DispensaryResults {
  results: Dispensary[];
  total: number;
}
