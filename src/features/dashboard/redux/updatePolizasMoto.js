import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_POLIZAS_MOTO_BEGIN,
  DASHBOARD_UPDATE_POLIZAS_MOTO_SUCCESS,
  DASHBOARD_UPDATE_POLIZAS_MOTO_FAILURE,
  DASHBOARD_UPDATE_POLIZAS_MOTO_DISMISS_SUCCESS,
  DASHBOARD_UPDATE_POLIZAS_MOTO_DISMISS_ERROR,
} from './constants';

export function updatePolizasMoto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_UPDATE_POLIZAS_MOTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_UPDATE_POLIZAS_MOTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/PolizaMoto`,
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
            type: DASHBOARD_UPDATE_POLIZAS_MOTO_SUCCESS,
            data: args.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_POLIZAS_MOTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdatePolizasMotoError() {
  return {
    type: DASHBOARD_UPDATE_POLIZAS_MOTO_DISMISS_ERROR,
  };
}

export function useUpdatePolizasMoto() {
  const dispatch = useDispatch();

  const { updatePolizasMotoPending, updatePolizasMotoError, updatePolizasMotoNotify } = useSelector(
    state => ({
      updatePolizasMotoPending: state.dashboard.updatePolizasMotoPending,
      updatePolizasMotoError: state.dashboard.updatePolizasMotoError,
      updatePolizasMotoNotify: state.dashboard.updatePolizasMotoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updatePolizasMoto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdatePolizasMotoError());
  }, [dispatch]);

  return {
    updatePolizasMoto: boundAction,
    updatePolizasMotoNotify: updatePolizasMotoNotify,
    updatePolizasMotoPending,
    updatePolizasMotoError,
    dismissUpdatePolizasMotoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_POLIZAS_MOTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updatePolizasMotoNotify: false,
        updatePolizasMotoPending: true,
        updatePolizasMotoError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_MOTO_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasMoto: [
          ...state.polizasMoto.map(item => {
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
        updatePolizasMotoNotify: true,
        updatePolizasMotoPending: false,
        updatePolizasMotoError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_MOTO_FAILURE:
      // The request is failed
      return {
        ...state,
        updatePolizasMotoNotify: true,
        updatePolizasMotoPending: false,
        updatePolizasMotoError: "Ha ocurrido un error al actualizar el producto.",
      };

    case DASHBOARD_UPDATE_POLIZAS_MOTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        updatePolizasMotoNotify: false,
        updatePolizasMotoError: null,
      };

    case DASHBOARD_UPDATE_POLIZAS_MOTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updatePolizasMotoNotify: false,
        updatePolizasMotoError: null,
      };

    default:
      return state;
  }
}
