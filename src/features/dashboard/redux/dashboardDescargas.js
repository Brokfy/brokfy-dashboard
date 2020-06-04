import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DASHBOARD_DESCARGAS_BEGIN,
  DASHBOARD_DASHBOARD_DESCARGAS_SUCCESS,
  DASHBOARD_DASHBOARD_DESCARGAS_FAILURE,
  DASHBOARD_DASHBOARD_DESCARGAS_DISMISS_ERROR,
} from './constants';

export function dashboardDescargas(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_DASHBOARD_DESCARGAS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_DASHBOARD_DESCARGAS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DASHBOARD_DESCARGAS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDashboardDescargasError() {
  return {
    type: DASHBOARD_DASHBOARD_DESCARGAS_DISMISS_ERROR,
  };
}

export function useDashboardDescargas() {
  const dispatch = useDispatch();

  const { dashboardDescargasPending, dashboardDescargasError } = useSelector(
    state => ({
      dashboardDescargasPending: state.dashboard.dashboardDescargasPending,
      dashboardDescargasError: state.dashboard.dashboardDescargasError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(dashboardDescargas(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDashboardDescargasError());
  }, [dispatch]);

  return {
    dashboardDescargas: boundAction,
    dashboardDescargasPending,
    dashboardDescargasError,
    dismissDashboardDescargasError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DASHBOARD_DESCARGAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        dashboardDescargasPending: true,
        dashboardDescargasError: null,
      };

    case DASHBOARD_DASHBOARD_DESCARGAS_SUCCESS:
      // The request is success
      return {
        ...state,
        dashboardDescargasPending: false,
        dashboardDescargasError: null,
      };

    case DASHBOARD_DASHBOARD_DESCARGAS_FAILURE:
      // The request is failed
      return {
        ...state,
        dashboardDescargasPending: false,
        dashboardDescargasError: action.data.error,
      };

    case DASHBOARD_DASHBOARD_DESCARGAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        dashboardDescargasError: null,
      };

    default:
      return state;
  }
}
