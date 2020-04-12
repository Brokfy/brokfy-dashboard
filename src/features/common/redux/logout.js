import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_LOGOUT,
} from './constants';

export function logout() {
  return {
    type: COMMON_LOGOUT,
  };
}

export function useLogout() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(logout(...params)), [dispatch]);
  return { logout: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_LOGOUT:
      sessionStorage.isAuthenticated = false;
      sessionStorage.auth = null;
      return {
        ...state,
        isAuthenticated: false,
        auth: null,
        getTokenPending: false,
        getTokenError: null,
      };

    default:
      return state;
  }
}
