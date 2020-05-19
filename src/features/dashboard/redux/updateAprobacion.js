import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_APROBACION_BEGIN,
  DASHBOARD_UPDATE_APROBACION_SUCCESS,
  DASHBOARD_UPDATE_APROBACION_FAILURE,
  DASHBOARD_UPDATE_APROBACION_DISMISS_ERROR,
} from './constants';

export function updateAprobacion(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_APROBACION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_UPDATE_APROBACION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_APROBACION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateAprobacionError() {
  return {
    type: DASHBOARD_UPDATE_APROBACION_DISMISS_ERROR,
  };
}

export function useUpdateAprobacion() {
  const dispatch = useDispatch();

  const { updateAprobacionPending, updateAprobacionError } = useSelector(
    state => ({
      updateAprobacionPending: state.dashboard.updateAprobacionPending,
      updateAprobacionError: state.dashboard.updateAprobacionError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateAprobacion(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateAprobacionError());
  }, [dispatch]);

  return {
    updateAprobacion: boundAction,
    updateAprobacionPending,
    updateAprobacionError,
    dismissUpdateAprobacionError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_APROBACION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateAprobacionPending: true,
        updateAprobacionError: null,
      };

    case DASHBOARD_UPDATE_APROBACION_SUCCESS:
      // The request is success
      return {
        ...state,
        updateAprobacionPending: false,
        updateAprobacionError: null,
      };

    case DASHBOARD_UPDATE_APROBACION_FAILURE:
      // The request is failed
      return {
        ...state,
        updateAprobacionPending: false,
        updateAprobacionError: action.data.error,
      };

    case DASHBOARD_UPDATE_APROBACION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateAprobacionError: null,
      };

    default:
      return state;
  }
}
