import {
  USER_REQUEST_GET,
  USER_REQUEST_GET_CURRENT,
  USER_REQUEST_PASSWORD_RESET,
  USER_REQUEST_UPDATE,
} from "../actions/user";

const defaultState = {
  currentUser: {},
};

const user = (state = defaultState, action: any) => {
  switch (action.type) {
    case USER_REQUEST_GET:
    case USER_REQUEST_GET_CURRENT:
      return {
        ...state,
        currentUser: action.response ? action.response.data : state.currentUser,
      };

    default:
      return state;
  }
};

export default user;
