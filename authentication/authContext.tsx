import { createContext, useEffect, useReducer } from "react";
import { getInitialState, persistState } from "../src/helpers/persist-state";

import qs from "qs";

const STORAGE_KEY = "authState";
const API_URL = process.env.API_URL;
let isRefreshing = false;
let failedQueue: any = [];
var axios = require("axios");

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

interface IAuthState {
  session: {
    token_type?: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
  };
  refreshing: boolean;
}
export interface IAuthProviderValue {
  state: IAuthState;
  dispatch(action: AuthActions): void;
}

export type AuthActions =
  | { type: "UPDATE_SESSION"; payload: object }
  | { type: "UPDATE_REFRESH"; payload: boolean }
  | { type: "LOGOUT" };

const defaultState: IAuthState = {
  session: {},
  refreshing: false,
};

const initialState: IAuthState = getInitialState(STORAGE_KEY) ?? defaultState;
const providerValue: IAuthProviderValue = {
  state: initialState,
  dispatch: (action) => {},
};
export const AuthContext = createContext(providerValue);
const { Provider } = AuthContext;

export const AuthContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    persistState(STORAGE_KEY, state);
  }, [state]);

  return <Provider value={value}>{children}</Provider>;
};

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
        return response;
      }
    })
    .catch((error: { response: any }) => {
      dispatch({ type: "UPDATE_SESSION", payload: {} });

      return error.response;
    });
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
      .then((response: any) => {
        dispatch({ type: "LOGOUT", payload: {} });
        dispatch({ type: "UPDATE_SESSION", payload: {} });
        return true;
      })
      .catch((error: any) => {
        dispatch({ type: "UPDATE_SESSION", payload: {} });
      });
  } else {
    dispatch({ type: "UPDATE_SESSION", payload: {} });
  }
  return;
};

export function getClient(context: IAuthProviderValue) {
  const { dispatch, state } = context;
  const tokenRefreshUrl = `${API_URL}/oauth/token`;

  if (state.session.access_token) {
    axios.defaults.headers.Authorization = `Bearer ${state.session.access_token}`;
  }

  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    (err: { response: { status: number }; config: { _retry: any } }) => {
      // Regular request failed, try refreshing token if available.
      if (err && err.response.status === 401 && !err.config._retry) {
        const originalReq: any = err.config;

        // Token refresh failed, log user out.
        if (originalReq.url === tokenRefreshUrl) {
          dispatch({ type: "UPDATE_SESSION", payload: {} });
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalReq.headers.Authorization = `Bearer ${token}`;
              return axios(originalReq);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalReq._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          axios({
            method: "POST",
            url: tokenRefreshUrl,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              accept: "application/json",
            },
            data: qs.stringify({
              grant_type: "refresh_token",
              client_id: "default_client_id",
              scope: "full",
              refresh_token: state.session.refresh_token,
            }),
          })
            .then(({ data }: any) => {
              dispatch({ type: "UPDATE_SESSION", payload: data });
              axios.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
              originalReq.headers.Authorization = `Bearer ${data.access_token}`;
              processQueue(null, data.access_token);
              resolve(axios(originalReq));
            })
            .catch((err: any) => {
              processQueue(err, null);
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(err);
    }
  );

  return axios;
}
