import {AUTH_USER,UNAUTH_USER,AUTH_ERROR,PROTECTED_TEST} from'../actions/types';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false }

export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case AUTH_USER:
      return {...state, error: '', message: '', authenticated: true};
    case UNAUTH_USER:
      return {...state, authenticated: false};
    case AUTH_ERROR:
      return {...state, error: action.payload};
    case PROTECTED_TEST:
    console.log(action);
    console.log({...state, content: action.payload, authenticated: action.auth});
      return {...state, content: action.payload, authenticated: action.auth};
    default:
     return state;
  }
}

