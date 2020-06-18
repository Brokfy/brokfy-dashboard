import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_LISTADO_USUARIO_BEGIN,
  DASHBOARD_FETCH_LISTADO_USUARIO_SUCCESS,
  DASHBOARD_FETCH_LISTADO_USUARIO_FAILURE,
  DASHBOARD_FETCH_LISTADO_USUARIO_DISMISS_ERROR,
} from './constants';

export function fetchListadoUsuario(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_LISTADO_USUARIO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://3.136.94.107:4300/api/ListaUsuarios`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_LISTADO_USUARIO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_LISTADO_USUARIO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchListadoUsuarioError() {
  return {
    type: DASHBOARD_FETCH_LISTADO_USUARIO_DISMISS_ERROR,
  };
}

export function useFetchListadoUsuario() {
  const listadoUsuarios = useSelector(state => state.dashboard.listadoUsuarios);

  const dispatch = useDispatch();

  const { fetchListadoUsuarioPending, fetchListadoUsuarioError } = useSelector(
    state => ({
      fetchListadoUsuarioPending: state.dashboard.fetchListadoUsuarioPending,
      fetchListadoUsuarioError: state.dashboard.fetchListadoUsuarioError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchListadoUsuario(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchListadoUsuarioError());
  }, [dispatch]);

  return {
    listadoUsuarios: listadoUsuarios,
    fetchListadoUsuario: boundAction,
    fetchListadoUsuarioPending,
    fetchListadoUsuarioError,
    dismissFetchListadoUsuarioError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_LISTADO_USUARIO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchListadoUsuarioPending: true,
        fetchListadoUsuarioError: null,
      };

    case DASHBOARD_FETCH_LISTADO_USUARIO_SUCCESS:
      // The request is success
      return {
        ...state,
        listadoUsuarios: action.data.data.map(item => {
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
        fetchListadoUsuarioPending: false,
        fetchListadoUsuarioError: null,
      };

    case DASHBOARD_FETCH_LISTADO_USUARIO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchListadoUsuarioPending: false,
        fetchListadoUsuarioError: action.data.error,
      };

    case DASHBOARD_FETCH_LISTADO_USUARIO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchListadoUsuarioError: null,
      };

    default:
      return state;
  }
}
