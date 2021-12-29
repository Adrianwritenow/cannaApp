import { combineReducers } from 'redux';
import search from './reducers/search';
import user from './reducers/user';

export const reducers = combineReducers({
  user,
  search,
});

export type RootState = ReturnType<typeof reducers>;
