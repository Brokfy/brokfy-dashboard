import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_CANCELAR_POLIZA_BEGIN,
  DASHBOARD_CANCELAR_POLIZA_SUCCESS,
  DASHBOARD_CANCELAR_POLIZA_FAILURE,
  DASHBOARD_CANCELAR_POLIZA_DISMISS_SUCCESS,
  DASHBOARD_CANCELAR_POLIZA_DISMISS_ERROR,
} from './constants';

export function cancelarPoliza(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if (args.dismiss === true) {
      dispatch({
        type: DASHBOARD_CANCELAR_POLIZA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_CANCELAR_POLIZA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/CancelarPoliza/${args.noPoliza}`,
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_CANCELAR_POLIZA_SUCCESS,
            data: args.noPoliza,
          });
          /* dispatch({
            type: DASHBOARD_UPDATE_DETALLE_CLIENTE_SUCCESS,
            data: args.noPoliza,
          }); */
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

  const { cancelarPolizaPending, cancelarPolizaError, cancelarPolizaNotify } = useSelector(
    state => ({
      cancelarPolizaPending: state.dashboard.cancelarPolizaPending,
      cancelarPolizaError: state.dashboard.cancelarPolizaError,
      cancelarPolizaNotify: state.dashboard.cancelarPolizaNotify,
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
    cancelarPolizaNotify,
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
        cancelarPolizaNotify: false,
        cancelarPolizaError: null,
      };

    case DASHBOARD_CANCELAR_POLIZA_SUCCESS:
      // The request is success

      return {
        ...state,
        detalleUsuario: {
          ...state.detalleUsuario,
          polizas: [...state.detalleUsuario.polizas.map(x => { return (x.noPoliza === action.data ? { ...x, estadoPoliza: "CANCELADA" } : x) })]
        },
        cancelarPolizaPending: false,
        cancelarPolizaNotify: true,
        cancelarPolizaError: null,
      };

    case DASHBOARD_CANCELAR_POLIZA_FAILURE:
      // The request is failed
      return {
        ...state,
        cancelarPolizaPending: false,
        cancelarPolizaNotify: true,
        cancelarPolizaError: action.data.error,
      };

    case DASHBOARD_CANCELAR_POLIZA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        cancelarPolizaNotify: false,
        cancelarPolizaError: null,
      };

    case DASHBOARD_CANCELAR_POLIZA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        cancelarPolizaNotify: false,
        cancelarPolizaError: null,
      };

    default:
      return state;
  }
}
