import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DETALLE_USUARIO_BEGIN,
  DASHBOARD_FETCH_DETALLE_USUARIO_SUCCESS,
  DASHBOARD_FETCH_DETALLE_USUARIO_FAILURE,
  DASHBOARD_FETCH_DETALLE_USUARIO_DISMISS_ERROR,
} from './constants';

export function fetchDetalleUsuario(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DETALLE_USUARIO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/ListaUsuarios/${args.username}`,
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
            type: DASHBOARD_FETCH_DETALLE_USUARIO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DETALLE_USUARIO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDetalleUsuarioError() {
  return {
    type: DASHBOARD_FETCH_DETALLE_USUARIO_DISMISS_ERROR,
  };
}

export function useFetchDetalleUsuario() {

  const detalleUsuario = useSelector(state => state.dashboard.detalleUsuario);

  const dispatch = useDispatch();

  const { fetchDetalleUsuarioPending, fetchDetalleUsuarioError } = useSelector(
    state => ({
      fetchDetalleUsuarioPending: state.dashboard.fetchDetalleUsuarioPending,
      fetchDetalleUsuarioError: state.dashboard.fetchDetalleUsuarioError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDetalleUsuario(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDetalleUsuarioError());
  }, [dispatch]);

  return {
    detalleUsuario: detalleUsuario,
    fetchDetalleUsuario: boundAction,
    fetchDetalleUsuarioPending,
    fetchDetalleUsuarioError,
    dismissFetchDetalleUsuarioError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DETALLE_USUARIO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDetalleUsuarioPending: true,
        fetchDetalleUsuarioError: null,
      };

    case DASHBOARD_FETCH_DETALLE_USUARIO_SUCCESS:
      // The request is success
      return {
        ...state,
        detalleUsuario: action.data.data,
        fetchDetalleUsuarioPending: false,
        fetchDetalleUsuarioError: null,
      };

    case DASHBOARD_FETCH_DETALLE_USUARIO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDetalleUsuarioPending: false,
        fetchDetalleUsuarioError: action.data.error,
      };

    case DASHBOARD_FETCH_DETALLE_USUARIO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDetalleUsuarioError: null,
      };

    default:
      return state;
  }
}
