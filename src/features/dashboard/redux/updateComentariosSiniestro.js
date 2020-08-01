import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_BEGIN,
  DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_SUCCESS,
  DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_FAILURE,
  DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_DISMISS_ERROR,
} from './constants';

export function updateComentariosSiniestro(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateComentariosSiniestroError() {
  return {
    type: DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_DISMISS_ERROR,
  };
}

export function useUpdateComentariosSiniestro() {
  const dispatch = useDispatch();

  const { updateComentariosSiniestroPending, updateComentariosSiniestroError } = useSelector(
    state => ({
      updateComentariosSiniestroPending: state.dashboard.updateComentariosSiniestroPending,
      updateComentariosSiniestroError: state.dashboard.updateComentariosSiniestroError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateComentariosSiniestro(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateComentariosSiniestroError());
  }, [dispatch]);

  return {
    updateComentariosSiniestro: boundAction,
    updateComentariosSiniestroPending,
    updateComentariosSiniestroError,
    dismissUpdateComentariosSiniestroError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateComentariosSiniestroPending: true,
        updateComentariosSiniestroError: null,
      };

    case DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_SUCCESS:
      // The request is success
      return {
        ...state,
        updateComentariosSiniestroPending: false,
        updateComentariosSiniestroError: null,
      };

    case DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_FAILURE:
      // The request is failed
      return {
        ...state,
        updateComentariosSiniestroPending: false,
        updateComentariosSiniestroError: action.data.error,
      };

    case DASHBOARD_UPDATE_COMENTARIOS_SINIESTRO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateComentariosSiniestroError: null,
      };

    default:
      return state;
  }
}
