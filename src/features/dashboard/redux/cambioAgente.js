import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_CAMBIO_AGENTE_BEGIN,
  DASHBOARD_CAMBIO_AGENTE_SUCCESS,
  DASHBOARD_CAMBIO_AGENTE_FAILURE,
  DASHBOARD_CAMBIO_AGENTE_DISMISS_SUCCESS,
  DASHBOARD_CAMBIO_AGENTE_DISMISS_ERROR,
} from './constants';

export function cambioAgente(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_CAMBIO_AGENTE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/CambiarAgente/${args.noPoliza}`,
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
            type: DASHBOARD_CAMBIO_AGENTE_SUCCESS,
            data: args.noPoliza,
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

  const { cambioAgentePending, cambioAgenteError, cambioAgenteNotify } = useSelector(
    state => ({
      cambioAgentePending: state.dashboard.cambioAgentePending,
      cambioAgenteError: state.dashboard.cambioAgenteError,
      cambioAgenteNotify: state.dashboard.cambioAgenteNotify,
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
        cambioAgenteNotify: false,
        cambioAgenteError: null,
      };

    case DASHBOARD_CAMBIO_AGENTE_SUCCESS:
      // The request is success
      return {
        ...state,
        detalleUsuario: {
          ...state.detalleUsuario,
          polizas: [...state.detalleUsuario.polizas.map(x => { return (x.noPoliza === action.data ? { ...x, polizaPropia: "No" } : x) })]
        },
        cambioAgentePending: false,
        cambioAgenteNotify: true,
        cambioAgenteError: null,
      };

    case DASHBOARD_CAMBIO_AGENTE_FAILURE:
      // The request is failed
      return {
        ...state,
        cambioAgentePending: false,
        cambioAgenteNotify: true,
        cambioAgenteError: action.data.error,
      };

      case DASHBOARD_CAMBIO_AGENTE_DISMISS_SUCCESS:
        // Dismiss the request failure error
        return {
          ...state,
          cambioAgenteNotify: false,
          cambioAgenteError: null,
        };
  
      case DASHBOARD_CAMBIO_AGENTE_DISMISS_ERROR:
        // Dismiss the request failure error
        return {
          ...state,
          cambioAgenteNotify: false,
          cambioAgenteError: null,
        };

    default:
      return state;
  }
}
