export interface Product {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    id: number;
    category: string[];
    created: number[];
    description: string[];
    delivery_and_pickup_info: string[];
    top_rated_effects: string[];
    top_reported_flavors: string[];
    rating: number[] | [0];
    manufacture: string[];
    brand: string[] | '';
    reviews_count: number[] | [0];
    price: number[];
    price_label: string[];
    image: string[];
    sponsored: boolean[];
    langcode: string[];
    name: string[];
    status: boolean[];
    uuid: string[];
    _language: string;
    _type: string;
  };
}

export interface ProductResults {
  results: Product[];
  total: number;
}
