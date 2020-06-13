import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_CONFIRMAR_POLIZA_BEGIN,
  DASHBOARD_CONFIRMAR_POLIZA_SUCCESS,
  DASHBOARD_CONFIRMAR_POLIZA_FAILURE,
  DASHBOARD_CONFIRMAR_POLIZA_DISMISS_SUCCESS,
  DASHBOARD_CONFIRMAR_POLIZA_DISMISS_ERROR,
} from './constants';

export function confirmarPoliza(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_CONFIRMAR_POLIZA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_CONFIRMAR_POLIZA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/PolizasComisiones`,
        method: 'POST',
        data: args.comisiones,
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          axios({
            url: `http://3.136.94.107:4300/api/ConfirmarPoliza/${args.no_poliza}`,
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${args.token}`,
              'Content-Type': 'application/json',
            },
          }).then(
            (res) => {
              dispatch({
                type: DASHBOARD_CONFIRMAR_POLIZA_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_CONFIRMAR_POLIZA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissConfirmarPolizaError() {
  return {
    type: DASHBOARD_CONFIRMAR_POLIZA_DISMISS_ERROR,
  };
}

export function useConfirmarPoliza() {
  const dispatch = useDispatch();

  const { confirmarPolizaPending, confirmarPolizaError, confirmarPolizaNotify, } = useSelector(
    state => ({
      confirmarPolizaPending: state.dashboard.confirmarPolizaPending,
      confirmarPolizaError: state.dashboard.confirmarPolizaError,
      confirmarPolizaNotify: state.dashboard.confirmarPolizaNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(confirmarPoliza(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissConfirmarPolizaError());
  }, [dispatch]);

  return {
    confirmarPoliza: boundAction,
    confirmarPolizaNotify,
    confirmarPolizaPending,
    confirmarPolizaError,
    dismissConfirmarPolizaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_CONFIRMAR_POLIZA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        confirmarPolizaPending: true,
        confirmarPolizaNotify: false,
        confirmarPolizaError: null,
      };

    case DASHBOARD_CONFIRMAR_POLIZA_SUCCESS:
      // The request is success
      return {
        ...state,
        confirmarPolizaPending: false,
        confirmarPolizaNotify: true,
        confirmarPolizaError: null,
      };

    case DASHBOARD_CONFIRMAR_POLIZA_FAILURE:
      // The request is failed
      return {
        ...state,
        confirmarPolizaPending: false,
        confirmarPolizaNotify: true,
        confirmarPolizaError: action.data.error,
      };

    case DASHBOARD_CONFIRMAR_POLIZA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        confirmarPolizaNotify: false,
        confirmarPolizaError: null,
      };

    case DASHBOARD_CONFIRMAR_POLIZA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        confirmarPolizaNotify: false,
        confirmarPolizaError: null,
      };

    default:
      return state;
  }
}
