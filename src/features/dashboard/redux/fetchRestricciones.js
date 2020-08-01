import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_RESTRICCIONES_BEGIN,
  DASHBOARD_FETCH_RESTRICCIONES_SUCCESS,
  DASHBOARD_FETCH_RESTRICCIONES_FAILURE,
  DASHBOARD_FETCH_RESTRICCIONES_DISMISS_ERROR,
} from './constants';

export function fetchRestricciones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_RESTRICCIONES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Restricciones?dato=${args.dato}&campo=${args.campo}`,
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
            type: DASHBOARD_FETCH_RESTRICCIONES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_RESTRICCIONES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchRestriccionesError() {
  return {
    type: DASHBOARD_FETCH_RESTRICCIONES_DISMISS_ERROR,
  };
}

export function useFetchRestricciones() {
  const restricciones = useSelector(state => state.dashboard.restricciones);

  const dispatch = useDispatch();

  const { fetchRestriccionesPending, fetchRestriccionesError } = useSelector(
    state => ({
      fetchRestriccionesPending: state.dashboard.fetchRestriccionesPending,
      fetchRestriccionesError: state.dashboard.fetchRestriccionesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchRestricciones(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchRestriccionesError());
  }, [dispatch]);

  return {
    restricciones: restricciones,
    fetchRestricciones: boundAction,
    fetchRestriccionesPending,
    fetchRestriccionesError,
    dismissFetchRestriccionesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_RESTRICCIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchRestriccionesPending: true,
        fetchRestriccionesError: null,
      };

    case DASHBOARD_FETCH_RESTRICCIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        restricciones: action.data.data,
        fetchRestriccionesPending: false,
        fetchRestriccionesError: null,
      };

    case DASHBOARD_FETCH_RESTRICCIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchRestriccionesPending: false,
        fetchRestriccionesError: action.data.error,
      };

    case DASHBOARD_FETCH_RESTRICCIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchRestriccionesError: null,
      };

    default:
      return state;
  }
}
