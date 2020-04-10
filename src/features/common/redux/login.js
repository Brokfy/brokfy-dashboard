import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  COMMON_LOGIN,
} from './constants';

export function login() {
  return {
    type: COMMON_LOGIN,
  };
}

export function useLogin() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(login(...params)), [dispatch]);
  return { login: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };

    default:
      return state;
  }
}
