import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DELETE_POLIZAS_VIDA_BEGIN,
  DASHBOARD_DELETE_POLIZAS_VIDA_SUCCESS,
  DASHBOARD_DELETE_POLIZAS_VIDA_FAILURE,
  DASHBOARD_DELETE_POLIZAS_VIDA_DISMISS_SUCCESS,
  DASHBOARD_DELETE_POLIZAS_VIDA_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format';

export function deletePolizasVida(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_DELETE_POLIZAS_VIDA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_DELETE_POLIZAS_VIDA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/PolizaVida`,
        method: 'DELETE',
        data: args.data,
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
            method: "GET"
          }).then(
            (res) => {
              dispatch({
                type: DASHBOARD_DELETE_POLIZAS_VIDA_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DELETE_POLIZAS_VIDA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeletePolizasVidaError() {
  return {
    type: DASHBOARD_DELETE_POLIZAS_VIDA_DISMISS_ERROR,
  };
}

export function useDeletePolizasVida() {
  const dispatch = useDispatch();

  const { deletePolizasVidaPending, deletePolizasVidaError, deletePolizasVidaNotify } = useSelector(
    state => ({
      deletePolizasVidaPending: state.dashboard.deletePolizasVidaPending,
      deletePolizasVidaError: state.dashboard.deletePolizasVidaError,
      deletePolizasVidaNotify: state.dashboard.deletePolizasVidaNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deletePolizasVida(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeletePolizasVidaError());
  }, [dispatch]);

  return {
    deletePolizasVida: boundAction,
    deletePolizasVidaNotify: deletePolizasVidaNotify,
    deletePolizasVidaPending,
    deletePolizasVidaError,
    dismissDeletePolizasVidaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DELETE_POLIZAS_VIDA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deletePolizasVidaNotify: false,
        deletePolizasVidaPending: true,
        deletePolizasVidaError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_VIDA_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasVida: action.data.data.map(item => { 
          return {
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
          };
        }),
        deletePolizasVidaNotify: true,
        deletePolizasVidaPending: false,
        deletePolizasVidaError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_VIDA_FAILURE:
      // The request is failed
      return {
        ...state,
        deletePolizasVidaNotify: true,
        deletePolizasVidaPending: false,
        deletePolizasVidaError: "Ha ocurrido un error al eliminar el registro",
      };

    case DASHBOARD_DELETE_POLIZAS_VIDA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        deletePolizasVidaNotify: false,
        deletePolizasVidaError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_VIDA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deletePolizasVidaNotify: false,
        deletePolizasVidaError: null,
      };

    default:
      return state;
  }
}
