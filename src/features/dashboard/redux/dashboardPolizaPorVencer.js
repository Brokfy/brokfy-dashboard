import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_BEGIN,
  DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_SUCCESS,
  DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_FAILURE,
  DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_DISMISS_ERROR,
} from './constants';

export function dashboardPolizaPorVencer(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDashboardPolizaPorVencerError() {
  return {
    type: DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_DISMISS_ERROR,
  };
}

export function useDashboardPolizaPorVencer() {
  const dispatch = useDispatch();

  const { dashboardPolizaPorVencerPending, dashboardPolizaPorVencerError } = useSelector(
    state => ({
      dashboardPolizaPorVencerPending: state.dashboard.dashboardPolizaPorVencerPending,
      dashboardPolizaPorVencerError: state.dashboard.dashboardPolizaPorVencerError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(dashboardPolizaPorVencer(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDashboardPolizaPorVencerError());
  }, [dispatch]);

  return {
    dashboardPolizaPorVencer: boundAction,
    dashboardPolizaPorVencerPending,
    dashboardPolizaPorVencerError,
    dismissDashboardPolizaPorVencerError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        dashboardPolizaPorVencerPending: true,
        dashboardPolizaPorVencerError: null,
      };

    case DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_SUCCESS:
      // The request is success
      return {
        ...state,
        dashboardPolizaPorVencerPending: false,
        dashboardPolizaPorVencerError: null,
      };

    case DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_FAILURE:
      // The request is failed
      return {
        ...state,
        dashboardPolizaPorVencerPending: false,
        dashboardPolizaPorVencerError: action.data.error,
      };

    case DASHBOARD_DASHBOARD_POLIZA_POR_VENCER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        dashboardPolizaPorVencerError: null,
      };

    default:
      return state;
  }
}
