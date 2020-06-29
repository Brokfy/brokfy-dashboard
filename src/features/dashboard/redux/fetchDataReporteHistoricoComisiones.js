import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_BEGIN,
  DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_SUCCESS,
  DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_FAILURE,
  DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_DISMISS_ERROR,
} from './constants';

export function fetchDataReporteHistoricoComisiones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_BEGIN,
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
            type: DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDataReporteHistoricoComisionesError() {
  return {
    type: DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_DISMISS_ERROR,
  };
}

export function useFetchDataReporteHistoricoComisiones() {
  const dataReporteHistoricoComisiones = useSelector(state => state.dashboard.dataReporteHistoricoComisiones);

  const dispatch = useDispatch();

  const { fetchDataReporteHistoricoComisionesPending, fetchDataReporteHistoricoComisionesError } = useSelector(
    state => ({
      fetchDataReporteHistoricoComisionesPending: state.dashboard.fetchDataReporteHistoricoComisionesPending,
      fetchDataReporteHistoricoComisionesError: state.dashboard.fetchDataReporteHistoricoComisionesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDataReporteHistoricoComisiones(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDataReporteHistoricoComisionesError());
  }, [dispatch]);

  return {
    dataReporteHistoricoComisiones,
    fetchDataReporteHistoricoComisiones: boundAction,
    fetchDataReporteHistoricoComisionesPending,
    fetchDataReporteHistoricoComisionesError,
    dismissFetchDataReporteHistoricoComisionesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDataReporteHistoricoComisionesPending: true,
        fetchDataReporteHistoricoComisionesError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        dataReporteHistoricoComisiones: action.data.data.map(item => { 
          return {
            tipoRegistro: item.tipoRegistro,
            aseguradora: item.aseguradora,
            fechaCambio: item.fechaCambio,
            auto: item.auto,
            moto: item.moto,
            hogar: item.hogar,
            salud: item.salud,
            vida: item.vida,
            gadget: item.gadget,
            mascota: item.mascota,
            viaje: item.viaje,
            retiro: item.retiro,
            pyme: item.pyme,
          };
        }),
        fetchDataReporteHistoricoComisionesPending: false,
        fetchDataReporteHistoricoComisionesError: null,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDataReporteHistoricoComisionesPending: false,
        fetchDataReporteHistoricoComisionesError: action.data.error,
      };

    case DASHBOARD_FETCH_DATA_REPORTE_HISTORICO_COMISIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDataReporteHistoricoComisionesError: null,
      };

    default:
      return state;
  }
}
