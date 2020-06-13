import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_TIPO_POLIZAS_BEGIN,
  DASHBOARD_FETCH_TIPO_POLIZAS_SUCCESS,
  DASHBOARD_FETCH_TIPO_POLIZAS_FAILURE,
  DASHBOARD_FETCH_TIPO_POLIZAS_DISMISS_ERROR,
} from './constants';

export function fetchTipoPolizas(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_TIPO_POLIZAS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/Dropdown/tipo_poliza`,
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
            type: DASHBOARD_FETCH_TIPO_POLIZAS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_TIPO_POLIZAS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchTipoPolizasError() {
  return {
    type: DASHBOARD_FETCH_TIPO_POLIZAS_DISMISS_ERROR,
  };
}

export function useFetchTipoPolizas() {
  const tipoPolizas = useSelector(state => state.dashboard.tipoPolizas);

  const dispatch = useDispatch();

  const { fetchTipoPolizasPending, fetchTipoPolizasError } = useSelector(
    state => ({
      fetchTipoPolizasPending: state.dashboard.fetchTipoPolizasPending,
      fetchTipoPolizasError: state.dashboard.fetchTipoPolizasError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchTipoPolizas(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchTipoPolizasError());
  }, [dispatch]);

  return {
    tipoPolizas: tipoPolizas,
    fetchTipoPolizas: boundAction,
    fetchTipoPolizasPending,
    fetchTipoPolizasError,
    dismissFetchTipoPolizasError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_TIPO_POLIZAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchTipoPolizasPending: true,
        fetchTipoPolizasError: null,
      };

    case DASHBOARD_FETCH_TIPO_POLIZAS_SUCCESS:
      // The request is success
      return {
        ...state,
        tipoPolizas: action.data.data[0].data.map(item => {
          return {
            id: parseInt(item.id),
            tipo: item.tipo,
          };
        }),
        fetchTipoPolizasPending: false,
        fetchTipoPolizasError: null,
      };

    case DASHBOARD_FETCH_TIPO_POLIZAS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchTipoPolizasPending: false,
        fetchTipoPolizasError: action.data.error,
      };

    case DASHBOARD_FETCH_TIPO_POLIZAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchTipoPolizasError: null,
      };

    default:
      return state;
  }
}
