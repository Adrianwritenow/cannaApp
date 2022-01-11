import {
  USER_REQUEST_GET,
  USER_REQUEST_GET_CURRENT,
  USER_REQUEST_PASSWORD_RESET,
  USER_REQUEST_UPDATE,
} from '../actions/user';

const defaultState = {
  currentUser: {
    changed: [{}],
    created: [{}],
    default_langcode: [{}],
    favorite_strains: [],
    first_name: [{}],
    guest_list: [{}],
    last_name: [{}],
    state: [],
    langcode: [{}],
    mail: [{}],
    name: [{}],
    preferred_admin_langcode: [],
    preferred_langcode: [{}],
    timezone: [{}],
    uid: [{}],
    user_picture: [],
    uuid: [{}],
  },
};

const user = (state = defaultState, action: any) => {
  switch (action.type) {
    case USER_REQUEST_GET:
    case USER_REQUEST_GET_CURRENT:
      let userData = action?.response?.data;
      if (Array.isArray(userData)) {
        userData = userData[0];
      }

      return {
        ...state,
        currentUser: userData || state.currentUser,
      };

    case USER_REQUEST_UPDATE:
      return {
        ...state,
        currentUser: action.response ? action.response.data : state.currentUser,
      };

    default:
      return state;
  }
};

export default user;
