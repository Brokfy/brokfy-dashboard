import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DETALLE_POLIZA_BEGIN,
  DASHBOARD_FETCH_DETALLE_POLIZA_SUCCESS,
  DASHBOARD_FETCH_DETALLE_POLIZA_FAILURE,
  DASHBOARD_FETCH_DETALLE_POLIZA_DISMISS_ERROR,
} from './constants';

export function fetchDetallePoliza(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DETALLE_POLIZA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://ec2-3-136-94-107.us-east-2.compute.amazonaws.com:4300/api/DetallePoliza/${args.noPoliza}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args.tokenFirebase}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_DETALLE_POLIZA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DETALLE_POLIZA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDetallePolizaError() {
  return {
    type: DASHBOARD_FETCH_DETALLE_POLIZA_DISMISS_ERROR,
  };
}

export function useFetchDetallePoliza() {
  const detallePoliza = useSelector(state => state.dashboard.detallePoliza);

  const dispatch = useDispatch();

  const { fetchDetallePolizaPending, fetchDetallePolizaError } = useSelector(
    state => ({
      fetchDetallePolizaPending: state.dashboard.fetchDetallePolizaPending,
      fetchDetallePolizaError: state.dashboard.fetchDetallePolizaError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDetallePoliza(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDetallePolizaError());
  }, [dispatch]);

  return {
    detallePoliza: detallePoliza,
    fetchDetallePoliza: boundAction,
    fetchDetallePolizaPending,
    fetchDetallePolizaError,
    dismissFetchDetallePolizaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DETALLE_POLIZA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDetallePolizaPending: true,
        fetchDetallePolizaError: null,
      };

    case DASHBOARD_FETCH_DETALLE_POLIZA_SUCCESS:
      // The request is success
      return {
        ...state,
        detallePoliza: action.data.data,
        fetchDetallePolizaPending: false,
        fetchDetallePolizaError: null,
      };

    case DASHBOARD_FETCH_DETALLE_POLIZA_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDetallePolizaPending: false,
        fetchDetallePolizaError: action.data.error,
      };

    case DASHBOARD_FETCH_DETALLE_POLIZA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDetallePolizaError: null,
      };

    default:
      return state;
  }
}
