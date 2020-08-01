import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_SINIESTROS_BEGIN,
  DASHBOARD_FETCH_SINIESTROS_SUCCESS,
  DASHBOARD_FETCH_SINIESTROS_FAILURE,
  DASHBOARD_FETCH_SINIESTROS_DISMISS_ERROR,
} from './constants';

export function fetchSiniestros(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_SINIESTROS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Siniestros?activo=${args.activo}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };
    
      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_SINIESTROS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_SINIESTROS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchSiniestrosError() {
  return {
    type: DASHBOARD_FETCH_SINIESTROS_DISMISS_ERROR,
  };
}

export function useFetchSiniestros() {
  const siniestros = useSelector(state => state.dashboard.siniestros);
  const dispatch = useDispatch();

  const { fetchSiniestrosPending, fetchSiniestrosError } = useSelector(
    state => ({
      fetchSiniestrosPending: state.dashboard.fetchSiniestrosPending,
      fetchSiniestrosError: state.dashboard.fetchSiniestrosError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchSiniestros(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchSiniestrosError());
  }, [dispatch]);

  return {
    siniestros: siniestros,
    fetchSiniestros: boundAction,
    fetchSiniestrosPending,
    fetchSiniestrosError,
    dismissFetchSiniestrosError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_SINIESTROS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchSiniestrosPending: true,
        fetchSiniestrosError: null,
      };

    case DASHBOARD_FETCH_SINIESTROS_SUCCESS:
      // The request is success
      return {
        ...state,
        siniestros: action.data.data,
        fetchSiniestrosPending: false,
        fetchSiniestrosError: null,
      };

    case DASHBOARD_FETCH_SINIESTROS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchSiniestrosPending: false,
        fetchSiniestrosError: action.data.error,
      };

    case DASHBOARD_FETCH_SINIESTROS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchSiniestrosError: null,
      };

    default:
      return state;
  }
}
