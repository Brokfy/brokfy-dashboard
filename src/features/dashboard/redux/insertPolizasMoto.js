import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_INSERT_POLIZAS_MOTO_BEGIN,
  DASHBOARD_INSERT_POLIZAS_MOTO_SUCCESS,
  DASHBOARD_INSERT_POLIZAS_MOTO_FAILURE,
  DASHBOARD_INSERT_POLIZAS_MOTO_DISMISS_ERROR,
  DASHBOARD_INSERT_POLIZAS_MOTO_DISMISS_SUCCESS,
} from './constants';

export function insertPolizasMoto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if (args.dismiss === true) {
      dispatch({
        type: DASHBOARD_INSERT_POLIZAS_MOTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_INSERT_POLIZAS_MOTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/PolizaMoto`,
        method: 'POST',
        data: {
          ...args.data,
          habilitada: args.data.habilitada === true ? "Si" : "No",
          idAseguradoras: parseInt(args.data.aseguradora),
          costo: parseFloat(args.data.costo),
          primaNeta: parseFloat(args.data.primaNeta),
          productoId: parseInt(args.data.producto),
          ano: parseInt(args.data.ano),
          placas: args.data.placa,
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
            type: DASHBOARD_INSERT_POLIZAS_MOTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_INSERT_POLIZAS_MOTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissInsertPolizasMotoError() {
  return {
    type: DASHBOARD_INSERT_POLIZAS_MOTO_DISMISS_ERROR,
  };
}

export function useInsertPolizasMoto() {
  const dispatch = useDispatch();

  const { insertPolizasMotoPending, insertPolizasMotoError, insertPolizasMotoNotify } = useSelector(
    state => ({
      insertPolizasMotoPending: state.dashboard.insertPolizasMotoPending,
      insertPolizasMotoError: state.dashboard.insertPolizasMotoError,
      insertPolizasMotoNotify: state.dashboard.insertPolizasMotoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(insertPolizasMoto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissInsertPolizasMotoError());
  }, [dispatch]);

  return {
    insertPolizasMoto: boundAction,
    insertPolizasMotoNotify: insertPolizasMotoNotify,
    insertPolizasMotoPending,
    insertPolizasMotoError,
    dismissInsertPolizasMotoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_INSERT_POLIZAS_MOTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        insertPolizasMotoNotify: false,
        insertPolizasMotoPending: true,
        insertPolizasMotoError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_MOTO_SUCCESS:
      // The request is success
      return {
        ...state,
        insertPolizasMotoNotify: true,
        insertPolizasMotoPending: false,
        insertPolizasMotoError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_MOTO_FAILURE:
      // The request is failed
      return {
        ...state,
        insertPolizasMotoNotify: true,
        insertPolizasMotoPending: false,
        insertPolizasMotoError: action.data.error,
      };

    case DASHBOARD_INSERT_POLIZAS_MOTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        insertPolizasMotoNotify: false,
        insertPolizasMotoError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_MOTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        insertPolizasMotoNotify: false,
        insertPolizasMotoError: null,
      };

    default:
      return state;
  }
}
