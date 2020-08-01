import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_BEGIN,
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_SUCCESS,
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_FAILURE,
  DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_DISMISS_ERROR,
} from './constants';

export function fetchDataReportePolizasBrokfyVsOtras(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_BEGIN,
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
            type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDataReportePolizasBrokfyVsOtrasError() {
  return {
    type: DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_DISMISS_ERROR,
  };
}

export function useFetchDataReportePolizasBrokfyVsOtras() {
  const dataReportePolizasBrokfyVsOtras = useSelector(state => state.dashboard.dataReportePolizasBrokfyVsOtras);

  const dispatch = useDispatch();

  const { fetchDataReportePolizasBrokfyVsOtrasPending, fetchDataReportePolizasBrokfyVsOtrasError } = useSelector(
    state => ({
      fetchDataReportePolizasBrokfyVsOtrasPending: state.dashboard.fetchDataReportePolizasBrokfyVsOtrasPending,
      fetchDataReportePolizasBrokfyVsOtrasError: state.dashboard.fetchDataReportePolizasBrokfyVsOtrasError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDataReportePolizasBrokfyVsOtras(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDataReportePolizasBrokfyVsOtrasError());
  }, [dispatch]);

  return {
    dataReportePolizasBrokfyVsOtras,
    fetchDataReportePolizasBrokfyVsOtras: boundAction,
    fetchDataReportePolizasBrokfyVsOtrasPending,
    fetchDataReportePolizasBrokfyVsOtrasError,
    dismissFetchDataReportePolizasBrokfyVsOtrasError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDataReportePolizasBrokfyVsOtrasPending: true,
        fetchDataReportePolizasBrokfyVsOtrasError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_SUCCESS:
      // The request is success
      return {
        ...state,
        dataReportePolizasBrokfyVsOtras: action.data.data.map(item => { 
          return {
            tipoRegistro: item.tipoRegistro,
            aseguradora: item.aseguradora,
            tipoPoliza: item.tipoPoliza,
            primaTotal: item.primaTotal,
            comisionesGeneradas: item.comisionesGeneradas,
            totalizador: item.totalizador,
          };
        }),
        fetchDataReportePolizasBrokfyVsOtrasPending: false,
        fetchDataReportePolizasBrokfyVsOtrasError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDataReportePolizasBrokfyVsOtrasPending: false,
        fetchDataReportePolizasBrokfyVsOtrasError: action.data.error,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_POLIZAS_BROKFY_VS_OTRAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDataReportePolizasBrokfyVsOtrasError: null,
      };

    default:
      return state;
  }
}
