import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_POLIZAS_AUTO_BEGIN,
  DASHBOARD_UPDATE_POLIZAS_AUTO_SUCCESS,
  DASHBOARD_UPDATE_POLIZAS_AUTO_FAILURE,
  DASHBOARD_UPDATE_POLIZAS_AUTO_DISMISS_SUCCESS,
  DASHBOARD_UPDATE_POLIZAS_AUTO_DISMISS_ERROR,
} from './constants';

export function updatePolizasAuto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_UPDATE_POLIZAS_AUTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_UPDATE_POLIZAS_AUTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/PolizaAuto`,
        method: 'PUT',
        data: args.data,
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_UPDATE_POLIZAS_AUTO_SUCCESS,
            data: args.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_POLIZAS_AUTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdatePolizasAutoError() {
  return {
    type: DASHBOARD_UPDATE_POLIZAS_AUTO_DISMISS_ERROR,
  };
}

export function useUpdatePolizasAuto() {
  const dispatch = useDispatch();

  const { updatePolizasAutoPending, updatePolizasAutoError, updatePolizasAutoNotify } = useSelector(
    state => ({
      updatePolizasAutoPending: state.dashboard.updatePolizasAutoPending,
      updatePolizasAutoError: state.dashboard.updatePolizasAutoError,
      updatePolizasAutoNotify: state.dashboard.updatePolizasAutoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updatePolizasAuto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdatePolizasAutoError());
  }, [dispatch]);

  return {
    updatePolizasAuto: boundAction,
    updatePolizasAutoNotify: updatePolizasAutoNotify,
    updatePolizasAutoPending,
    updatePolizasAutoError,
    dismissUpdatePolizasAutoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_POLIZAS_AUTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updatePolizasAutoNotify: false,
        updatePolizasAutoPending: true,
        updatePolizasAutoError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_AUTO_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasAuto: [
          ...state.polizasAuto.map(item => {
            return item.noPoliza === action.data.noPoliza ? {
              ...item,
              ...{
                noPoliza: item.noPoliza,
                formaPago: item.formaPago,
                proximoPago: item.proximoPago,
                fechaInicio: item.fechaInicio,
                fechaFin: item.fechaFin,
                idAseguradoras: parseInt(item.idAseguradoras),
                costo: parseFloat(item.costo),
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
              }
            } : item;
          })
        ],
        updatePolizasAutoNotify: true,
        updatePolizasAutoPending: false,
        updatePolizasAutoError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_AUTO_FAILURE:
      // The request is failed
      return {
        ...state,
        updatePolizasAutoNotify: true,
        updatePolizasAutoPending: false,
        updatePolizasAutoError: "Ha ocurrido un error al actualizar el producto.",
      };

    case DASHBOARD_UPDATE_POLIZAS_AUTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        updatePolizasAutoNotify: false,
        updatePolizasAutoError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_AUTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updatePolizasAutoNotify: false,
        updatePolizasAutoError: null,
      };

    default:
      return state;
  }
}
