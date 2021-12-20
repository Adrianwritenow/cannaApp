import { Listing } from "../listing";

export interface BusinessSlideoverProps {
  business: Listing;
  active?: boolean;
  setView?: Function;
  label?: string;
  buttonLabel?: string;
}
