import { useSelector } from 'react-redux';
import {
  COMMON_AUTH,
} from './constants';

export function auth() {
  return {
    type: COMMON_AUTH,
  };
}

export function useAuth() {
  const auth = useSelector(state => state.common.auth);
  return { auth: auth };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_AUTH:
      return {
        ...state,
      };

    default:
      return state;
  }
}
