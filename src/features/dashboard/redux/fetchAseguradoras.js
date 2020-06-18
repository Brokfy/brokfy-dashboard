import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_ASEGURADORAS_BEGIN,
  DASHBOARD_FETCH_ASEGURADORAS_SUCCESS,
  DASHBOARD_FETCH_ASEGURADORAS_FAILURE,
  DASHBOARD_FETCH_ASEGURADORAS_DISMISS_ERROR,
} from './constants';

export function fetchAseguradoras(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_ASEGURADORAS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://3.136.94.107:4300/api/Aseguradoras`,
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
            type: DASHBOARD_FETCH_ASEGURADORAS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_ASEGURADORAS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchAseguradorasError() {
  return {
    type: DASHBOARD_FETCH_ASEGURADORAS_DISMISS_ERROR,
  };
}

export function useFetchAseguradoras() {
  const aseguradoras = useSelector(state => state.dashboard.aseguradoras);

  const dispatch = useDispatch();

  const { fetchAseguradorasPending, fetchAseguradorasError } = useSelector(
    state => ({
      fetchAseguradorasPending: state.dashboard.fetchAseguradorasPending,
      fetchAseguradorasError: state.dashboard.fetchAseguradorasError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchAseguradoras(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchAseguradorasError());
  }, [dispatch]);

  return {
    aseguradoras: aseguradoras,
    fetchAseguradoras: boundAction,
    fetchAseguradorasPending,
    fetchAseguradorasError,
    dismissFetchAseguradorasError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_ASEGURADORAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchAseguradorasPending: true,
        fetchAseguradorasError: null,
      };

    case DASHBOARD_FETCH_ASEGURADORAS_SUCCESS:
      // The request is success
      return {
        ...state,
        aseguradoras: action.data.data.map(item => { 
          return {
            idAseguradora: item.idAseguradora,
            nombre: item.nombre,
            telefono: item.telefono,
            enabled: item.enabled,
            cveCopsis: item.cveCopsis,
          };
        }),
        fetchAseguradorasPending: false,
        fetchAseguradorasError: null,
      };

    case DASHBOARD_FETCH_ASEGURADORAS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchAseguradorasPending: false,
        fetchAseguradorasError: action.data.error,
      };

    case DASHBOARD_FETCH_ASEGURADORAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchAseguradorasError: null,
      };

    default:
      return state;
  }
}
