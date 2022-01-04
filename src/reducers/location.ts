import { 
  LOCATION_BY_IP_GET,
  LOCATION_API_GET,
  getLocationByIP,
  getCurrentLocation
} from '../actions/location';

const defaultState = { };

export interface LocationAction {
  type: string;
}

const location = (state: any = defaultState, action: LocationAction) => {
  switch (action.type) {
    case LOCATION_BY_IP_GET:
      return {
        ...state,
        ...action.data,
      };

    case LOCATION_API_GET:
      locationData = getCurrentLocation();

      return {
        ...state,
        ...action.data,
      };

    default:
      return state;
  }
};

export default location;
