import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_DETALLE_CLIENTE_BEGIN,
  DASHBOARD_UPDATE_DETALLE_CLIENTE_SUCCESS,
  DASHBOARD_UPDATE_DETALLE_CLIENTE_FAILURE,
  DASHBOARD_UPDATE_DETALLE_CLIENTE_DISMISS_ERROR,
} from './constants';

export function updateDetalleCliente(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_DETALLE_CLIENTE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_UPDATE_DETALLE_CLIENTE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_DETALLE_CLIENTE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateDetalleClienteError() {
  return {
    type: DASHBOARD_UPDATE_DETALLE_CLIENTE_DISMISS_ERROR,
  };
}

export function useUpdateDetalleCliente() {
  const dispatch = useDispatch();

  const { updateDetalleClientePending, updateDetalleClienteError } = useSelector(
    state => ({
      updateDetalleClientePending: state.dashboard.updateDetalleClientePending,
      updateDetalleClienteError: state.dashboard.updateDetalleClienteError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateDetalleCliente(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateDetalleClienteError());
  }, [dispatch]);

  return {
    updateDetalleCliente: boundAction,
    updateDetalleClientePending,
    updateDetalleClienteError,
    dismissUpdateDetalleClienteError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_DETALLE_CLIENTE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateDetalleClientePending: true,
        updateDetalleClienteError: null,
      };

    case DASHBOARD_UPDATE_DETALLE_CLIENTE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateDetalleClientePending: false,
        updateDetalleClienteError: null,
      };

    case DASHBOARD_UPDATE_DETALLE_CLIENTE_FAILURE:
      // The request is failed
      return {
        ...state,
        updateDetalleClientePending: false,
        updateDetalleClienteError: action.data.error,
      };

    case DASHBOARD_UPDATE_DETALLE_CLIENTE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateDetalleClienteError: null,
      };

    default:
      return state;
  }
}
