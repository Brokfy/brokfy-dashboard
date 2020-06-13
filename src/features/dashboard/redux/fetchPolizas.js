import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_POLIZAS_BEGIN,
  DASHBOARD_FETCH_POLIZAS_SUCCESS,
  DASHBOARD_FETCH_POLIZAS_FAILURE,
  DASHBOARD_FETCH_POLIZAS_DISMISS_ERROR,
  DASHBOARD_FETCH_PAGOS_RESET,
} from './constants';
import format from 'date-fns/format'

export function fetchPolizas(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument

    if( args.reset === true ) {
      dispatch({
        type: DASHBOARD_FETCH_PAGOS_RESET,
      });
      return
    }

    dispatch({
      type: DASHBOARD_FETCH_POLIZAS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/polizas?idAseguradora=${args.aseguradora}&fecha=${args.fecha}`,
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
            type: DASHBOARD_FETCH_POLIZAS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZAS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchPolizasError() {
  return {
    type: DASHBOARD_FETCH_POLIZAS_DISMISS_ERROR,
  };
}

export function useFetchPolizas() {
  const polizas = useSelector(state => state.dashboard.polizas);

  const dispatch = useDispatch();

  const { fetchPolizasPending, fetchPolizasError } = useSelector(
    state => ({
      fetchPolizasPending: state.dashboard.fetchPolizasPending,
      fetchPolizasError: state.dashboard.fetchPolizasError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchPolizas(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchPolizasError());
  }, [dispatch]);

  return {
    polizas: polizas,
    fetchPolizas: boundAction,
    fetchPolizasPending,
    fetchPolizasError,
    dismissFetchPolizasError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_POLIZAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPolizasPending: true,
        fetchPolizasError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_SUCCESS:
      // The request is success
      return {
        ...state,
        polizas: action.data.data.map(item => {
          return {
            comision: parseFloat(item.comision),
            idEstatusPoliza: parseInt(item.idEstatusPoliza),
            idPolizaComision: parseInt(item.idPolizaComision),
            montoPagado: parseFloat(item.montoPagado),
            montoPago: 0,
            noPoliza: item.noPoliza,
            primaNeta: parseFloat(item.montoPagado),
            primaTotal: parseFloat(item.montoPagado),
            tipoPoliza: parseInt(item.tipoPoliza),
            valor: parseFloat(item.valor),
            vencimiento: format(new Date(item.vencimiento), 'dd/MM/yyyy'),
          }
        }),
        fetchPolizasPending: false,
        fetchPolizasError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPolizasPending: false,
        fetchPolizasError: action.data.error,
      };

      case DASHBOARD_FETCH_PAGOS_RESET:
      // The request is failed
      return {
        ...state,
        polizas: [],
        fetchPolizasPending: false,
        fetchPolizasError: null,
      };
    case DASHBOARD_FETCH_POLIZAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPolizasError: null,
      };

    default:
      return state;
  }
}
