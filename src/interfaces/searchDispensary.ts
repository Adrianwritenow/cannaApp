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
    field_facebook: string[];
    field_instagram: string[];
    field_twitter: string[];
    field_monday_hours: string[];
    field_tuesday_hours: string[];
    field_wednesday_hours: string[];
    field_thursday_hours: string[];
    field_friday_hours: string[];
    field_saturday_hours: string[];
    field_sunday_hours: string[];
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
    locality: string[];
    administrative_area: string[];
  };
}
