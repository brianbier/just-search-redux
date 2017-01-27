import { SAVE_FAVORITE, FETCH_FAVORITE, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', favoritePlaces: []};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_FAVORITE:
      return { ...state, error: '', message: action.payload};
    case FETCH_FAVORITE:
      return { ...state, error:'',message: '', favoritePlaces: action.payload };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
  }
  return state;
}