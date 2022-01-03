import { combineReducers } from 'redux';
import autocomplete from './autocomplete';
import search from './search';
import user from './user';

export const reducers = combineReducers({
  autocomplete,
  search,
  user,
});

export type RootState = ReturnType<typeof reducers>;
