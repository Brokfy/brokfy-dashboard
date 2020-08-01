import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_PRODUCTOS_BROKFY_BEGIN,
  DASHBOARD_FETCH_PRODUCTOS_BROKFY_SUCCESS,
  DASHBOARD_FETCH_PRODUCTOS_BROKFY_FAILURE,
  DASHBOARD_FETCH_PRODUCTOS_BROKFY_DISMISS_ERROR,
} from './constants';

export function fetchProductosBrokfy(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_PRODUCTOS_BROKFY_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Dropdown/productos_brokfy`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${args}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_PRODUCTOS_BROKFY_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_PRODUCTOS_BROKFY_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchProductosBrokfyError() {
  return {
    type: DASHBOARD_FETCH_PRODUCTOS_BROKFY_DISMISS_ERROR,
  };
}

export function useFetchProductosBrokfy() {
  const productosBrokfy = useSelector(state => state.dashboard.productosBrokfy);

  const dispatch = useDispatch();

  const { fetchProductosBrokfyPending, fetchProductosBrokfyError } = useSelector(
    state => ({
      fetchProductosBrokfyPending: state.dashboard.fetchProductosBrokfyPending,
      fetchProductosBrokfyError: state.dashboard.fetchProductosBrokfyError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchProductosBrokfy(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchProductosBrokfyError());
  }, [dispatch]);

  return {
    productosBrokfy: productosBrokfy,
    fetchProductosBrokfy: boundAction,
    fetchProductosBrokfyPending,
    fetchProductosBrokfyError,
    dismissFetchProductosBrokfyError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_PRODUCTOS_BROKFY_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchProductosBrokfyPending: true,
        fetchProductosBrokfyError: null,
      };

    case DASHBOARD_FETCH_PRODUCTOS_BROKFY_SUCCESS:
      // The request is success
      return {
        ...state,
        productosBrokfy: action.data.data[0].data.map(item => {
          return {
            id: item.id,
            producto: item.producto,
          };
        }),
        fetchProductosBrokfyPending: false,
        fetchProductosBrokfyError: null,
      };

    case DASHBOARD_FETCH_PRODUCTOS_BROKFY_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchProductosBrokfyPending: false,
        fetchProductosBrokfyError: action.data.error,
      };

    case DASHBOARD_FETCH_PRODUCTOS_BROKFY_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchProductosBrokfyError: null,
      };

    default:
      return state;
  }
}
