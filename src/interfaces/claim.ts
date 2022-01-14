export interface BusinessAddress {
  line1: string;
  city: string;
  state: string;
  zip: string | number;
  country: string;
}

export interface ClaimState {
  step: string;
  business: {
    id: number | string;
    name: string;
  };
  phone: string;
  website: string;
  categories: string;
  address: BusinessAddress;
}
