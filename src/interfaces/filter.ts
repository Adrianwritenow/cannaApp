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

export interface Filters {
  filters: Array<FilterItem>;
  label: string;
  type?: string;
  id: string;
  values?: string[];
  setFieldValue?: Function;
}
