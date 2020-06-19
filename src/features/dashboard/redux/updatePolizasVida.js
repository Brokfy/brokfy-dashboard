import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_POLIZAS_VIDA_BEGIN,
  DASHBOARD_UPDATE_POLIZAS_VIDA_SUCCESS,
  DASHBOARD_UPDATE_POLIZAS_VIDA_FAILURE,
  DASHBOARD_UPDATE_POLIZAS_VIDA_DISMISS_SUCCESS,
  DASHBOARD_UPDATE_POLIZAS_VIDA_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format';

export function updatePolizasVida(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_UPDATE_POLIZAS_VIDA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_UPDATE_POLIZAS_VIDA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/PolizaVida`,
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
            type: DASHBOARD_UPDATE_POLIZAS_VIDA_SUCCESS,
            data: args.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_POLIZAS_VIDA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdatePolizasVidaError() {
  return {
    type: DASHBOARD_UPDATE_POLIZAS_VIDA_DISMISS_ERROR,
  };
}

export function useUpdatePolizasVida() {
  const dispatch = useDispatch();

  const { updatePolizasVidaPending, updatePolizasVidaError, updatePolizasVidaNotify } = useSelector(
    state => ({
      updatePolizasVidaPending: state.dashboard.updatePolizasVidaPending,
      updatePolizasVidaError: state.dashboard.updatePolizasVidaError,
      updatePolizasVidaNotify: state.dashboard.updatePolizasVidaNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updatePolizasVida(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdatePolizasVidaError());
  }, [dispatch]);

  return {
    updatePolizasVida: boundAction,
    updatePolizasVidaNotify: updatePolizasVidaNotify,
    updatePolizasVidaPending,
    updatePolizasVidaError,
    dismissUpdatePolizasVidaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_POLIZAS_VIDA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updatePolizasVidaNotify: false,
        updatePolizasVidaPending: true,
        updatePolizasVidaError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_VIDA_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasVida: [
          ...state.polizasVida.map(item => {
            return item.noPoliza === action.data.noPoliza ? {
              ...item,
              ...{
                noPoliza: item.noPoliza,
                formaPago: item.formaPago,
                proximoPago: format(new Date(item.proximoPago), 'dd/MM/yyyy'),
                fechaInicio: format(new Date(item.fechaInicio), 'dd/MM/yyyy'),
                fechaFin: format(new Date(item.fechaFin), 'dd/MM/yyyy'),
                idAseguradoras: parseInt(item.idAseguradoras),
                costo: parseFloat(item.costo),
                primaNeta: parseFloat(item.primaNeta),
                idEstadoPoliza: parseInt(item.idEstadoPoliza),
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
                fumador: item.fumador,
                estatura: item.estatura,
                peso: item.peso,
                ingresos: item.ingresos,
                idOcupacion: item.idOcupacion,
                idEstado: item.idEstado,
                idSexo: item.idSexo,
              }
            } : item;
          })
        ],
        updatePolizasVidaNotify: true,
        updatePolizasVidaPending: false,
        updatePolizasVidaError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_VIDA_FAILURE:
      // The request is failed
      return {
        ...state,
        updatePolizasVidaNotify: true,
        updatePolizasVidaPending: false,
        updatePolizasVidaError: "Ha ocurrido un error al actualizar el producto.",
      };

    case DASHBOARD_UPDATE_POLIZAS_VIDA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        updatePolizasVidaNotify: false,
        updatePolizasVidaError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_VIDA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updatePolizasVidaNotify: false,
        updatePolizasVidaError: null,
      };

    default:
      return state;
  }
}
