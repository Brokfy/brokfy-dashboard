import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DELETE_POLIZAS_AUTO_BEGIN,
  DASHBOARD_DELETE_POLIZAS_AUTO_SUCCESS,
  DASHBOARD_DELETE_POLIZAS_AUTO_FAILURE,
  DASHBOARD_DELETE_POLIZAS_AUTO_DISMISS_SUCCESS,
  DASHBOARD_DELETE_POLIZAS_AUTO_DISMISS_ERROR,
} from './constants';

export function deletePolizasAuto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_DELETE_POLIZAS_AUTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_DELETE_POLIZAS_AUTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://ec2-3-136-94-107.us-east-2.compute.amazonaws.com:4300/api/PolizaAuto`,
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
                type: DASHBOARD_DELETE_POLIZAS_AUTO_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DELETE_POLIZAS_AUTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeletePolizasAutoError() {
  return {
    type: DASHBOARD_DELETE_POLIZAS_AUTO_DISMISS_ERROR,
  };
}

export function useDeletePolizasAuto() {
  const dispatch = useDispatch();

  const { deletePolizasAutoPending, deletePolizasAutoError, deletePolizasAutoNotify } = useSelector(
    state => ({
      deletePolizasAutoPending: state.dashboard.deletePolizasAutoPending,
      deletePolizasAutoError: state.dashboard.deletePolizasAutoError,
      deletePolizasAutoNotify: state.dashboard.deletePolizasAutoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deletePolizasAuto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeletePolizasAutoError());
  }, [dispatch]);

  return {
    deletePolizasAuto: boundAction,
    deletePolizasAutoNotify: deletePolizasAutoNotify,
    deletePolizasAutoPending,
    deletePolizasAutoError,
    dismissDeletePolizasAutoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DELETE_POLIZAS_AUTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deletePolizasAutoNotify: false,
        deletePolizasAutoPending: true,
        deletePolizasAutoError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_AUTO_SUCCESS:
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
        deletePolizasAutoNotify: true,
        deletePolizasAutoPending: false,
        deletePolizasAutoError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_AUTO_FAILURE:
      // The request is failed
      return {
        ...state,
        deletePolizasAutoNotify: true,
        deletePolizasAutoPending: false,
        deletePolizasAutoError: "Ha ocurrido un error al eliminar el registro",
      };

    case DASHBOARD_DELETE_POLIZAS_AUTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        deletePolizasAutoNotify: false,
        deletePolizasAutoError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_AUTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deletePolizasAutoNotify: false,
        deletePolizasAutoError: null,
      };

    default:
      return state;
  }
}
