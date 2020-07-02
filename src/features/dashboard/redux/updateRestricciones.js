import axios from 'axios';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_RESTRICCIONES_BEGIN,
  DASHBOARD_UPDATE_RESTRICCIONES_SUCCESS,
  DASHBOARD_UPDATE_RESTRICCIONES_FAILURE,
  DASHBOARD_UPDATE_RESTRICCIONES_DISMISS_ERROR,
  DASHBOARD_UPDATE_RESTRICCIONES_DISMISS_SUCCESS,
} from './constants';

export function updateRestricciones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if (args.dismiss === true) {
      dispatch({
        type: DASHBOARD_UPDATE_RESTRICCIONES_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_UPDATE_RESTRICCIONES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Restricciones/${args.username}`,
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
            type: DASHBOARD_UPDATE_RESTRICCIONES_SUCCESS,
            data: args.data,
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

  const { updateRestriccionesPending, updateRestriccionesError, updateRestriccionesNotify } = useSelector(
    state => ({
      updateRestriccionesPending: state.dashboard.updateRestriccionesPending,
      updateRestriccionesError: state.dashboard.updateRestriccionesError,
      updateRestriccionesNotify: state.dashboard.updateRestriccionesNotify,
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
    updateRestriccionesNotify,
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
        updateRestriccionesNotify: false,
        updateRestriccionesPending: true,
        updateRestriccionesError: null,
      };

    case DASHBOARD_UPDATE_RESTRICCIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        restriccionesEdicion: action.data,
        updateRestriccionesNotify: true,
        updateRestriccionesPending: false,
        updateRestriccionesError: null,
      };

    case DASHBOARD_UPDATE_RESTRICCIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        updateRestriccionesNotify: true,
        updateRestriccionesPending: false,
        updateRestriccionesError: "Ha ocurrido un error al actualizar los permisos.",
      };

    case DASHBOARD_UPDATE_RESTRICCIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateRestriccionesNotify: false,
        updateRestriccionesError: null,
      };

    default:
      return state;
  }
}
