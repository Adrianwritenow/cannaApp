export interface FilterItem {
  value: string;
  subList?: {
    value: string;
    list?: {
      value: string;
      list?: string[];
    }[];
  }[];
}
export interface Filter {
  value: string;
  list: FilterItem[];
}
