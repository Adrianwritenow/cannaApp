import { SearchHits } from '@/interfaces/searchHits';
import {
  SEARCH_REQUEST_GET,
  SEARCH_REQUEST_GET_COMBINED,
} from '@/actions/search';

const defaultState = {
  results: [],
  listResults: {
    // Changing this order can impact certain pages.
    strains: [],
    dispensaries: [],
    deals: [],
    blogs: [],
    news: [],
    shopping: [],
  },
  query: '',
  searchLocation: {
    coords: {
      lat: null,
      lon: null,
    },
    label: null,
    boundingBox: null,
  },
};

export interface SearchAction {
  data: {
    data: Array<any>;
    search: string;
    searchLocation: {
      coords: Array<number>;
      label: string;
      boundingBox: Array<number>;
    };
  };
  type: string;
}

const search = (state: any = defaultState, action: any) => {
  switch (action.type) {
    case SEARCH_REQUEST_GET:
      let query = action.data;
      let search = query.search || state.query;

      if (!query.data?.length && !query.search) {
        search = '';
      }

      return {
        ...state,
        results: query.data || state.results,
        query: search,
        searchLocation: query.searchLocation || state.searchLocation,
      };

    case SEARCH_REQUEST_GET_COMBINED:
      if (action.response && action.response.data) {
        const allResultsResponse = action.response.data.responses || [];
        const currentListResults = state.listResults;

        allResultsResponse.forEach((result: SearchHits) => {
          const results = result.hits?.hits || [];
          const firstResult = results[0] || {};

          if (firstResult._id) {
            switch (true) {
              case firstResult._id.includes('coupon'):
                currentListResults.deals = results;
                break;

              case firstResult._id.includes('product_entity'):
                currentListResults.shopping = results;
                break;

              case firstResult._id.includes('dispensary_entity'):
                currentListResults.dispensaries = results;
                break;

              case firstResult._id.includes('strain_entity'):
                currentListResults.strains = results;
                break;

              case firstResult._id.includes('blog'):
                currentListResults.blogs = results;
                break;
            }
          }
        });

        return {
          ...state,
          listResults: currentListResults,
        };
      }
      return state;

    default:
      return state;
  }
};

export default search;
