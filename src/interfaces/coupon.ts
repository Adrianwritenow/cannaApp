export interface Coupon {
  _id: string;
  _index: string;
  _score: Float32Array;
  _source: {
    deal_image: string[];
    discount: string[];
    dispensary: number[];
    display_discount: boolean[];
    likes_count: string[];
    price: number[];
    publish_start: number[];
    showcased: boolean[];
    slug: string[];
    title: string[];
    _language: string;
  };
}
