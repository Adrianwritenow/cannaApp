import { Dispensary } from "../searchDispensary";
import { Listing } from "../listing";

export interface BusinessSlideoverProps {
  dispensary?: Dispensary;
  active?: boolean;
  setView?: Function;
}
