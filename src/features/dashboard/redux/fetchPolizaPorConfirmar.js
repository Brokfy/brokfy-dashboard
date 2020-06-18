import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_BEGIN,
  DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_SUCCESS,
  DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_FAILURE,
  DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_DISMISS_ERROR,
} from './constants';

export function fetchPolizaPorConfirmar(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/PolizasPorConfirmar/${args.no_poliza}`,
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
            type: DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchPolizaPorConfirmarError() {
  return {
    type: DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_DISMISS_ERROR,
  };
}

export function useFetchPolizaPorConfirmar() {
  const polizaPorConfirmar = useSelector(state => state.dashboard.polizaPorConfirmar);

  const dispatch = useDispatch();

  const { fetchPolizaPorConfirmarPending, fetchPolizaPorConfirmarError } = useSelector(
    state => ({
      fetchPolizaPorConfirmarPending: state.dashboard.fetchPolizaPorConfirmarPending,
      fetchPolizaPorConfirmarError: state.dashboard.fetchPolizaPorConfirmarError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchPolizaPorConfirmar(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchPolizaPorConfirmarError());
  }, [dispatch]);

  return {
    polizaPorConfirmar: polizaPorConfirmar,
    fetchPolizaPorConfirmar: boundAction,
    fetchPolizaPorConfirmarPending,
    fetchPolizaPorConfirmarError,
    dismissFetchPolizaPorConfirmarError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPolizaPorConfirmarPending: true,
        fetchPolizaPorConfirmarError: null,
      };

    case DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_SUCCESS:
      // The request is success
      return {
        ...state,
        polizaPorConfirmar: action.data.data && action.data.data !== '' ? action.data.data : null,
        fetchPolizaPorConfirmarPending: false,
        fetchPolizaPorConfirmarError: null,
      };

    case DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPolizaPorConfirmarPending: false,
        fetchPolizaPorConfirmarError: action.data.error,
      };

    case DASHBOARD_FETCH_POLIZA_POR_CONFIRMAR_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPolizaPorConfirmarError: null,
      };

    default:
      return state;
  }
}
