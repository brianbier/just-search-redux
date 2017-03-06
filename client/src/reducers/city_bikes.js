import { FETCH_CITY_BIKES } from '../actions/types';

const INITIAL_STATE = { error: '', message: '', cityBikes: []};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CITY_BIKES:
      return { ...state, error:'',message: '', cityBikes: action.payload };
  }
  return state;
}