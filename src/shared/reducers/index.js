import { combineReducers } from 'redux';

import account from './account';
import auth from './auth';
import browse from './browse';
import playlists from './playlists';

const rootReducer = combineReducers({
  account,
  auth,
  browse,
  playlists,
});

export default rootReducer;
