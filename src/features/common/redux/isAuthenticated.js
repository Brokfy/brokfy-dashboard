// import { useCallback } from 'react';
import { 
  // useDispatch, 
  useSelector 
} from 'react-redux';
import {
  COMMON_IS_AUTHENTICATED,
} from './constants';

export function isAuthenticated() {
  return {
    type: COMMON_IS_AUTHENTICATED,
  };
}

export function useIsAuthenticated() {
  // const dispatch = useDispatch();
  // const boundAction = useCallback((...params) => dispatch(isAuthenticated(...params)), [dispatch]);
  const isAuthenticated = useSelector(state => state.common.isAuthenticated);
  return { isAuthenticated: isAuthenticated };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_IS_AUTHENTICATED:
      return {
        ...state,
      };

    default:
      return state;
  }
}
