import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_VALOR_COMISION_BEGIN,
  DASHBOARD_FETCH_VALOR_COMISION_SUCCESS,
  DASHBOARD_FETCH_VALOR_COMISION_FAILURE,
  DASHBOARD_FETCH_VALOR_COMISION_DISMISS_ERROR,
} from './constants';

export function fetchValorComision(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_VALOR_COMISION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://3.136.94.107:4300/api/ValorComision?idAseguradora=${args.idAseguradora}&idTipoPoliza=${args.idTipoPoliza}&fecha=${args.fecha.slice(0,10)}`,
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
            type: DASHBOARD_FETCH_VALOR_COMISION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_VALOR_COMISION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchValorComisionError() {
  return {
    type: DASHBOARD_FETCH_VALOR_COMISION_DISMISS_ERROR,
  };
}

export function useFetchValorComision() {
  const valorComision = useSelector(state => state.dashboard.valorComision);
  const dispatch = useDispatch();

  const { fetchValorComisionPending, fetchValorComisionError } = useSelector(
    state => ({
      fetchValorComisionPending: state.dashboard.fetchValorComisionPending,
      fetchValorComisionError: state.dashboard.fetchValorComisionError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchValorComision(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchValorComisionError());
  }, [dispatch]);

  return {
    valorComision: valorComision,
    fetchValorComision: boundAction,
    fetchValorComisionPending,
    fetchValorComisionError,
    dismissFetchValorComisionError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_VALOR_COMISION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchValorComisionPending: true,
        fetchValorComisionError: null,
      };

    case DASHBOARD_FETCH_VALOR_COMISION_SUCCESS:
      // The request is success
      return {
        ...state,
        valorComision: action.data.data && action.data.data !== '' ? action.data.data : null,
        fetchValorComisionPending: false,
        fetchValorComisionError: null,
      };

    case DASHBOARD_FETCH_VALOR_COMISION_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchValorComisionPending: false,
        fetchValorComisionError: action.data.error,
      };

    case DASHBOARD_FETCH_VALOR_COMISION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchValorComisionError: null,
      };

    default:
      return state;
  }
}
