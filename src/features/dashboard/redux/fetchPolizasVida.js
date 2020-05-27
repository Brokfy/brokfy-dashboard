import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_POLIZAS_VIDA_BEGIN,
  DASHBOARD_FETCH_POLIZAS_VIDA_SUCCESS,
  DASHBOARD_FETCH_POLIZAS_VIDA_FAILURE,
  DASHBOARD_FETCH_POLIZAS_VIDA_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format';

export function fetchPolizasVida(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_POLIZAS_VIDA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/PolizaVida?propia=${args.propia}`,
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
            type: DASHBOARD_FETCH_POLIZAS_VIDA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZAS_VIDA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchPolizasVidaError() {
  return {
    type: DASHBOARD_FETCH_POLIZAS_VIDA_DISMISS_ERROR,
  };
}

export function useFetchPolizasVida() {
  const polizasVida = useSelector(state => state.dashboard.polizasVida);

  const dispatch = useDispatch();

  const { fetchPolizasVidaPending, fetchPolizasVidaError } = useSelector(
    state => ({
      fetchPolizasVidaPending: state.dashboard.fetchPolizasVidaPending,
      fetchPolizasVidaError: state.dashboard.fetchPolizasVidaError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchPolizasVida(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchPolizasVidaError());
  }, [dispatch]);

  return {
    polizasVida: polizasVida,
    fetchPolizasVida: boundAction,
    fetchPolizasVidaPending,
    fetchPolizasVidaError,
    dismissFetchPolizasVidaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_POLIZAS_VIDA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPolizasVidaPending: true,
        fetchPolizasVidaError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_VIDA_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasVida: action.data.data.map(item => {
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
            fumador: item.fumador === true ? "1": "0",
            estatura: item.estatura,
            peso: item.peso,
            ingresos: item.ingresos,
            idOcupacion: item.idOcupacion,
            idEstadoCivil: item.idEstadoCivil,
            idSexo: item.idSexo,
          };
        }),
        fetchPolizasVidaPending: false,
        fetchPolizasVidaError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_VIDA_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPolizasVidaPending: false,
        fetchPolizasVidaError: action.data.error,
      };

    case DASHBOARD_FETCH_POLIZAS_VIDA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPolizasVidaError: null,
      };

    default:
      return state;
  }
}
