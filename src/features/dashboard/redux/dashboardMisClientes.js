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
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
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
