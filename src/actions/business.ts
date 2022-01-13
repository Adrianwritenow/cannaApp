import { ClaimState } from '@/interfaces/claim';
import { IAxiosAction } from '@/interfaces/axios';

export const BUSINESS_REQUEST_AUTOCOMPLETE = 'business/autocomplete';
export const BUSINESS_REQUEST_GET = 'business/get';
export const BUSINESS_CLAIM_REQUEST_GET = 'business/claim/get';
export const BUSINESS_CLAIM_REQUEST_POST = 'business/claim/post';
export const BUSINESS_CLAIM_UPDATE = 'business/claim/update';
export const BUSINESS_CLAIM_VERIFY_REQUEST_POST = 'business/claim/verify/post';

export function getBusinessAutocomplete(name: string): IAxiosAction {
  return {
    type: BUSINESS_REQUEST_AUTOCOMPLETE,
    config: {
      method: 'GET',
      url: `/rest/dispensary`,
      params: {
        name,
      },
    },
  };
}

export function getBusiness(id: number): IAxiosAction {
  return {
    type: BUSINESS_REQUEST_GET,
    config: {
      method: 'GET',
      url: `/admin/structure/dispensary_entity/${id}`,
    },
  };
}

export function getClaimBusiness(id: number): IAxiosAction {
  const action: IAxiosAction = getBusiness(id);
  action.type = BUSINESS_CLAIM_REQUEST_GET;
  return action;
}

export function createClaim(id: number) {
  return {
    type: BUSINESS_CLAIM_REQUEST_POST,
    config: {
      method: 'POST',
      url: `/rest/dispensary/initiate-claim`,
      data: {
        id,
        callback_url: `${process.env.NEXTAUTH_URL}/business/claim/verify`,
      },
    },
  };
}

export function verifyClaim(id: number, timestamp: number, hash: string) {
  return {
    type: BUSINESS_CLAIM_VERIFY_REQUEST_POST,
    config: {
      method: 'POST',
      url: `/rest/dispensary/claim`,
      data: {
        id,
        timestamp,
        hash,
      },
    },
  };
}

export function updateBusinessClaim(claim: ClaimState) {
  return {
    type: BUSINESS_CLAIM_UPDATE,
    payload: claim,
  };
}
