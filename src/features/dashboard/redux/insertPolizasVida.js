import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_INSERT_POLIZAS_VIDA_BEGIN,
  DASHBOARD_INSERT_POLIZAS_VIDA_SUCCESS,
  DASHBOARD_INSERT_POLIZAS_VIDA_FAILURE,
  DASHBOARD_INSERT_POLIZAS_VIDA_DISMISS_ERROR,
  DASHBOARD_INSERT_POLIZAS_VIDA_DISMISS_SUCCESS,
} from './constants';
import format from 'date-fns/format';

export function insertPolizasVida(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if (args.dismiss === true) {
      dispatch({
        type: DASHBOARD_INSERT_POLIZAS_VIDA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_INSERT_POLIZAS_VIDA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/PolizaVida`,
        method: 'POST',
        data: {
          ...args.data,
          habilitada: args.data.habilitada === true ? "Si" : "No",
          idAseguradoras: parseInt(args.data.aseguradora),
          costo: parseFloat(args.data.costo),
          primaNeta: parseFloat(args.data.primaNeta),
          productoId: parseInt(args.data.producto),
          fumador: parseInt(args.data.fumador),
          revisado: 1,
        },
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_INSERT_POLIZAS_VIDA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_INSERT_POLIZAS_VIDA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissInsertPolizasVidaError() {
  return {
    type: DASHBOARD_INSERT_POLIZAS_VIDA_DISMISS_ERROR,
  };
}

export function useInsertPolizasVida() {
  const dispatch = useDispatch();

  const { insertPolizasVidaPending, insertPolizasVidaError, insertPolizasVidaNotify } = useSelector(
    state => ({
      insertPolizasVidaPending: state.dashboard.insertPolizasVidaPending,
      insertPolizasVidaError: state.dashboard.insertPolizasVidaError,
      insertPolizasVidaNotify: state.dashboard.insertPolizasVidaNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(insertPolizasVida(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissInsertPolizasVidaError());
  }, [dispatch]);

  return {
    insertPolizasVida: boundAction,
    insertPolizasVidaNotify: insertPolizasVidaNotify,
    insertPolizasVidaPending,
    insertPolizasVidaError,
    dismissInsertPolizasVidaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_INSERT_POLIZAS_VIDA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        insertPolizasVidaNotify: false,
        insertPolizasVidaPending: true,
        insertPolizasVidaError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_VIDA_SUCCESS:
      // The request is success
      return {
        ...state,
        insertPolizasVidaNotify: true,
        insertPolizasVidaPending: false,
        insertPolizasVidaError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_VIDA_FAILURE:
      // The request is failed
      return {
        ...state,
        insertPolizasVidaNotify: true,
        insertPolizasVidaPending: false,
        insertPolizasVidaError: action.data.error,
      };

    case DASHBOARD_INSERT_POLIZAS_VIDA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        insertPolizasVidaNotify: false,
        insertPolizasVidaError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_VIDA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        insertPolizasVidaNotify: false,
        insertPolizasVidaError: null,
      };

    default:
      return state;
  }
}
