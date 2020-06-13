import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_PRODUCTO_BEGIN,
  DASHBOARD_UPDATE_PRODUCTO_SUCCESS,
  DASHBOARD_UPDATE_PRODUCTO_FAILURE,
  DASHBOARD_UPDATE_PRODUCTO_DISMISS_ERROR,
  DASHBOARD_UPDATE_PRODUCTO_DISMISS_SUCCESS,
} from './constants';

export function updateProducto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_UPDATE_PRODUCTO_DISMISS_SUCCESS,
      });
      return
    }


    dispatch({
      type: DASHBOARD_UPDATE_PRODUCTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/Productos`,
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
            type: DASHBOARD_UPDATE_PRODUCTO_SUCCESS,
            data: args.data,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_PRODUCTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateProductoError() {
  return {
    type: DASHBOARD_UPDATE_PRODUCTO_DISMISS_ERROR,
  };
}

export function useUpdateProducto() {
  const dispatch = useDispatch();

  const { updateProductoPending, updateProductoError, updateProductoNotify } = useSelector(
    state => ({
      updateProductoPending: state.dashboard.updateProductoPending,
      updateProductoError: state.dashboard.updateProductoError,
      updateProductoNotify: state.dashboard.updateProductoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateProducto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateProductoError());
  }, [dispatch]);

  return {
    updateProducto: boundAction,
    updateProductoNotify,
    updateProductoPending,
    updateProductoError,
    dismissUpdateProductoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_PRODUCTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateProductoNotify: false,
        updateProductoPending: true,
        updateProductoError: null,
      };

    case DASHBOARD_UPDATE_PRODUCTO_SUCCESS:
      // The request is success
      return {
        ...state,
        productos: [
          ...state.productos.map(item => {
            return item.id === action.data.id ? {
              ...item,
              ...{
                id: parseInt(action.data.id),
                aseguradora: parseInt(action.data.aseguradora),
                producto: action.data.producto,
                idProductos: parseInt(action.data.idProductos),
                xml: action.data.xml,
                xmlEmision: action.data.xmlEmision
              }
            } : item;
          })
        ],
        updateProductoNotify: true,
        updateProductoPending: false,
        updateProductoError: null,
      };

    case DASHBOARD_UPDATE_PRODUCTO_FAILURE:
      // The request is failed
      return {
        ...state,
        updateProductoNotify: true,
        updateProductoPending: false,
        updateProductoError: "Ha ocurrido un error al actualizar el producto.",
      };

    case DASHBOARD_UPDATE_PRODUCTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        updateProductoNotify: false,
        updateProductoError: null,
      };

    case DASHBOARD_UPDATE_PRODUCTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateProductoNotify: false,
        updateProductoError: null,
      };

    default:
      return state;
  }
}
