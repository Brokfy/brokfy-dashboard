import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_BEGIN,
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_SUCCESS,
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_FAILURE,
  DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_DISMISS_ERROR,
} from './constants';

export function fetchDataReporteComisionesRecibidas(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Reportes?nombre=${args.nombre}&fechaInicio=${args.fechaInicio}&fechaFin=${args.fechaFin}&idAseguradora=${args.idAseguradora}&idTipoPoliza=${args.idTipoPoliza}`,
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
            type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDataReporteComisionesRecibidasError() {
  return {
    type: DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_DISMISS_ERROR,
  };
}

export function useFetchDataReporteComisionesRecibidas() {
  const dataReporteComisionesRecibidas = useSelector(state => state.dashboard.dataReporteComisionesRecibidas);

  const dispatch = useDispatch();

  const { fetchDataReporteComisionesRecibidasPending, fetchDataReporteComisionesRecibidasError } = useSelector(
    state => ({
      fetchDataReporteComisionesRecibidasPending: state.dashboard.fetchDataReporteComisionesRecibidasPending,
      fetchDataReporteComisionesRecibidasError: state.dashboard.fetchDataReporteComisionesRecibidasError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDataReporteComisionesRecibidas(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDataReporteComisionesRecibidasError());
  }, [dispatch]);

  return {
    dataReporteComisionesRecibidas,
    fetchDataReporteComisionesRecibidas: boundAction,
    fetchDataReporteComisionesRecibidasPending,
    fetchDataReporteComisionesRecibidasError,
    dismissFetchDataReporteComisionesRecibidasError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDataReporteComisionesRecibidasPending: true,
        fetchDataReporteComisionesRecibidasError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_SUCCESS:
      // The request is success
      return {
        ...state,
        dataReporteComisionesRecibidas: action.data.data.map(item => { 
          return {
            aseguradora: item.aseguradora,
            fechaPago: item.fechaPago,
            montoPago: parseFloat(item.montoPago).toFixed(2),
            nombreUsuario: item.nombreUsuario,
            numeroPoliza: item.numeroPoliza,
            tipoPoliza: item.tipoPoliza,
            tipoRegistro: item.tipoRegistro,
            usuario: item.usuario,
          };
        }),
        fetchDataReporteComisionesRecibidasPending: false,
        fetchDataReporteComisionesRecibidasError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDataReporteComisionesRecibidasPending: false,
        fetchDataReporteComisionesRecibidasError: action.data.error,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_COMISIONES_RECIBIDAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDataReporteComisionesRecibidasError: null,
      };

    default:
      return state;
  }
}
