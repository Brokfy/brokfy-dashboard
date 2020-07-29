import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_ESTADOS_SINIESTRO_BEGIN,
  DASHBOARD_UPDATE_ESTADOS_SINIESTRO_SUCCESS,
  DASHBOARD_UPDATE_ESTADOS_SINIESTRO_FAILURE,
  DASHBOARD_UPDATE_ESTADOS_SINIESTRO_DISMISS_ERROR,
} from './constants';

export function updateEstadosSiniestro(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_ESTADOS_SINIESTRO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Siniestros`,
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
            type: DASHBOARD_UPDATE_ESTADOS_SINIESTRO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_ESTADOS_SINIESTRO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateEstadosSiniestroError() {
  return {
    type: DASHBOARD_UPDATE_ESTADOS_SINIESTRO_DISMISS_ERROR,
  };
}

export function useUpdateEstadosSiniestro() {
  const dispatch = useDispatch();

  const { updateEstadosSiniestroPending, updateEstadosSiniestroError } = useSelector(
    state => ({
      updateEstadosSiniestroPending: state.dashboard.updateEstadosSiniestroPending,
      updateEstadosSiniestroError: state.dashboard.updateEstadosSiniestroError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateEstadosSiniestro(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateEstadosSiniestroError());
  }, [dispatch]);

  return {
    updateEstadosSiniestro: boundAction,
    updateEstadosSiniestroPending,
    updateEstadosSiniestroError,
    dismissUpdateEstadosSiniestroError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_ESTADOS_SINIESTRO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateEstadosSiniestroPending: true,
        updateEstadosSiniestroError: null,
      };

    case DASHBOARD_UPDATE_ESTADOS_SINIESTRO_SUCCESS:
      // The request is success
      return {
        ...state,
        updateEstadosSiniestroPending: false,
        updateEstadosSiniestroError: null,
      };

    case DASHBOARD_UPDATE_ESTADOS_SINIESTRO_FAILURE:
      // The request is failed
      return {
        ...state,
        updateEstadosSiniestroPending: false,
        updateEstadosSiniestroError: action.data.error,
      };

    case DASHBOARD_UPDATE_ESTADOS_SINIESTRO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateEstadosSiniestroError: null,
      };

    default:
      return state;
  }
}
