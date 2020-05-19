import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_POLIZA_PAGO_BEGIN,
  DASHBOARD_FETCH_POLIZA_PAGO_SUCCESS,
  DASHBOARD_FETCH_POLIZA_PAGO_FAILURE,
  DASHBOARD_FETCH_POLIZA_PAGO_DISMISS_ERROR,
} from './constants';

export function fetchPolizaPago(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_POLIZA_PAGO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZA_PAGO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_POLIZA_PAGO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchPolizaPagoError() {
  return {
    type: DASHBOARD_FETCH_POLIZA_PAGO_DISMISS_ERROR,
  };
}

export function useFetchPolizaPago() {
  const dispatch = useDispatch();

  const { fetchPolizaPagoPending, fetchPolizaPagoError } = useSelector(
    state => ({
      fetchPolizaPagoPending: state.dashboard.fetchPolizaPagoPending,
      fetchPolizaPagoError: state.dashboard.fetchPolizaPagoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchPolizaPago(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchPolizaPagoError());
  }, [dispatch]);

  return {
    fetchPolizaPago: boundAction,
    fetchPolizaPagoPending,
    fetchPolizaPagoError,
    dismissFetchPolizaPagoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_POLIZA_PAGO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchPolizaPagoPending: true,
        fetchPolizaPagoError: null,
      };

    case DASHBOARD_FETCH_POLIZA_PAGO_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchPolizaPagoPending: false,
        fetchPolizaPagoError: null,
      };

    case DASHBOARD_FETCH_POLIZA_PAGO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchPolizaPagoPending: false,
        fetchPolizaPagoError: action.data.error,
      };

    case DASHBOARD_FETCH_POLIZA_PAGO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchPolizaPagoError: null,
      };

    default:
      return state;
  }
}
