import { BusinessState } from '@/interfaces/business';
import { getField } from '@/helpers/getField';
import {
  BUSINESS_CLAIM_UPDATE,
  BUSINESS_CLAIM_REQUEST_GET,
  BUSINESS_REQUEST_GET,
} from '@/actions/business';

const defaultState: BusinessState = {
  business: {},
  claim: {
    step: 'business',
    business: {
      id: '',
      name: '',
    },
    phone: '',
    website: '',
    categories: '',
    address: {
      line1: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
  },
};

const business = (state = defaultState, action: any): BusinessState => {
  switch (action.type) {
    case BUSINESS_REQUEST_GET:
      return {
        ...state,
        business: action.response ? action.response.data : state.business,
      };

    case BUSINESS_CLAIM_REQUEST_GET:
      if (!action.response?.data) {
        return state;
      }

      const claimReponse = action.response.data;
      return {
        ...state,
        claim: {
          ...state.claim,
          phone: getField(claimReponse, 'field_phone'),
          website: getField(claimReponse, 'field_website', 'uri'),
          address: {
            line1: getField(claimReponse, 'field_address', 'address_line1'),
            city: getField(claimReponse, 'field_address', 'locality'),
            state: getField(
              claimReponse,
              'field_address',
              'administrative_area'
            ),
            zip: getField(claimReponse, 'field_address', 'postal_code'),
            country: getField(claimReponse, 'field_address', 'country_code'),
          },
        },
      };

    case BUSINESS_CLAIM_UPDATE:
      return {
        ...state,
        claim: {
          ...state.claim,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

export default business;
