import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DELETE_POLIZAS_MOTO_BEGIN,
  DASHBOARD_DELETE_POLIZAS_MOTO_SUCCESS,
  DASHBOARD_DELETE_POLIZAS_MOTO_FAILURE,
  DASHBOARD_DELETE_POLIZAS_MOTO_DISMISS_SUCCESS,
  DASHBOARD_DELETE_POLIZAS_MOTO_DISMISS_ERROR,
} from './constants';

export function deletePolizasMoto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_DELETE_POLIZAS_MOTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_DELETE_POLIZAS_MOTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/PolizaMoto`,
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
                type: DASHBOARD_DELETE_POLIZAS_MOTO_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DELETE_POLIZAS_MOTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeletePolizasMotoError() {
  return {
    type: DASHBOARD_DELETE_POLIZAS_MOTO_DISMISS_ERROR,
  };
}

export function useDeletePolizasMoto() {
  const dispatch = useDispatch();

  const { deletePolizasMotoPending, deletePolizasMotoError, deletePolizasMotoNotify } = useSelector(
    state => ({
      deletePolizasMotoPending: state.dashboard.deletePolizasMotoPending,
      deletePolizasMotoError: state.dashboard.deletePolizasMotoError,
      deletePolizasMotoNotify: state.dashboard.deletePolizasMotoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deletePolizasMoto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeletePolizasMotoError());
  }, [dispatch]);

  return {
    deletePolizasMoto: boundAction,
    deletePolizasMotoNotify: deletePolizasMotoNotify,
    deletePolizasMotoPending,
    deletePolizasMotoError,
    dismissDeletePolizasMotoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DELETE_POLIZAS_MOTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deletePolizasMotoNotify: false,
        deletePolizasMotoPending: true,
        deletePolizasMotoError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_MOTO_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasMoto: action.data.data.map(item => { 
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
        deletePolizasMotoNotify: true,
        deletePolizasMotoPending: false,
        deletePolizasMotoError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_MOTO_FAILURE:
      // The request is failed
      return {
        ...state,
        deletePolizasMotoNotify: true,
        deletePolizasMotoPending: false,
        deletePolizasMotoError: "Ha ocurrido un error al eliminar el registro",
      };

    case DASHBOARD_DELETE_POLIZAS_MOTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        deletePolizasMotoNotify: false,
        deletePolizasMotoError: null,
      };

    case DASHBOARD_DELETE_POLIZAS_MOTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deletePolizasMotoNotify: false,
        deletePolizasMotoError: null,
      };

    default:
      return state;
  }
}