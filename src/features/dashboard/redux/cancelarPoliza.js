import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_CANCELAR_POLIZA_BEGIN,
  DASHBOARD_CANCELAR_POLIZA_SUCCESS,
  DASHBOARD_CANCELAR_POLIZA_FAILURE,
  DASHBOARD_CANCELAR_POLIZA_DISMISS_ERROR,
} from './constants';

export function cancelarPoliza(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_CANCELAR_POLIZA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_CANCELAR_POLIZA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_CANCELAR_POLIZA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissCancelarPolizaError() {
  return {
    type: DASHBOARD_CANCELAR_POLIZA_DISMISS_ERROR,
  };
}

export function useCancelarPoliza() {
  const dispatch = useDispatch();

  const { cancelarPolizaPending, cancelarPolizaError } = useSelector(
    state => ({
      cancelarPolizaPending: state.dashboard.cancelarPolizaPending,
      cancelarPolizaError: state.dashboard.cancelarPolizaError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(cancelarPoliza(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissCancelarPolizaError());
  }, [dispatch]);

  return {
    cancelarPoliza: boundAction,
    cancelarPolizaPending,
    cancelarPolizaError,
    dismissCancelarPolizaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_CANCELAR_POLIZA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        cancelarPolizaPending: true,
        cancelarPolizaError: null,
      };

    case DASHBOARD_CANCELAR_POLIZA_SUCCESS:
      // The request is success
      return {
        ...state,
        cancelarPolizaPending: false,
        cancelarPolizaError: null,
      };

    case DASHBOARD_CANCELAR_POLIZA_FAILURE:
      // The request is failed
      return {
        ...state,
        cancelarPolizaPending: false,
        cancelarPolizaError: action.data.error,
      };

    case DASHBOARD_CANCELAR_POLIZA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        cancelarPolizaError: null,
      };

    default:
      return state;
  }
}
