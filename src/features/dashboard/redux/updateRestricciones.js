import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_RESTRICCIONES_BEGIN,
  DASHBOARD_UPDATE_RESTRICCIONES_SUCCESS,
  DASHBOARD_UPDATE_RESTRICCIONES_FAILURE,
  DASHBOARD_UPDATE_RESTRICCIONES_DISMISS_ERROR,
} from './constants';

export function updateRestricciones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_RESTRICCIONES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_UPDATE_RESTRICCIONES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_RESTRICCIONES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateRestriccionesError() {
  return {
    type: DASHBOARD_UPDATE_RESTRICCIONES_DISMISS_ERROR,
  };
}

export function useUpdateRestricciones() {
  const dispatch = useDispatch();

  const { updateRestriccionesPending, updateRestriccionesError } = useSelector(
    state => ({
      updateRestriccionesPending: state.dashboard.updateRestriccionesPending,
      updateRestriccionesError: state.dashboard.updateRestriccionesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateRestricciones(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateRestriccionesError());
  }, [dispatch]);

  return {
    updateRestricciones: boundAction,
    updateRestriccionesPending,
    updateRestriccionesError,
    dismissUpdateRestriccionesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_RESTRICCIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateRestriccionesPending: true,
        updateRestriccionesError: null,
      };

    case DASHBOARD_UPDATE_RESTRICCIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        updateRestriccionesPending: false,
        updateRestriccionesError: null,
      };

    case DASHBOARD_UPDATE_RESTRICCIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        updateRestriccionesPending: false,
        updateRestriccionesError: action.data.error,
      };

    case DASHBOARD_UPDATE_RESTRICCIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateRestriccionesError: null,
      };

    default:
      return state;
  }
}
