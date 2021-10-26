import axios, { AxiosError, AxiosResponse } from "axios";
import { createContext, useEffect, useReducer } from "react";
import { getInitialState, persistState } from "../src/helpers/persist-state";

import qs from "qs";

const STORAGE_KEY = "authState";
const API_URL = process.env.API_URL;

interface IAuthState {
  session: {
    token_type?: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  refreshing: boolean;
}

export type AuthActions =
  | { type: "UPDATE_SESSION"; payload: object }
  | { type: "UPDATE_REFRESH"; payload: boolean }
  | { type: "LOGOUT" };

export interface IAuthProviderValue {
  state: IAuthState;
  dispatch(action: AuthActions): void;
}

const defaultState: IAuthState = {
  session: {},
  refreshing: false,
};

const initialState: IAuthState = getInitialState(STORAGE_KEY) ?? defaultState;
const providerValue: IAuthProviderValue = {
  state: initialState,
  dispatch: (action) => {},
};
const AuthContext = createContext(providerValue);
const { Provider } = AuthContext;

// Handle dispatched actions.
const reducer = (state: IAuthState, action: AuthActions): IAuthState => {
  switch (action.type) {
    case "UPDATE_SESSION":
      return {
        ...state,
        session: action.payload,
        refreshing: false,
      };

    case "UPDATE_REFRESH":
      return {
        ...state,
        refreshing: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        session: {},
        refreshing: false,
      };

    default:
      throw new Error("Action invalid.");
  }
};

export const login = (
  context: IAuthProviderValue,
  username: string,
  password: string
) => {
  const { dispatch } = context;

  console.log("BPOOM", API_URL);

  return axios({
    method: "POST",
    url: `${API_URL}/oauth/token`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    data: qs.stringify({
      username,
      password,
      grant_type: "password",
      client_id: "ec881dc6-d3c8-4475-abe1-fd9605f6cfba",
      client_secret: "secret",
    }),
  })
    .then((response: any) => {
      if (response.data && response.data.access_token) {
        dispatch({ type: "UPDATE_SESSION", payload: response.data });
        return true;
      }
    })
    .catch((error) => {
      dispatch({ type: "UPDATE_SESSION", payload: {} });

      return error.response;
    });
};

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    persistState(STORAGE_KEY, state);
  }, [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Logout by wiping session state.
export const logout = (context: IAuthProviderValue) => {
  const { dispatch } = context;

  if (
    typeof context.state.session.access_token !== "undefined" &&
    context.state
  ) {
    axios({
      method: "POST",
      url: `${API_URL}/logout`,
      headers: {
        Authorization: `Bearer ${context.state.session.access_token}`,
        accept: "application/json",
      },
    })
      .then((response) => {
        dispatch({ type: "LOGOUT", payload: {} });
        dispatch({ type: "UPDATE_SESSION", payload: {} });
        return true;
      })
      .catch((error) => {
        dispatch({ type: "UPDATE_SESSION", payload: {} });
      });
  } else {
    dispatch({ type: "UPDATE_SESSION", payload: {} });
  }
  return;
};

export default AuthContext;
