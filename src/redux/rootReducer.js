import { combineReducers } from 'redux';

import { reducer as authReducer } from './auth';
import { reducer as crudReducer } from './crud';
import { reducer as sksReducer } from './farm';
import { reducer as adavancedCrudReducer } from './adavancedCrud';
import { reducer as settingsReducer } from './settings';
import { reducer as translateReducer } from './translate';

// Combine all reducers.

const rootReducer = combineReducers({
  auth: authReducer,
  crud: crudReducer,
  sks: sksReducer,
  adavancedCrud: adavancedCrudReducer,
  settings: settingsReducer,
  translate: translateReducer,
});

export default rootReducer;
