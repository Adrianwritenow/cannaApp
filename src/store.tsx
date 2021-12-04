import { applyMiddleware, createStore } from "redux";

import logger from "redux-logger";
import { reducers } from "./reducers/reducers";
import thunkMiddleware from "redux-thunk";

// Add middleware to redux.
const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(thunkMiddleware);
  } else {
    // Add additional logging to non-production environments.
    return applyMiddleware(thunkMiddleware, logger);
  }
};

export const store = createStore(reducers, getMiddleware());
