import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_PRODUCTOS_BEGIN,
  DASHBOARD_FETCH_PRODUCTOS_SUCCESS,
  DASHBOARD_FETCH_PRODUCTOS_FAILURE,
  DASHBOARD_FETCH_PRODUCTOS_DISMISS_ERROR,
} from './constants';

export function fetchProductos(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_PRODUCTOS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Productos`,
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
            type: DASHBOARD_FETCH_PRODUCTOS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_PRODUCTOS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchProductosError() {
  return {
    type: DASHBOARD_FETCH_PRODUCTOS_DISMISS_ERROR,
  };
}

export function useFetchProductos() {
  const productos = useSelector(state => state.dashboard.productos);

  const dispatch = useDispatch();

  const { fetchProductosPending, fetchProductosError } = useSelector(
    state => ({
      fetchProductosPending: state.dashboard.fetchProductosPending,
      fetchProductosError: state.dashboard.fetchProductosError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchProductos(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchProductosError());
  }, [dispatch]);

  return {
    productos: productos,
    fetchProductos: boundAction,
    fetchProductosPending,
    fetchProductosError,
    dismissFetchProductosError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_PRODUCTOS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchProductosPending: true,
        fetchProductosError: null,
      };

    case DASHBOARD_FETCH_PRODUCTOS_SUCCESS:
      // The request is success
      return {
        ...state,
        productos: action.data.data.map(item => { 
          return {
            id: item.id,
            aseguradora: item.aseguradora,
            producto: item.producto,
            idProductos: item.idProductos,
            xml: item.xml,
            xmlEmision: item.xmlEmision,
          };
        }),
        fetchProductosPending: false,
        fetchProductosError: null,
      };

    case DASHBOARD_FETCH_PRODUCTOS_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchProductosPending: false,
        fetchProductosError: action.data.error,
      };

    case DASHBOARD_FETCH_PRODUCTOS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchProductosError: null,
      };

    default:
      return state;
  }
}
