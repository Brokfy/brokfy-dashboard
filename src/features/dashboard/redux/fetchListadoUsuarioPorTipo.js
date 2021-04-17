import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_BEGIN,
  DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_SUCCESS,
  DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_FAILURE,
  DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_DISMISS_ERROR,
} from './constants';

export function fetchListadoUsuarioPorTipo(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Operadores?tipo=${args.tipo}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchListadoUsuarioPorTipoError() {
  return {
    type: DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_DISMISS_ERROR,
  };
}

export function useFetchListadoUsuarioPorTipo() {
  const operadores = useSelector(state => state.dashboard.operadores);

  const dispatch = useDispatch();

  const { fetchListadoUsuarioPorTipoPending, fetchListadoUsuarioPorTipoError } = useSelector(
    state => ({
      fetchListadoUsuarioPorTipoPending: state.dashboard.fetchListadoUsuarioPorTipoPending,
      fetchListadoUsuarioPorTipoError: state.dashboard.fetchListadoUsuarioPorTipoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchListadoUsuarioPorTipo(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchListadoUsuarioPorTipoError());
  }, [dispatch]);

  return {
    operadores: operadores,
    fetchListadoUsuarioPorTipo: boundAction,
    fetchListadoUsuarioPorTipoPending,
    fetchListadoUsuarioPorTipoError,
    dismissFetchListadoUsuarioPorTipoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchListadoUsuarioPorTipoPending: true,
        fetchListadoUsuarioPorTipoError: null,
      };

    case DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_SUCCESS:
      // The request is success
      return {
        ...state,
        operadores: action.data.data.map(item => {
          return {
            nombre: item.nombre,
            apellidoPaterno: item.apellidoPaterno,
            apellidoMaterno: item.apellidoMaterno,
            fechaNacimiento: item.fechaNacimiento,
            sexo: item.sexo,
            email: item.email,
            username: item.username,
          };
        }),
        fetchListadoUsuarioPorTipoPending: false,
        fetchListadoUsuarioPorTipoError: null,
      };

    case DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchListadoUsuarioPorTipoPending: false,
        fetchListadoUsuarioPorTipoError: action.data.error,
      };

    case DASHBOARD_FETCH_LISTADO_USUARIO_POR_TIPO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchListadoUsuarioPorTipoError: null,
      };

    default:
      return state;
  }
}
