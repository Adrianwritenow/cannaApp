export interface Strain {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    id: number;
    created: number[];
    description: string[];
    grow_information?: string[];
    image: string[];
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

export interface StrainResults {
  results: Strain[];
  total: number;
}
