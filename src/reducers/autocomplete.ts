import { BUSINESS_REQUEST_AUTOCOMPLETE } from '@/actions/business';

const defaultState = {
  businesses: [],
};

const autocomplete = (state = defaultState, action: any) => {
  switch (action.type) {
    case BUSINESS_REQUEST_AUTOCOMPLETE:
      if (action.response && action.response.data) {
        const businessResponse = action.response.data || [];
        const businesses = businessResponse.map((item: any) => {
          return {
            id: item.id[0].value,
            label: item.name[0].value,
          };
        });

        return {
          ...state,
          businesses,
        };
      }
      return state;

    default:
      return state;
  }
};

export default autocomplete;
