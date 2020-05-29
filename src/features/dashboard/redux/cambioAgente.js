import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_CAMBIO_AGENTE_BEGIN,
  DASHBOARD_CAMBIO_AGENTE_SUCCESS,
  DASHBOARD_CAMBIO_AGENTE_FAILURE,
  DASHBOARD_CAMBIO_AGENTE_DISMISS_ERROR,
} from './constants';

export function cambioAgente(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_CAMBIO_AGENTE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_CAMBIO_AGENTE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_CAMBIO_AGENTE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissCambioAgenteError() {
  return {
    type: DASHBOARD_CAMBIO_AGENTE_DISMISS_ERROR,
  };
}

export function useCambioAgente() {
  const dispatch = useDispatch();

  const { cambioAgentePending, cambioAgenteError } = useSelector(
    state => ({
      cambioAgentePending: state.dashboard.cambioAgentePending,
      cambioAgenteError: state.dashboard.cambioAgenteError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(cambioAgente(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissCambioAgenteError());
  }, [dispatch]);

  return {
    cambioAgente: boundAction,
    cambioAgentePending,
    cambioAgenteError,
    dismissCambioAgenteError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_CAMBIO_AGENTE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        cambioAgentePending: true,
        cambioAgenteError: null,
      };

    case DASHBOARD_CAMBIO_AGENTE_SUCCESS:
      // The request is success
      return {
        ...state,
        cambioAgentePending: false,
        cambioAgenteError: null,
      };

    case DASHBOARD_CAMBIO_AGENTE_FAILURE:
      // The request is failed
      return {
        ...state,
        cambioAgentePending: false,
        cambioAgenteError: action.data.error,
      };

    case DASHBOARD_CAMBIO_AGENTE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        cambioAgenteError: null,
      };

    default:
      return state;
  }
}
