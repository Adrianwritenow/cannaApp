import { DealsState } from '@/interfaces/coupon';
import {
  DEALS_REQUEST_SEARCH_NEAR_ME,
  DEALS_REQUEST_SEARCH_FEATURED,
} from '@/actions/deals';

interface FilterBucket {
  key: string;
  doc_count: number;
}

const defaultState: DealsState = {
  deals: [],
  featuredDeals: [],
  filters: [],
  total: 0,
  activeFilter: 'All',
};

const deals = (state = defaultState, action: any) => {
  switch (action.type) {
    case DEALS_REQUEST_SEARCH_NEAR_ME:
      if (action.response && action.response.data) {
        const searchResponse = action.response.data;
        const dealsAgg = searchResponse?.aggregations?.category.buckets || [];
        const dealsFilters = dealsAgg.map((item: FilterBucket) => {
          return item.key;
        });

        dealsFilters.unshift('All');

        const searchHits = searchResponse.hits?.hits || [];
        // This search supports "load more" so we concat results.
        const newDeals = state.deals.concat(searchHits);

        return {
          ...state,
          deals: newDeals,
          filters: dealsFilters,
          total: newDeals.length,
        };
      }
      return state;

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
