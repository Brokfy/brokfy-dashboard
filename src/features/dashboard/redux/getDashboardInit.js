import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_GET_DASHBOARD_INIT_BEGIN,
  DASHBOARD_GET_DASHBOARD_INIT_SUCCESS,
  DASHBOARD_GET_DASHBOARD_INIT_FAILURE,
  DASHBOARD_GET_DASHBOARD_INIT_DISMISS_ERROR,
} from './constants';

export function getDashboardInit(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_GET_DASHBOARD_INIT_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://3.136.94.107:4300/api/GetDashboardInit`,
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
            type: DASHBOARD_GET_DASHBOARD_INIT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_GET_DASHBOARD_INIT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetDashboardInitError() {
  return {
    type: DASHBOARD_GET_DASHBOARD_INIT_DISMISS_ERROR,
  };
}

export function useGetDashboardInit() {
  const dashboardInit = useSelector(state => state.dashboard.dashboardInit);

  const dispatch = useDispatch();

  const { getDashboardInitPending, getDashboardInitError } = useSelector(
    state => ({
      getDashboardInitPending: state.dashboard.getDashboardInitPending,
      getDashboardInitError: state.dashboard.getDashboardInitError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getDashboardInit(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetDashboardInitError());
  }, [dispatch]);

  return {
    dashboardInit: dashboardInit,
    getDashboardInit: boundAction,
    getDashboardInitPending,
    getDashboardInitError,
    dismissGetDashboardInitError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_GET_DASHBOARD_INIT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        getDashboardInitPending: true,
        getDashboardInitError: null,
      };

    case DASHBOARD_GET_DASHBOARD_INIT_SUCCESS:
      // The request is success
      return {
        ...state,
        dashboardInit: action.data.data,
        getDashboardInitPending: false,
        getDashboardInitError: null,
      };

    case DASHBOARD_GET_DASHBOARD_INIT_FAILURE:
      // The request is failed
      return {
        ...state,
        getDashboardInitPending: false,
        getDashboardInitError: action.data.error,
      };

    case DASHBOARD_GET_DASHBOARD_INIT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        getDashboardInitError: null,
      };

    default:
      return state;
  }
}
