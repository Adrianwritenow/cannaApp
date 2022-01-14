import { ClaimState } from './claim';

export interface BusinessState {
  business: any; // @TODO: Add business-specific interface.
  claim: ClaimState;
}
