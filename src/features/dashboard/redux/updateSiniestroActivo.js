import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_SINIESTRO_ACTIVO_BEGIN,
  DASHBOARD_UPDATE_SINIESTRO_ACTIVO_SUCCESS,
  DASHBOARD_UPDATE_SINIESTRO_ACTIVO_FAILURE,
  DASHBOARD_UPDATE_SINIESTRO_ACTIVO_DISMISS_ERROR,
} from './constants';

export function updateSiniestroActivo(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_SINIESTRO_ACTIVO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_UPDATE_SINIESTRO_ACTIVO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_SINIESTRO_ACTIVO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateSiniestroActivoError() {
  return {
    type: DASHBOARD_UPDATE_SINIESTRO_ACTIVO_DISMISS_ERROR,
  };
}

export function useUpdateSiniestroActivo() {
  const dispatch = useDispatch();

  const { updateSiniestroActivoPending, updateSiniestroActivoError } = useSelector(
    state => ({
      updateSiniestroActivoPending: state.dashboard.updateSiniestroActivoPending,
      updateSiniestroActivoError: state.dashboard.updateSiniestroActivoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateSiniestroActivo(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateSiniestroActivoError());
  }, [dispatch]);

  return {
    updateSiniestroActivo: boundAction,
    updateSiniestroActivoPending,
    updateSiniestroActivoError,
    dismissUpdateSiniestroActivoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_SINIESTRO_ACTIVO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateSiniestroActivoPending: true,
        updateSiniestroActivoError: null,
      };

    case DASHBOARD_UPDATE_SINIESTRO_ACTIVO_SUCCESS:
      // The request is success
      return {
        ...state,
        updateSiniestroActivoPending: false,
        updateSiniestroActivoError: null,
      };

    case DASHBOARD_UPDATE_SINIESTRO_ACTIVO_FAILURE:
      // The request is failed
      return {
        ...state,
        updateSiniestroActivoPending: false,
        updateSiniestroActivoError: action.data.error,
      };

    case DASHBOARD_UPDATE_SINIESTRO_ACTIVO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateSiniestroActivoError: null,
      };

    default:
      return state;
  }
}
