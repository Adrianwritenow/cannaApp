export interface Product {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    category: string[];
    created: number[];
    description: string[];
    delivery_and_pickup_info: string[];
    top_rated_effects: string[];
    top_reported_flavors: string[];
    image: number[];
    rating: number[] | [0];
    manufacture: string[];
    brand: string[] | '';
    review_count: number[] | [0];
    price: number[];
    price_label: string[];
    url: string[];
    sponsored: boolean[];
    langcode: string[];
    name: string[];
    status: boolean[];
    uuid: string[];
    _language: string;
    _type: string;
  };
}
