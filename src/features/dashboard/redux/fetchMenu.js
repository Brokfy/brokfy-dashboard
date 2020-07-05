import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_MENU_BEGIN,
  DASHBOARD_FETCH_MENU_SUCCESS,
  DASHBOARD_FETCH_MENU_FAILURE,
  DASHBOARD_FETCH_MENU_DISMISS_ERROR,
} from './constants';

export function fetchMenu(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_MENU_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Menu`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_MENU_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_MENU_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchMenuError() {
  return {
    type: DASHBOARD_FETCH_MENU_DISMISS_ERROR,
  };
}

export function useFetchMenu() {
  const menu = useSelector(state => state.dashboard.menu);

  const dispatch = useDispatch();

  const { fetchMenuPending, fetchMenuError } = useSelector(
    state => ({
      fetchMenuPending: state.dashboard.fetchMenuPending,
      fetchMenuError: state.dashboard.fetchMenuError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchMenu(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchMenuError());
  }, [dispatch]);

  return {
    menu: menu,
    fetchMenu: boundAction,
    fetchMenuPending,
    fetchMenuError,
    dismissFetchMenuError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_MENU_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchMenuPending: true,
        fetchMenuError: null,
      };

    case DASHBOARD_FETCH_MENU_SUCCESS:
      // The request is success
      return {
        ...state,
        menu: action.data.data,
        fetchMenuPending: false,
        fetchMenuError: null,
      };

    case DASHBOARD_FETCH_MENU_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchMenuPending: false,
        fetchMenuError: action.data.error,
      };

    case DASHBOARD_FETCH_MENU_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchMenuError: null,
      };

    default:
      return state;
  }
}
