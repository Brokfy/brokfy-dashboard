import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_BEGIN,
  DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_SUCCESS,
  DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_FAILURE,
  DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format'

export function fetchPolizasPorConfirmar(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/PolizasPorConfirmar`,
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
            type: DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchPolizasPorConfirmarError() {
  return {
    type: DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_DISMISS_ERROR,
  };
}

export function useFetchPolizasPorConfirmar() {
  const polizasPorConfirmar = useSelector(state => state.dashboard.polizasPorConfirmar);

  const dispatch = useDispatch();

  const { fetchPolizasPorConfirmarPending, fetchPolizasPorConfirmarError } = useSelector(
    state => ({
      fetchPolizasPorConfirmarPending: state.dashboard.fetchPolizasPorConfirmarPending,
      fetchPolizasPorConfirmarError: state.dashboard.fetchPolizasPorConfirmarError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchPolizasPorConfirmar(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchPolizasPorConfirmarError());
  }, [dispatch]);

  return {
    polizasPorConfirmar: polizasPorConfirmar,
    fetchPolizasPorConfirmar: boundAction,
    fetchPolizasPorConfirmarPending,
    fetchPolizasPorConfirmarError,
    dismissFetchPolizasPorConfirmarError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPolizasPorConfirmarPending: true,
        fetchPolizasPorConfirmarError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasPorConfirmar: action.data.data.map(item => {
          return {
            noPoliza: item.noPoliza,
            tipoPoliza: parseInt(item.tipoPoliza),
            formaPago: item.formaPago,
            proximoPago: format(new Date(item.proximoPago), 'dd/MM/yyyy'),
            fechaInicio: format(new Date(item.fechaInicio), 'dd/MM/yyyy'),
            fechaFin: format(new Date(item.fechaFin), 'dd/MM/yyyy'),
            idAseguradoras: parseInt(item.idAseguradoras),
            costo: parseFloat(item.costo),
            primaNeta: parseFloat(item.primaNeta),
            idEstadoPoliza: parseInt(item.idEstadoPoliza),
            username: item.username,
            productoId: parseInt(item.productoId),
            habilitada: item.habilitada,
            noAsegurado: item.noAsegurado,
            polizaPropia: item.polizaPropia,
            polizaPdf: item.polizaPdf,
            reciboPdf: item.reciboPdf,
            rcUsaCanada: item.rcUsaCanada,
            costoPrimerRecibo: item.costoPrimerRecibo,
            costoRecibosSubsecuentes: item.costoRecibosSubsecuentes,
          };
        }),
        fetchPolizasPorConfirmarPending: false,
        fetchPolizasPorConfirmarError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPolizasPorConfirmarPending: false,
        fetchPolizasPorConfirmarError: action.data.error,
      };

    case DASHBOARD_FETCH_POLIZAS_POR_CONFIRMAR_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPolizasPorConfirmarError: null,
      };

    default:
      return state;
  }
}
