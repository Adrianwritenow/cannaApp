import { IAxiosAction } from '@/interfaces/axios';

export const BUSINESS_REQUEST_AUTOCOMPLETE = 'business/autocomplete';

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
