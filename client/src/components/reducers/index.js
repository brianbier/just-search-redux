import { combineReducers } from 'redux';  
import { reducer as formReducer } from 'redux-form';  
import authReducer from './auth_reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer
})