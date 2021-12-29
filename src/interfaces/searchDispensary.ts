export interface Dispensary {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    address_line1: string[];
    address_line2: string[];
    country_code: string[];
    created_: number[];
    description: string[];
    field_delivery_and_pickup_info: string[];
    field_image: number[];
    field_phone_number: string[];
    postal_code: string[];
    field_email: string[];
    field_coordinates: string[];
    field_rating: string[] | ['0'];
    field_reviews_count: number[] | [0];
    field_source_url: string[];
    field_sponsored: boolean[];
    langcode: string[];
    name: string[];
    status: boolean[];
    _language: string;
    _type: string;
  };
}
