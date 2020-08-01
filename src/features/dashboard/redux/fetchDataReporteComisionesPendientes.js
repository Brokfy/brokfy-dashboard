import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_BEGIN,
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_SUCCESS,
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_FAILURE,
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_DISMISS_ERROR,
} from './constants';

export function fetchDataReporteComisionesPendientes(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Reportes?nombre=${args.nombre}&fechaInicio=${args.fechaInicio}&fechaFin=${args.fechaFin}&idAseguradora=${args.idAseguradora}&idTipoPoliza=${args.idTipoPoliza}`,
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
            type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDataReporteComisionesPendientesError() {
  return {
    type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_DISMISS_ERROR,
  };
}

export function useFetchDataReporteComisionesPendientes() {
  const dataReporteComisionesPendientes = useSelector(state => state.dashboard.dataReporteComisionesPendientes);

  const dispatch = useDispatch();

  const { fetchDataReporteComisionesPendientesPending, fetchDataReporteComisionesPendientesError } = useSelector(
    state => ({
      fetchDataReporteComisionesPendientesPending: state.dashboard.fetchDataReporteComisionesPendientesPending,
      fetchDataReporteComisionesPendientesError: state.dashboard.fetchDataReporteComisionesPendientesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDataReporteComisionesPendientes(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDataReporteComisionesPendientesError());
  }, [dispatch]);

  return {
    dataReporteComisionesPendientes,
    fetchDataReporteComisionesPendientes: boundAction,
    fetchDataReporteComisionesPendientesPending,
    fetchDataReporteComisionesPendientesError,
    dismissFetchDataReporteComisionesPendientesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDataReporteComisionesPendientesPending: true,
        fetchDataReporteComisionesPendientesError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_SUCCESS:
      // The request is success
      return {
        ...state,
        dataReporteComisionesPendientes: action.data.data.map(item => { 
          return {
            aseguradora: item.aseguradora,
            fechaPago: item.fechaPago,
            montoComision: parseFloat(item.montoComision).toFixed(2),
            montoPagado: parseFloat(item.montoPagado).toFixed(2),
            montoPendiente: parseFloat(item.montoPendiente).toFixed(2),
            nombreUsuario: item.nombreUsuario,
            numeroPoliza: item.numeroPoliza,
            tipoPoliza: item.tipoPoliza,
            tipoRegistro: item.tipoRegistro,
            usuario: item.usuario,
          };
        }),
        fetchDataReporteComisionesPendientesPending: false,
        fetchDataReporteComisionesPendientesError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDataReporteComisionesPendientesPending: false,
        fetchDataReporteComisionesPendientesError: action.data.error,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_PENDIENTES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDataReporteComisionesPendientesError: null,
      };

    default:
      return state;
  }
}
