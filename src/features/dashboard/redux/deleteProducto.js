import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DELETE_PRODUCTO_BEGIN,
  DASHBOARD_DELETE_PRODUCTO_SUCCESS,
  DASHBOARD_DELETE_PRODUCTO_FAILURE,
  DASHBOARD_DELETE_PRODUCTO_DISMISS_SUCCESS,
  DASHBOARD_DELETE_PRODUCTO_DISMISS_ERROR,
} from './constants';

export function deleteProducto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_DELETE_PRODUCTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_DELETE_PRODUCTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/Productos`,
        method: 'DELETE',
        data: args.data,
        headers: {
          'Authorization': `Bearer ${args.token}`,
          'Content-Type': 'application/json',
        },
      };

      const doRequest = axios(options);
      doRequest.then(
        (res) => {
          axios({
            ...options,
            method: "GET"
          }).then(
            (res) => {
              dispatch({
                type: DASHBOARD_DELETE_PRODUCTO_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DELETE_PRODUCTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeleteProductoError() {
  return {
    type: DASHBOARD_DELETE_PRODUCTO_DISMISS_ERROR,
  };
}

export function useDeleteProducto() {
  const dispatch = useDispatch();

  const { deleteProductoPending, deleteProductoError, deleteProductoNotify } = useSelector(
    state => ({
      deleteProductoPending: state.dashboard.deleteProductoPending,
      deleteProductoError: state.dashboard.deleteProductoError,
      deleteProductoNotify: state.dashboard.deleteProductoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deleteProducto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeleteProductoError());
  }, [dispatch]);

  return {
    deleteProducto: boundAction,
    deleteProductoNotify,
    deleteProductoPending,
    deleteProductoError,
    dismissDeleteProductoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DELETE_PRODUCTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteProductoNotify: false,
        deleteProductoPending: true,
        deleteProductoError: null,
      };

    case DASHBOARD_DELETE_PRODUCTO_SUCCESS:
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
        deleteProductoNotify: true,
        deleteProductoPending: false,
        deleteProductoError: null,
      };

    case DASHBOARD_DELETE_PRODUCTO_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteProductoNotify: true,
        deleteProductoPending: false,
        deleteProductoError: "Ha ocurrido un error al eliminar el registro",
      };

    case DASHBOARD_DELETE_PRODUCTO_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        deleteProductoNotify: false,
        deleteProductoError: null,
      };

    case DASHBOARD_DELETE_PRODUCTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteProductoNotify: false,
        deleteProductoError: null,
      };

    default:
      return state;
  }
}
