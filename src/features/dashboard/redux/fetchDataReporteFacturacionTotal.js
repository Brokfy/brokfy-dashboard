import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_BEGIN,
  DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_SUCCESS,
  DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_FAILURE,
  DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_DISMISS_ERROR,
} from './constants';

export function fetchDataReporteFacturacionTotal(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/Reportes?nombre=${args.nombre}&fechaInicio=${args.fechaInicio}&fechaFin=${args.fechaFin}&idAseguradora=${args.idAseguradora}&idTipoPoliza=${args.idTipoPoliza}`,
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
            type: DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDataReporteFacturacionTotalError() {
  return {
    type: DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_DISMISS_ERROR,
  };
}

export function useFetchDataReporteFacturacionTotal() {
  const dataReporteFacturacionTotal = useSelector(state => state.dashboard.dataReporteFacturacionTotal);

  const dispatch = useDispatch();

  const { fetchDataReporteFacturacionTotalPending, fetchDataReporteFacturacionTotalError } = useSelector(
    state => ({
      fetchDataReporteFacturacionTotalPending: state.dashboard.fetchDataReporteFacturacionTotalPending,
      fetchDataReporteFacturacionTotalError: state.dashboard.fetchDataReporteFacturacionTotalError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDataReporteFacturacionTotal(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDataReporteFacturacionTotalError());
  }, [dispatch]);

  return {
    dataReporteFacturacionTotal,
    fetchDataReporteFacturacionTotal: boundAction,
    fetchDataReporteFacturacionTotalPending,
    fetchDataReporteFacturacionTotalError,
    dismissFetchDataReporteFacturacionTotalError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDataReporteFacturacionTotalPending: true,
        fetchDataReporteFacturacionTotalError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_SUCCESS:
      // The request is success
      return {
        ...state,
        dataReporteFacturacionTotal: action.data.data.map(item => { 
          return {
            aseguradora: item.aseguradora,
            fechaInicio: item.fechaInicio,
            formaPago: item.formaPago,
            nombreUsuario: item.nombreUsuario,
            numeroPoliza: item.numeroPoliza,
            primaNeta: parseFloat(item.primaNeta).toFixed(2),
            primaTotal: parseFloat(item.primaTotal).toFixed(2),
            tipoPoliza: item.tipoPoliza,
            tipoRegistro: item.tipoRegistro,
            usuario: item.usuario,
          };
        }),
        fetchDataReporteFacturacionTotalPending: false,
        fetchDataReporteFacturacionTotalError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDataReporteFacturacionTotalPending: false,
        fetchDataReporteFacturacionTotalError: action.data.error,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_FACTURACION_TOTAL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDataReporteFacturacionTotalError: null,
      };

    default:
      return state;
  }
}
