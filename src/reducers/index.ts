import { combineReducers } from 'redux';
import autocomplete from './autocomplete';
import business from './business';
import search from './search';
import user from './user';
import location from './location';

export const reducers = combineReducers({
  autocomplete,
  business,
  search,
  location,
  user,
});

export type RootState = ReturnType<typeof reducers>;
