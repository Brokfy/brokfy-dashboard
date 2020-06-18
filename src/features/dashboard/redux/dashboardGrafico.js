import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DASHBOARD_GRAFICO_BEGIN,
  DASHBOARD_DASHBOARD_GRAFICO_SUCCESS,
  DASHBOARD_DASHBOARD_GRAFICO_FAILURE,
  DASHBOARD_DASHBOARD_GRAFICO_DISMISS_ERROR,
} from './constants';

export function dashboardGrafico(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_DASHBOARD_GRAFICO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/DashboardGrafico`,
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
            type: DASHBOARD_DASHBOARD_GRAFICO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DASHBOARD_GRAFICO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDashboardGraficoError() {
  return {
    type: DASHBOARD_DASHBOARD_GRAFICO_DISMISS_ERROR,
  };
}

export function useDashboardGrafico() {
  const grafico = useSelector(state => state.dashboard.grafico);

  const dispatch = useDispatch();

  const { dashboardGraficoPending, dashboardGraficoError } = useSelector(
    state => ({
      dashboardGraficoPending: state.dashboard.dashboardGraficoPending,
      dashboardGraficoError: state.dashboard.dashboardGraficoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(dashboardGrafico(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDashboardGraficoError());
  }, [dispatch]);

  return {
    dashboardGrafico: boundAction,
    dashboardGraficoPending,
    dashboardGraficoError,
    dismissDashboardGraficoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DASHBOARD_GRAFICO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        dashboardGraficoPending: true,
        dashboardGraficoError: null,
      };

    case DASHBOARD_DASHBOARD_GRAFICO_SUCCESS:
      // The request is success
      return {
        ...state,
        grafico: action.data.data,
        dashboardGraficoPending: false,
        dashboardGraficoError: null,
      };

    case DASHBOARD_DASHBOARD_GRAFICO_FAILURE:
      // The request is failed
      return {
        ...state,
        dashboardGraficoPending: false,
        dashboardGraficoError: action.data.error,
      };

    case DASHBOARD_DASHBOARD_GRAFICO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        dashboardGraficoError: null,
      };

    default:
      return state;
  }
}
