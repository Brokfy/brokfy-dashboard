import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_ASEGURADORA_BEGIN,
  DASHBOARD_UPDATE_ASEGURADORA_SUCCESS,
  DASHBOARD_UPDATE_ASEGURADORA_FAILURE,
  DASHBOARD_UPDATE_ASEGURADORA_DISMISS_SUCCESS,
  DASHBOARD_UPDATE_ASEGURADORA_DISMISS_ERROR,
} from './constants';

export function updateAseguradora(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_UPDATE_ASEGURADORA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_UPDATE_ASEGURADORA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Aseguradoras`,
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
            type: DASHBOARD_UPDATE_ASEGURADORA_SUCCESS,
            data: args.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_ASEGURADORA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateAseguradoraError() {
  return {
    type: DASHBOARD_UPDATE_ASEGURADORA_DISMISS_ERROR,
  };
}

export function useUpdateAseguradora() {
  const dispatch = useDispatch();

  const { updateAseguradoraPending, updateAseguradoraError, updateAseguradoraNotify } = useSelector(
    state => ({
      updateAseguradoraPending: state.dashboard.updateAseguradoraPending,
      updateAseguradoraError: state.dashboard.updateAseguradoraError,
      updateAseguradoraNotify: state.dashboard.updateAseguradoraNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateAseguradora(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateAseguradoraError());
  }, [dispatch]);

  return {
    updateAseguradora: boundAction,
    updateAseguradoraNotify,
    updateAseguradoraPending,
    updateAseguradoraError,
    dismissUpdateAseguradoraError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_ASEGURADORA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateProductoNotify: false,
        updateAseguradoraPending: true,
        updateAseguradoraError: null,
      };

    case DASHBOARD_UPDATE_ASEGURADORA_SUCCESS:
      // The request is success
      return {
        ...state,
        aseguradoras: [
          ...state.aseguradoras.map(item => {
            return item.idAseguradora === action.data.idAseguradora ? {
              ...item,
              ...{
                idAseguradora: parseInt(action.data.idAseguradora),
                nombre: action.data.nombre,
                telefono: action.data.telefono,
                enabled: action.data.enabled,
                cveCopsis: action.data.cveCopsis,
              }
            } : item;
          })
        ],
        updateAseguradoraNotify: true,
        updateAseguradoraPending: false,
        updateAseguradoraError: null,
      };

    case DASHBOARD_UPDATE_ASEGURADORA_FAILURE:
      // The request is failed
      return {
        ...state,
        updateAseguradoraNotify: true,
        updateAseguradoraPending: false,
        updateAseguradoraError: "Ha ocurrido un error al actualizar el producto.",
      };

    case DASHBOARD_UPDATE_ASEGURADORA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        updateAseguradoraNotify: false,
        updateAseguradoraError: null,
      };

    case DASHBOARD_UPDATE_ASEGURADORA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateAseguradoraNotify: false,
        updateAseguradoraError: null,
      };

    default:
      return state;
  }
}
