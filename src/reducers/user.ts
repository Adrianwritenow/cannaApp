import {
  USER_REQUEST_GET,
  USER_REQUEST_GET_CURRENT,
  USER_REQUEST_PASSWORD_RESET,
  USER_REQUEST_UPDATE,
} from "../actions/user";

const defaultState = {
  currentUser: {
    changed: [{}],
    created: [{}],
    default_langcode: [{}],
    field_favorite_strains: [],
    field_first_name: [{}],
    field_guest_list: [{}],
    field_last_name: [{}],
    field_state: [],
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
      return {
        ...state,
        currentUser: action.response ? action.response.data : state.currentUser,
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
