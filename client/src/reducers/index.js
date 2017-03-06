import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';
import userReducer from './user_reducer';
import googleReducer from './google_reducer';
import cityBikeReducer from './city_bikes';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  user: userReducer,
  google: googleReducer,
  bikes: cityBikeReducer
});

export default rootReducer;
