import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_COMISIONES_BEGIN,
  DASHBOARD_UPDATE_COMISIONES_SUCCESS,
  DASHBOARD_UPDATE_COMISIONES_FAILURE,
  DASHBOARD_UPDATE_COMISIONES_DISMISS_ERROR,
  DASHBOARD_UPDATE_COMISIONES_DISMISS_SUCCESS,
} from './constants';

export function updateComisiones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_UPDATE_COMISIONES_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_UPDATE_COMISIONES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://3.136.94.107:4300/api/Comisiones`,
        method: 'POST',
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
            type: DASHBOARD_UPDATE_COMISIONES_SUCCESS,
            data: args.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_COMISIONES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateComisionesError() {
  return {
    type: DASHBOARD_UPDATE_COMISIONES_DISMISS_ERROR,
  };
}

export function useUpdateComisiones() {
  const dispatch = useDispatch();

  const { updateComisionesPending, updateComisionesError, updateComisionesNotify } = useSelector(
    state => ({
      updateComisionesPending: state.dashboard.updateComisionesPending,
      updateComisionesError: state.dashboard.updateComisionesError,
      updateComisionesNotify: state.dashboard.updateComisionesNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateComisiones(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateComisionesError());
  }, [dispatch]);

  return {
    updateComisiones: boundAction,
    updateComisionesNotify,
    updateComisionesPending,
    updateComisionesError,
    dismissUpdateComisionesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_COMISIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateComisionesNotify: false,
        updateComisionesPending: true,
        updateComisionesError: null,
      };

    case DASHBOARD_UPDATE_COMISIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        comisiones: [
          ...state.comisiones.map(item => {
            return item.id_aseguradora === parseInt(action.data.id_aseguradora) ? {
              ...item,
              ...{
                id_aseguradora: parseInt(action.data.id_aseguradora),
                auto: parseFloat(action.data.auto),
                moto: parseFloat(action.data.moto),
                hogar: parseFloat(action.data.hogar),
                salud: parseFloat(action.data.salud),
                vida: parseFloat(action.data.vida),
                gadget: parseFloat(action.data.gadget),
                mascota: parseFloat(action.data.mascota),
                viaje: parseFloat(action.data.viaje),
                retiro: parseFloat(action.data.retiro),
                pyme: parseFloat(action.data.pyme),
              }
            } : item;
          })
        ],
        updateComisionesNotify: true,
        updateComisionesPending: false,
        updateComisionesError: null,
      };

    case DASHBOARD_UPDATE_COMISIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        updateComisionesNotify: true,
        updateComisionesPending: false,
        updateComisionesError: "Ha ocurrido un error al actualizar el registro.",
      };

    case DASHBOARD_UPDATE_COMISIONES_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        updateComisionesNotify: false,
        updateComisionesError: null,
      };

    case DASHBOARD_UPDATE_COMISIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateComisionesNotify: false,
        updateComisionesError: null,
      };

    default:
      return state;
  }
}
