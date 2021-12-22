import { Listing } from "../listing";

export interface SlideOverProps {
  business?: Listing;
  active?: boolean;
  setView?: Function;
  label?: string;
  buttonLabel?: string;
  type?: string;
}
