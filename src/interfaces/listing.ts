export interface Listing {
  id: string;
  image: string;
  distance: string;
  openTime: string;
  closeTime: string;
  amenities: Array<string>;
  category: string;
  href: string;
  name: string;
  rating: number;
  reviewCount: number;
}
