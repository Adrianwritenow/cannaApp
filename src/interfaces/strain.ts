export interface Strain {
  _id: string;
  _index: string;
  _score: number;
  _source: {
    created: number[];
    description: string[];
    field_image: number[];
    field_source_url: string[];
    langcode: string[];
    field_featured: boolean[];
    field_top_rated_effects: string[];
    field_top_reported_flavors: string[];
    field_rating: number[];
    field_review_count: number[];
    name: string[];
    status: boolean[];
    uuid: string[];
    _language: string;
    type: string;
  };
}
