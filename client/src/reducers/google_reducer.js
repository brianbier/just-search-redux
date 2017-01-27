import { SAVE_FAVORITE, FETCH_FAVORITE, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: ''};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_FAVORITE:
      return { ...state, error: '', message: action.payload};
    case FETCH_FAVORITE:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}