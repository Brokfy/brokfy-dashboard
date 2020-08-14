import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_RESTRICCIONES_EDICION_BEGIN,
  DASHBOARD_FETCH_RESTRICCIONES_EDICION_SUCCESS,
  DASHBOARD_FETCH_RESTRICCIONES_EDICION_FAILURE,
  DASHBOARD_FETCH_RESTRICCIONES_EDICION_DISMISS_ERROR,
} from './constants';

export function fetchRestriccionesEdicion(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_RESTRICCIONES_EDICION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Restricciones?dato=${args.dato}&campo=${args.campo}`,
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
            type: DASHBOARD_FETCH_RESTRICCIONES_EDICION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_RESTRICCIONES_EDICION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchRestriccionesEdicionError() {
  return {
    type: DASHBOARD_FETCH_RESTRICCIONES_EDICION_DISMISS_ERROR,
  };
}

export function useFetchRestriccionesEdicion() {
  const restriccionesEdicion = useSelector(state => state.dashboard.restriccionesEdicion);
  const dispatch = useDispatch();

  const { fetchRestriccionesEdicionPending, fetchRestriccionesEdicionError } = useSelector(
    state => ({
      fetchRestriccionesEdicionPending: state.dashboard.fetchRestriccionesEdicionPending,
      fetchRestriccionesEdicionError: state.dashboard.fetchRestriccionesEdicionError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchRestriccionesEdicion(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchRestriccionesEdicionError());
  }, [dispatch]);

  return {
    restriccionesEdicion: restriccionesEdicion,
    fetchRestriccionesEdicion: boundAction,
    fetchRestriccionesEdicionPending,
    fetchRestriccionesEdicionError,
    dismissFetchRestriccionesEdicionError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_RESTRICCIONES_EDICION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchRestriccionesEdicionPending: true,
        fetchRestriccionesEdicionError: null,
      };

    case DASHBOARD_FETCH_RESTRICCIONES_EDICION_SUCCESS:
      // The request is success
      return {
        ...state,
        restriccionesEdicion: action.data.data,
        fetchRestriccionesEdicionPending: false,
        fetchRestriccionesEdicionError: null,
      };

    case DASHBOARD_FETCH_RESTRICCIONES_EDICION_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchRestriccionesEdicionPending: false,
        fetchRestriccionesEdicionError: action.data.error,
      };

    case DASHBOARD_FETCH_RESTRICCIONES_EDICION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchRestriccionesEdicionError: null,
      };

    default:
      return state;
  }
}
