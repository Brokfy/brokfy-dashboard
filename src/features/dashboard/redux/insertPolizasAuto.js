import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_INSERT_POLIZAS_AUTO_BEGIN,
  DASHBOARD_INSERT_POLIZAS_AUTO_SUCCESS,
  DASHBOARD_INSERT_POLIZAS_AUTO_FAILURE,
  DASHBOARD_INSERT_POLIZAS_AUTO_DISMISS_ERROR,
  DASHBOARD_INSERT_POLIZAS_AUTO_DISMISS_SUCCESS,
} from './constants';

export function insertPolizasAuto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if (args.dismiss === true) {
      dispatch({
        type: DASHBOARD_INSERT_POLIZAS_AUTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_INSERT_POLIZAS_AUTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/PolizaAuto`,
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
          axios({
            ...options,
            url: `https://localhost:44341/api/PolizaAuto?propia=Si`,
            method: "GET"
          }).then(
            (res) => {
              dispatch({
                type: DASHBOARD_INSERT_POLIZAS_AUTO_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_INSERT_POLIZAS_AUTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissInsertPolizasAutoError() {
  return {
    type: DASHBOARD_INSERT_POLIZAS_AUTO_DISMISS_ERROR,
  };
}

export function useInsertPolizasAuto() {
  const dispatch = useDispatch();

  const { insertPolizasAutoPending, insertPolizasAutoError, insertPolizasAutoNotify } = useSelector(
    state => ({
      insertPolizasAutoPending: state.dashboard.insertPolizasAutoPending,
      insertPolizasAutoError: state.dashboard.insertPolizasAutoError,
      insertPolizasAutoNotify: state.dashboard.insertPolizasAutoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(insertPolizasAuto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissInsertPolizasAutoError());
  }, [dispatch]);

  return {
    insertPolizasAuto: boundAction,
    insertPolizasAutoNotify: insertPolizasAutoNotify,
    insertPolizasAutoPending,
    insertPolizasAutoError,
    dismissInsertPolizasAutoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_INSERT_POLIZAS_AUTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        insertPolizasAutoNotify: false,
        insertPolizasAutoPending: true,
        insertPolizasAutoError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_AUTO_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasAuto: action.data.data.map(item => {
          return {
            noPoliza: item.noPoliza,
            formaPago: item.formaPago,
            proximoPago: item.proximoPago,
            fechaInicio: item.fechaInicio,
            fechaFin: item.fechaFin,
            idAseguradoras: parseInt(item.idAseguradoras),
            costo: parseFloat(item.costo),
            primaNeta: parseFloat(item.primaNeta),
            username: item.username,
            productoId: parseInt(item.productoId),
            habilitada: item.habilitada,
            noAsegurado: item.noAsegurado,
            polizaPropia: item.polizaPropia,
            polizaPdf: item.polizaPdf,
            reciboPdf: item.reciboPdf,
            rcUsaCanada: item.rcUsaCanada,
            costoPrimerRecibo: item.costoPrimerRecibo,
            costoRecibosSubsecuentes: item.costoRecibosSubsecuentes,
            marca: item.marca,
            modelo: item.modelo,
            ano: parseInt(item.ano),
            placas: item.placas,
            clave: item.clave,
            codigoPostal: item.codigoPostal
          };
        }),
        insertPolizasAutoNotify: true,
        insertPolizasAutoPending: false,
        insertPolizasAutoError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_AUTO_FAILURE:
      // The request is failed
      return {
        ...state,
        insertPolizasAutoNotify: true,
        insertPolizasAutoPending: false,
        insertPolizasAutoError: action.data.error,
      };

    case DASHBOARD_INSERT_POLIZAS_AUTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        insertPolizasAutoNotify: false,
        insertPolizasAutoError: null,
      };

    case DASHBOARD_INSERT_POLIZAS_AUTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        insertPolizasAutoNotify: false,
        insertPolizasAutoError: null,
      };

    default:
      return state;
  }
}
