import { SEARCH_REQUEST_GET } from '../actions/search';

const defaultState = {
  results: [],
  query: '',
};

export interface SearchAction {
  data: {
    data: Array<any>;
    search: string;
  };
  type: string;
}

const search = (state: any = defaultState, action: SearchAction) => {
  switch (action.type) {
    case SEARCH_REQUEST_GET:
      let query = action.data;
      return {
        ...state,
        results: query.data || state.results,
        query: query.search || state.query,
      };

    default:
      return state;
  }
};

export default search;
