import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DELETE_ASEGURADORA_BEGIN,
  DASHBOARD_DELETE_ASEGURADORA_SUCCESS,
  DASHBOARD_DELETE_ASEGURADORA_FAILURE,
  DASHBOARD_DELETE_ASEGURADORA_DISMISS_SUCCESS,
  DASHBOARD_DELETE_ASEGURADORA_DISMISS_ERROR,
} from './constants';

export function deleteAseguradora(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_DELETE_ASEGURADORA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_DELETE_ASEGURADORA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://3.136.94.107:4300/api/Aseguradoras`,
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
                type: DASHBOARD_DELETE_ASEGURADORA_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DELETE_ASEGURADORA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeleteAseguradoraError() {
  return {
    type: DASHBOARD_DELETE_ASEGURADORA_DISMISS_ERROR,
  };
}

export function useDeleteAseguradora() {
  const dispatch = useDispatch();

  const { deleteAseguradoraPending, deleteAseguradoraError, deleteAseguradoraNotify } = useSelector(
    state => ({
      deleteAseguradoraPending: state.dashboard.deleteAseguradoraPending,
      deleteAseguradoraError: state.dashboard.deleteAseguradoraError,
      deleteAseguradoraNotify: state.dashboard.deleteAseguradoraNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deleteAseguradora(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeleteAseguradoraError());
  }, [dispatch]);

  return {
    deleteAseguradora: boundAction,
    deleteAseguradoraNotify,
    deleteAseguradoraPending,
    deleteAseguradoraError,
    dismissDeleteAseguradoraError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DELETE_ASEGURADORA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteAseguradoraNotify: false,
        deleteAseguradoraPending: true,
        deleteAseguradoraError: null,
      };

    case DASHBOARD_DELETE_ASEGURADORA_SUCCESS:
      // The request is success
      return {
        ...state,
        aseguradoras: action.data.data.map(item => { 
          return {
            idAseguradora: item.idAseguradora,
            nombre: item.nombre,
            telefono: item.telefono,
            enabled: item.enabled,
            cveCopsis: item.cveCopsis,
          };
        }),
        deleteAseguradoraNotify: true,
        deleteAseguradoraPending: false,
        deleteAseguradoraError: null,
      };

    case DASHBOARD_DELETE_ASEGURADORA_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteAseguradoraNotify: true,
        deleteAseguradoraPending: false,
        deleteAseguradoraError: "Ha ocurrido un error al eliminar el registro",
      };

    case DASHBOARD_DELETE_ASEGURADORA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        deleteAseguradoraNotify: false,
        deleteAseguradoraError: null,
      };

    case DASHBOARD_DELETE_ASEGURADORA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteAseguradoraNotify: false,
        deleteAseguradoraError: null,
      };

    default:
      return state;
  }
}
