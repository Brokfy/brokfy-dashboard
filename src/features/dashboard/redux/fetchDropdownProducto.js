import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DROPDOWN_PRODUCTO_BEGIN,
  DASHBOARD_FETCH_DROPDOWN_PRODUCTO_SUCCESS,
  DASHBOARD_FETCH_DROPDOWN_PRODUCTO_FAILURE,
  DASHBOARD_FETCH_DROPDOWN_PRODUCTO_DISMISS_ERROR,
} from './constants';

export function fetchDropdownProducto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DROPDOWN_PRODUCTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Dropdown/productos`,
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
            type: DASHBOARD_FETCH_DROPDOWN_PRODUCTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DROPDOWN_PRODUCTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDropdownProductoError() {
  return {
    type: DASHBOARD_FETCH_DROPDOWN_PRODUCTO_DISMISS_ERROR,
  };
}

export function useFetchDropdownProducto() {
  const dropdownProductos = useSelector(state => state.dashboard.dropdownProductos);

  const dispatch = useDispatch();

  const { fetchDropdownProductoPending, fetchDropdownProductoError } = useSelector(
    state => ({
      fetchDropdownProductoPending: state.dashboard.fetchDropdownProductoPending,
      fetchDropdownProductoError: state.dashboard.fetchDropdownProductoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDropdownProducto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDropdownProductoError());
  }, [dispatch]);

  return {
    dropdownProductos: dropdownProductos,
    fetchDropdownProducto: boundAction,
    fetchDropdownProductoPending,
    fetchDropdownProductoError,
    dismissFetchDropdownProductoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DROPDOWN_PRODUCTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDropdownProductoPending: true,
        fetchDropdownProductoError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_PRODUCTO_SUCCESS:
      // The request is success
      return {
        ...state,
        dropdownProductos: action.data.data[0].data.map(item => {
          return {
            id: item.id,
            producto: item.producto,
            aseguradora: item.aseguradora,
          };
        }),
        fetchDropdownProductoPending: false,
        fetchDropdownProductoError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_PRODUCTO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDropdownProductoPending: false,
        fetchDropdownProductoError: action.data.error,
      };

    case DASHBOARD_FETCH_DROPDOWN_PRODUCTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDropdownProductoError: null,
      };

    default:
      return state;
  }
}
