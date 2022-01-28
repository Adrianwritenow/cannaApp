import { SEARCH_REQUEST_GET } from '../actions/search';

const defaultState = {
  results: [],
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

const search = (state: any = defaultState, action: SearchAction) => {
  switch (action.type) {
    case SEARCH_REQUEST_GET:
      let query = action.data;
      let search = query.search || state.query;

      if (!query.data.length && !query.search) {
        search = '';
      }

      return {
        ...state,
        results: query.data || state.results,
        query: search,
        searchLocation: query.searchLocation || state.searchLocation,
      };

    default:
      return state;
  }
};

export default search;
