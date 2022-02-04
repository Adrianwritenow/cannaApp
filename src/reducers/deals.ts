import { DealsState } from '@/interfaces/coupon';
import { DEALS_REQUEST_SEARCH_FEATURED } from '@/actions/deals';

const defaultState: DealsState = {
  featuredDeals: [],
};

const deals = (state = defaultState, action: any) => {
  switch (action.type) {
    case DEALS_REQUEST_SEARCH_FEATURED:
      if (action.response && action.response.data) {
        const featuredResponse = action.response.data;

        return {
          ...state,
          featuredDeals: featuredResponse.hits?.hits || state.featuredDeals,
        };
      }
      return state;

    default:
      return state;
  }
};

export default deals;
