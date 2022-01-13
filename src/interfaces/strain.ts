export interface Strain {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    created: number[];
    description: string[];
    image: number[];
    url: string[];
    langcode: string[];
    featured: boolean[];
    top_rated_effects: string[];
    top_reported_flavors: string[];
    rating: number[];
    review_count: number[];
    name: string[];
    status: boolean[];
    uuid: string[];
    _language: string;
    type: string;
  };
}
