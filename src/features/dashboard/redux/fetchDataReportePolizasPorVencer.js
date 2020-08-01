import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_BEGIN,
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_SUCCESS,
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_FAILURE,
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_DISMISS_ERROR,
} from './constants';

export function fetchDataReportePolizasPorVencer(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_BEGIN,
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
            type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDataReportePolizasPorVencerError() {
  return {
    type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_DISMISS_ERROR,
  };
}

export function useFetchDataReportePolizasPorVencer() {
  const dataReportePolizasPorVencer = useSelector(state => state.dashboard.dataReportePolizasPorVencer);

  const dispatch = useDispatch();

  const { fetchDataReportePolizasPorVencerPending, fetchDataReportePolizasPorVencerError } = useSelector(
    state => ({
      fetchDataReportePolizasPorVencerPending: state.dashboard.fetchDataReportePolizasPorVencerPending,
      fetchDataReportePolizasPorVencerError: state.dashboard.fetchDataReportePolizasPorVencerError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDataReportePolizasPorVencer(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDataReportePolizasPorVencerError());
  }, [dispatch]);

  return {
    dataReportePolizasPorVencer,
    fetchDataReportePolizasPorVencer: boundAction,
    fetchDataReportePolizasPorVencerPending,
    fetchDataReportePolizasPorVencerError,
    dismissFetchDataReportePolizasPorVencerError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDataReportePolizasPorVencerPending: true,
        fetchDataReportePolizasPorVencerError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_SUCCESS:
      // The request is success
      return {
        ...state,
        dataReportePolizasPorVencer: action.data.data.map(item => { 
          return {
            tipoRegistro: item.tipoRegistro,
            aseguradora: item.aseguradora,
            tipoPoliza: item.tipoPoliza,
            numeroPoliza: item.numeroPoliza,
            usuario: item.usuario,
            nombreUsuario: item.nombreUsuario,
            fechaFin: item.fechaFin,
            totalizador: item.totalizador,
          };
        }),
        fetchDataReportePolizasPorVencerPending: false,
        fetchDataReportePolizasPorVencerError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDataReportePolizasPorVencerPending: false,
        fetchDataReportePolizasPorVencerError: action.data.error,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_POR_VENCER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDataReportePolizasPorVencerError: null,
      };

    default:
      return state;
  }
}
