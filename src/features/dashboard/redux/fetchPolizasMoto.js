import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_POLIZAS_MOTO_BEGIN,
  DASHBOARD_FETCH_POLIZAS_MOTO_SUCCESS,
  DASHBOARD_FETCH_POLIZAS_MOTO_FAILURE,
  DASHBOARD_FETCH_POLIZAS_MOTO_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format';

export function fetchPolizasMoto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_POLIZAS_MOTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/PolizaMoto?propia=${args.propia}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args.tokenFirebase}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZAS_MOTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZAS_MOTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchPolizasMotoError() {
  return {
    type: DASHBOARD_FETCH_POLIZAS_MOTO_DISMISS_ERROR,
  };
}

export function useFetchPolizasMoto() {
  const polizasMoto = useSelector(state => state.dashboard.polizasMoto);

  const dispatch = useDispatch();

  const { fetchPolizasMotoPending, fetchPolizasMotoError } = useSelector(
    state => ({
      fetchPolizasMotoPending: state.dashboard.fetchPolizasMotoPending,
      fetchPolizasMotoError: state.dashboard.fetchPolizasMotoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchPolizasMoto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchPolizasMotoError());
  }, [dispatch]);

  return {
    polizasMoto: polizasMoto,
    fetchPolizasMoto: boundAction,
    fetchPolizasMotoPending,
    fetchPolizasMotoError,
    dismissFetchPolizasMotoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_POLIZAS_MOTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPolizasMotoPending: true,
        fetchPolizasMotoError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_MOTO_SUCCESS:
      // The request is success
      return {
        ...state,
        polizasMoto: action.data.data.map(item => {
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
            marca: item.marca,
            modelo: item.modelo,
            ano: parseInt(item.ano),
            placas: item.placas,
            clave: item.clave,
            codigoPostal: item.codigoPostal,

          };
        }),
        fetchPolizasMotoPending: false,
        fetchPolizasMotoError: null,
      };

    case DASHBOARD_FETCH_POLIZAS_MOTO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPolizasMotoPending: false,
        fetchPolizasMotoError: action.data.error,
      };

    case DASHBOARD_FETCH_POLIZAS_MOTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPolizasMotoError: null,
      };

    default:
      return state;
  }
}
