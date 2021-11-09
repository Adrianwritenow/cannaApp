export interface Strain {
  id: string;
  images: Array<string>;
  title: string;
  type: string;
  about: string;
  rating: number;
  reviewCount: number;
  cannabanoids: {
    thc: number;
    cbd: number;
  };
  effects: {
    type: string;
    effectPercent: number;
  };
  growing: {
    min: number;
    max: number;
  };
}
