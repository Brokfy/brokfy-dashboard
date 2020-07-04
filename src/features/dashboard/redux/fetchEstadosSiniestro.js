import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_ESTADOS_SINIESTRO_BEGIN,
  DASHBOARD_FETCH_ESTADOS_SINIESTRO_SUCCESS,
  DASHBOARD_FETCH_ESTADOS_SINIESTRO_FAILURE,
  DASHBOARD_FETCH_ESTADOS_SINIESTRO_DISMISS_ERROR,
} from './constants';

export function fetchEstadosSiniestro(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_ESTADOS_SINIESTRO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_ESTADOS_SINIESTRO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_ESTADOS_SINIESTRO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchEstadosSiniestroError() {
  return {
    type: DASHBOARD_FETCH_ESTADOS_SINIESTRO_DISMISS_ERROR,
  };
}

export function useFetchEstadosSiniestro() {
  const dispatch = useDispatch();

  const { fetchEstadosSiniestroPending, fetchEstadosSiniestroError } = useSelector(
    state => ({
      fetchEstadosSiniestroPending: state.dashboard.fetchEstadosSiniestroPending,
      fetchEstadosSiniestroError: state.dashboard.fetchEstadosSiniestroError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchEstadosSiniestro(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchEstadosSiniestroError());
  }, [dispatch]);

  return {
    fetchEstadosSiniestro: boundAction,
    fetchEstadosSiniestroPending,
    fetchEstadosSiniestroError,
    dismissFetchEstadosSiniestroError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_ESTADOS_SINIESTRO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchEstadosSiniestroPending: true,
        fetchEstadosSiniestroError: null,
      };

    case DASHBOARD_FETCH_ESTADOS_SINIESTRO_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchEstadosSiniestroPending: false,
        fetchEstadosSiniestroError: null,
      };

    case DASHBOARD_FETCH_ESTADOS_SINIESTRO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchEstadosSiniestroPending: false,
        fetchEstadosSiniestroError: action.data.error,
      };

    case DASHBOARD_FETCH_ESTADOS_SINIESTRO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchEstadosSiniestroError: null,
      };

    default:
      return state;
  }
}
