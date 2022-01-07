export interface Product {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    category: string[];
    created_1: number[];
    description: string[];
    field_delivery_and_pickup_info: string[];
    field_top_rated_effects: string[];
    field_top_reported_flavors: string[];
    field_image: number[];
    field_rating: number[] | [0];
    field_brand: string[] | '';
    field_review_count: number[] | [0];
    field_price: string[];
    field_price_label: string[];
    field_source_url_1: string[];
    field_sponsored: boolean[];
    langcode_1: string[];
    name_1: string[];
    status_1: boolean[];
    uuid: string[];
    _language: string;
    _type: string;
  };
}
