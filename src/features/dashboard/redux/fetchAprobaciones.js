import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_APROBACIONES_BEGIN,
  DASHBOARD_FETCH_APROBACIONES_SUCCESS,
  DASHBOARD_FETCH_APROBACIONES_FAILURE,
  DASHBOARD_FETCH_APROBACIONES_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format'

export function fetchAprobaciones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_APROBACIONES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/Aprobaciones`,
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
            type: DASHBOARD_FETCH_APROBACIONES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_APROBACIONES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchAprobacionesError() {
  return {
    type: DASHBOARD_FETCH_APROBACIONES_DISMISS_ERROR,
  };
}

export function useFetchAprobaciones() {
  const aprobaciones = useSelector(state => state.dashboard.aprobaciones);

  const dispatch = useDispatch();

  const { fetchAprobacionesPending, fetchAprobacionesError } = useSelector(
    state => ({
      fetchAprobacionesPending: state.dashboard.fetchAprobacionesPending,
      fetchAprobacionesError: state.dashboard.fetchAprobacionesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchAprobaciones(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchAprobacionesError());
  }, [dispatch]);

  return {
    aprobaciones: aprobaciones,
    fetchAprobaciones: boundAction,
    fetchAprobacionesPending,
    fetchAprobacionesError,
    dismissFetchAprobacionesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_APROBACIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchAprobacionesPending: true,
        fetchAprobacionesError: null,
      };

    case DASHBOARD_FETCH_APROBACIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        aprobaciones: action.data.data.map(item => {
          return {
            username: item.username,
            fullName: item.fullName,
            tipo: parseInt(item.tipo),
            aseguradora: parseInt(item.aseguradora),
            fecha: format(new Date(item.fecha), 'dd/MM/yyyy'),
            noPoliza: item.noPoliza,
            revisado: item.revisado,
            urlPoliza: item.urlPoliza,
            urlCartaNombramiento: item.urlCartaNombramiento,
            firmada: item.firmada
          };
        }),
        fetchAprobacionesPending: false,
        fetchAprobacionesError: null,
      };

    case DASHBOARD_FETCH_APROBACIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchAprobacionesPending: false,
        fetchAprobacionesError: action.data.error,
      };

    case DASHBOARD_FETCH_APROBACIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchAprobacionesError: null,
      };

    default:
      return state;
  }
}
