import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_INSERT_PRODUCTO_BEGIN,
  DASHBOARD_INSERT_PRODUCTO_SUCCESS,
  DASHBOARD_INSERT_PRODUCTO_FAILURE,
  DASHBOARD_INSERT_PRODUCTO_DISMISS_ERROR,
  DASHBOARD_INSERT_PRODUCTO_DISMISS_SUCCESS,
} from './constants';

export function insertProducto(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_INSERT_PRODUCTO_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_INSERT_PRODUCTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Productos`,
        method: 'POST',
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
                type: DASHBOARD_INSERT_PRODUCTO_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_INSERT_PRODUCTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissInsertProductoError() {
  return {
    type: DASHBOARD_INSERT_PRODUCTO_DISMISS_ERROR,
  };
}

export function useInsertProducto() {
  const dispatch = useDispatch();

  const { insertProductoPending, insertProductoError, insertProductoNotify } = useSelector(
    state => ({
      insertProductoPending: state.dashboard.insertProductoPending,
      insertProductoError: state.dashboard.insertProductoError,
      insertProductoNotify: state.dashboard.insertProductoNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(insertProducto(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissInsertProductoError());
  }, [dispatch]);

  return {
    insertProducto: boundAction,
    insertProductoNotify,
    insertProductoPending,
    insertProductoError,
    dismissInsertProductoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_INSERT_PRODUCTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        insertProductoNotify: false,
        insertProductoPending: true,
        insertProductoError: null,
      };

    case DASHBOARD_INSERT_PRODUCTO_SUCCESS:
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
        insertProductoNotify: true,
        insertProductoPending: false,
        insertProductoError: null,
      };

    case DASHBOARD_INSERT_PRODUCTO_FAILURE:
      // The request is failed
      return {
        ...state,
        insertProductoNotify: true,
        insertProductoPending: false,
        insertProductoError: "Ha ocurrido un error al insertar el registro",
      };

    case DASHBOARD_INSERT_PRODUCTO_DISMISS_SUCCESS:
      return {
        ...state,
        insertProductoNotify: false,
        insertProductoError: null
      }

    case DASHBOARD_INSERT_PRODUCTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        insertProductoNotify: false,
        insertProductoError: null,
      };

    default:
      return state;
  }
}
