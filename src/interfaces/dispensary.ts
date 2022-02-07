export interface Dispensary {
  _id: string;
  _index: string;
  _score: number;
  _source: {
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
    monday_hours: string[];
    tuesday_hours: string[];
    licenses?: string[];
    wednesday_hours: string[];
    thursday_hours: string[];
    friday_hours: string[];
    saturday_hours: string[];
    sunday_hours: string[];
    phone_number: string[];
    website: string[];
    postal_code: string[];
    lat: number[];
    lon: number[];
    email: string[];
    coordinates: string[];
    rating: string[];
    reviews_count: number[] | [0];
    sponsored: boolean[];
    langcode: string[];
    time_zone: string[];
    name: string[];
    status: boolean[];
    _language: string;
    _type: string;
    locality: string[];
    administrative_area: string[];
  };
}
