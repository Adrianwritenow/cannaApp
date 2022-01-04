import { LOCATION_SET } from '../actions/location';

const defaultState = { };

export interface LocationAction {
  type: string;
}

const location = (state: any = defaultState, action: LocationAction) => {
  switch (action.type) {
    case LOCATION_SET:
      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default location;
