import { combineReducers } from 'redux';
import search from './search';
import user from './user';
import location from './location';

export const reducers = combineReducers({
  user,
  search,
  location,
});

export type RootState = ReturnType<typeof reducers>;
