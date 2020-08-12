import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_BEGIN,
  DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_SUCCESS,
  DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_FAILURE,
  DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_DISMISS_ERROR,
  DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_DISMISS_SUCCESS,
} from './constants';

export function updateFinalizarSiniestro(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Siniestros/${args.idPolizaSiniestro}`,
        method: 'PUT',
        //data: args.data,
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_SUCCESS,
            data: args,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateFinalizarSiniestroError() {
  return {
    type: DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_DISMISS_ERROR,
  };
}

export function useUpdateFinalizarSiniestro() {
  const dispatch = useDispatch();

  const { updateFinalizarSiniestroPending, updateFinalizarSiniestroError, updateFinalizarSiniestroNotify } = useSelector(
    state => ({
      updateFinalizarSiniestroPending: state.dashboard.updateFinalizarSiniestroPending,
      updateFinalizarSiniestroError: state.dashboard.updateFinalizarSiniestroError,
      updateFinalizarSiniestroNotify: state.dashboard.updateFinalizarSiniestroNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateFinalizarSiniestro(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateFinalizarSiniestroError());
  }, [dispatch]);

  return {
    updateFinalizarSiniestro: boundAction,
    updateFinalizarSiniestroPending,
    updateFinalizarSiniestroError,
    updateFinalizarSiniestroNotify,
    dismissUpdateFinalizarSiniestroError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateFinalizarSiniestroNotify: false,
        updateFinalizarSiniestroPending: true,
        updateFinalizarSiniestroError: null,
      };

    case DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_SUCCESS:
      // The request is success
      
      return {
        ...state,
        siniestros: state.siniestros.filter(x => x.idPolizaSiniestro != action.data.idPolizaSiniestro),
        updateFinalizarSiniestroNotify: true,
        updateFinalizarSiniestroPending: false,
        updateFinalizarSiniestroError: null,
      };

    case DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_FAILURE:
      // The request is failed
      return {
        ...state,
        updateFinalizarSiniestroPending: false,
        updateFinalizarSiniestroError: action.data.error,
        updateFinalizarSiniestroNotify: true,
      };

    case DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateFinalizarSiniestroNotify: false,
        updateFinalizarSiniestroError: null,
      };

      case DASHBOARD_UPDATE_FINALIZAR_SINIESTRO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        updateFinalizarSiniestroNotify: false,
        updateFinalizarSiniestroError: null,
      };

    default:
      return state;
  }
}
