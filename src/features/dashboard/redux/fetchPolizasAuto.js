import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_POLIZAS_AUTO_BEGIN,
  DASHBOARD_FETCH_POLIZAS_AUTO_SUCCESS,
  DASHBOARD_FETCH_POLIZAS_AUTO_FAILURE,
  DASHBOARD_FETCH_POLIZAS_AUTO_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format';

export function fetchPolizasAuto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_POLIZAS_AUTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://3.136.94.107:4300/api/PolizaAuto?propia=${args.propia}`,
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
            type: DASHBOARD_FETCH_POLIZAS_AUTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZAS_AUTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchPolizasAutoError() {
  return {
    type: DASHBOARD_FETCH_POLIZAS_AUTO_DISMISS_ERROR,
  };
}

export function useFetchPolizasAuto() {
  const polizasAuto = useSelector(state => state.dashboard.polizasAuto);

  const dispatch = useDispatch();

  const { fetchPolizasAutoPending, fetchPolizasAutoError } = useSelector(
    state => ({
      fetchPolizasAutoPending: state.dashboard.fetchPolizasAutoPending,
      fetchPolizasAutoError: state.dashboard.fetchPolizasAutoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchPolizasAuto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchPolizasAutoError());
  }, [dispatch]);

  return {
    polizasAuto: polizasAuto,
    fetchPolizasAuto: boundAction,
    fetchPolizasAutoPending,
    fetchPolizasAutoError,
    dismissFetchPolizasAutoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_POLIZAS_AUTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPolizasAutoPending: true,
        fetchPolizasAutoError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_AUTO_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasAuto: action.data.data.map(item => {
          return {
            noPoliza: item.noPoliza,
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
            marca: item.marca,
            modelo: item.modelo,
            ano: parseInt(item.ano),
            placas: item.placas,
            clave: item.clave,
            codigoPostal: item.codigoPostal,

          };
        }),
        fetchPolizasAutoPending: false,
        fetchPolizasAutoError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_AUTO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPolizasAutoPending: false,
        fetchPolizasAutoError: action.data.error,
      };

    case DASHBOARD_FETCH_POLIZAS_AUTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPolizasAutoError: null,
      };

    default:
      return state;
  }
}
