export interface Feature {
  bbox: number[];
  center: number[];
  geometry: { type: string; coordinates: number[] };
  id: string;
  language: string;
  place_name: string;
  text: string;
}
