import { combineReducers } from 'redux';
import search from './search';
import user from './user';

export const reducers = combineReducers({
  user,
  search,
});

export type RootState = ReturnType<typeof reducers>;
