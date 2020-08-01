import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_LISTADO_REPORTES_BEGIN,
  DASHBOARD_FETCH_LISTADO_REPORTES_SUCCESS,
  DASHBOARD_FETCH_LISTADO_REPORTES_FAILURE,
  DASHBOARD_FETCH_LISTADO_REPORTES_DISMISS_ERROR,
} from './constants';

export function fetchListadoReportes(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_LISTADO_REPORTES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/infoReportes`,
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
            type: DASHBOARD_FETCH_LISTADO_REPORTES_SUCCESS,
            data: { data: res.data },
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_LISTADO_REPORTES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchListadoReportesError() {
  return {
    type: DASHBOARD_FETCH_LISTADO_REPORTES_DISMISS_ERROR,
  };
}

export function useFetchListadoReportes() {
  const listadoReportes = useSelector(state => state.dashboard.listadoReportes);

  const dispatch = useDispatch();

  const { fetchListadoReportesPending, fetchListadoReportesError } = useSelector(
    state => ({
      fetchListadoReportesPending: state.dashboard.fetchListadoReportesPending,
      fetchListadoReportesError: state.dashboard.fetchListadoReportesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchListadoReportes(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchListadoReportesError());
  }, [dispatch]);

  return {
    listadoReportes,
    fetchListadoReportes: boundAction,
    fetchListadoReportesPending,
    fetchListadoReportesError,
    dismissFetchListadoReportesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_LISTADO_REPORTES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchListadoReportesPending: true,
        fetchListadoReportesError: null,
      };

    case DASHBOARD_FETCH_LISTADO_REPORTES_SUCCESS:
      // The request is success
      return {
        ...state,
        listadoReportes: action.data.data.map(item => {
          return {
            idReporte: parseInt(item.idReporte),
            nombre: item.nombre,
            descripcion: item.descripcion,
            path: item.path,
          }
        }),
        fetchListadoReportesPending: false,
        fetchListadoReportesError: null,
      };

    case DASHBOARD_FETCH_LISTADO_REPORTES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchListadoReportesPending: false,
        fetchListadoReportesError: action.data.error,
      };

    case DASHBOARD_FETCH_LISTADO_REPORTES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchListadoReportesError: null,
      };

    default:
      return state;
  }
}
