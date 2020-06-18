import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DASHBOARD_CONSULTA_POLIZA_BEGIN,
  DASHBOARD_DASHBOARD_CONSULTA_POLIZA_SUCCESS,
  DASHBOARD_DASHBOARD_CONSULTA_POLIZA_FAILURE,
  DASHBOARD_DASHBOARD_CONSULTA_POLIZA_DISMISS_ERROR,
} from './constants';

export function dashboardConsultaPoliza(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_DASHBOARD_CONSULTA_POLIZA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://ec2-3-136-94-107.us-east-2.compute.amazonaws.com:4300/api/DashboardConsultaPoliza?noPoliza=${args.noPoliza}`,
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
            type: DASHBOARD_DASHBOARD_CONSULTA_POLIZA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DASHBOARD_CONSULTA_POLIZA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDashboardConsultaPolizaError() {
  return {
    type: DASHBOARD_DASHBOARD_CONSULTA_POLIZA_DISMISS_ERROR,
  };
}

export function useDashboardConsultaPoliza() {
  const consultaPoliza = useSelector(state => state.dashboard.consultaPoliza);

  const dispatch = useDispatch();

  const { dashboardConsultaPolizaPending, dashboardConsultaPolizaError } = useSelector(
    state => ({
      dashboardConsultaPolizaPending: state.dashboard.dashboardConsultaPolizaPending,
      dashboardConsultaPolizaError: state.dashboard.dashboardConsultaPolizaError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(dashboardConsultaPoliza(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDashboardConsultaPolizaError());
  }, [dispatch]);

  return {
    consultaPoliza: consultaPoliza,
    dashboardConsultaPoliza: boundAction,
    dashboardConsultaPolizaPending,
    dashboardConsultaPolizaError,
    dismissDashboardConsultaPolizaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DASHBOARD_CONSULTA_POLIZA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        dashboardConsultaPolizaPending: true,
        dashboardConsultaPolizaError: null,
      };

    case DASHBOARD_DASHBOARD_CONSULTA_POLIZA_SUCCESS:
      // The request is success
      return {
        ...state,
        consultaPoliza: action.data.data,
        dashboardConsultaPolizaPending: false,
        dashboardConsultaPolizaError: null,
      };

    case DASHBOARD_DASHBOARD_CONSULTA_POLIZA_FAILURE:
      // The request is failed
      return {
        ...state,
        dashboardConsultaPolizaPending: false,
        dashboardConsultaPolizaError: action.data.error,
      };

    case DASHBOARD_DASHBOARD_CONSULTA_POLIZA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        dashboardConsultaPolizaError: null,
      };

    default:
      return state;
  }
}
