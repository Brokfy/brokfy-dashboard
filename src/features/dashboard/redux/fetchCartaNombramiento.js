import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_BEGIN,
  DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_SUCCESS,
  DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_FAILURE,
  DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_DISMISS_ERROR,
} from './constants';

export function fetchCartaNombramiento(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/CartaNombramiento/${args.noPoliza}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchCartaNombramientoError() {
  return {
    type: DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_DISMISS_ERROR,
  };
}

export function useFetchCartaNombramiento() {
  const cartaNombramiento = useSelector(state => state.dashboard.cartaNombramiento);

  const dispatch = useDispatch();

  const { fetchCartaNombramientoPending, fetchCartaNombramientoError } = useSelector(
    state => ({
      fetchCartaNombramientoPending: state.dashboard.fetchCartaNombramientoPending,
      fetchCartaNombramientoError: state.dashboard.fetchCartaNombramientoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchCartaNombramiento(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchCartaNombramientoError());
  }, [dispatch]);

  return {
    cartaNombramiento: cartaNombramiento,
    fetchCartaNombramiento: boundAction,
    fetchCartaNombramientoPending,
    fetchCartaNombramientoError,
    dismissFetchCartaNombramientoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchCartaNombramientoPending: true,
        fetchCartaNombramientoError: null,
      };

    case DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_SUCCESS:
      // The request is success
      return {
        ...state,
        cartaNombramiento: action.data.data && action.data.data !== '' ? action.data.data : null,
        fetchCartaNombramientoPending: false,
        fetchCartaNombramientoError: null,
      };

    case DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchCartaNombramientoPending: false,
        fetchCartaNombramientoError: action.data.error,
      };

    case DASHBOARD_FETCH_CARTA_NOMBRAMIENTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchCartaNombramientoError: null,
      };

    default:
      return state;
  }
}
