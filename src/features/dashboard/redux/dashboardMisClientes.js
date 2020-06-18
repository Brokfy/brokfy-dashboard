import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DASHBOARD_MIS_CLIENTES_BEGIN,
  DASHBOARD_DASHBOARD_MIS_CLIENTES_SUCCESS,
  DASHBOARD_DASHBOARD_MIS_CLIENTES_FAILURE,
  DASHBOARD_DASHBOARD_MIS_CLIENTES_DISMISS_ERROR,
} from './constants';

export function dashboardMisClientes(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_DASHBOARD_MIS_CLIENTES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {

      const options = {
        url: `https://ec2-3-136-94-107.us-east-2.compute.amazonaws.com:4300/api/DashboardMisClientes?username=${args.username}`,
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
            type: DASHBOARD_DASHBOARD_MIS_CLIENTES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DASHBOARD_MIS_CLIENTES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDashboardMisClientesError() {
  return {
    type: DASHBOARD_DASHBOARD_MIS_CLIENTES_DISMISS_ERROR,
  };
}

export function useDashboardMisClientes() {
  const polizasCliente = useSelector(state => state.dashboard.polizasCliente);
  const dispatch = useDispatch();

  const { dashboardMisClientesPending, dashboardMisClientesError } = useSelector(
    state => ({
      dashboardMisClientesPending: state.dashboard.dashboardMisClientesPending,
      dashboardMisClientesError: state.dashboard.dashboardMisClientesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(dashboardMisClientes(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDashboardMisClientesError());
  }, [dispatch]);

  return {
    polizasCliente: polizasCliente,
    dashboardMisClientes: boundAction,
    dashboardMisClientesPending,
    dashboardMisClientesError,
    dismissDashboardMisClientesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DASHBOARD_MIS_CLIENTES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        dashboardMisClientesPending: true,
        dashboardMisClientesError: null,
      };

    case DASHBOARD_DASHBOARD_MIS_CLIENTES_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasCliente: action.data.data,
        dashboardMisClientesPending: false,
        dashboardMisClientesError: null,
      };

    case DASHBOARD_DASHBOARD_MIS_CLIENTES_FAILURE:
      // The request is failed
      return {
        ...state,
        dashboardMisClientesPending: false,
        dashboardMisClientesError: action.data.error,
      };

    case DASHBOARD_DASHBOARD_MIS_CLIENTES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        dashboardMisClientesError: null,
      };

    default:
      return state;
  }
}
