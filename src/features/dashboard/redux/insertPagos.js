import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_INSERT_PAGOS_BEGIN,
  DASHBOARD_INSERT_PAGOS_SUCCESS,
  DASHBOARD_INSERT_PAGOS_FAILURE,
  DASHBOARD_INSERT_PAGOS_DISMISS_SUCCESS,
  DASHBOARD_INSERT_PAGOS_DISMISS_ERROR,
} from './constants';

export function insertPagos(args = {}) {
  
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_INSERT_PAGOS_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_INSERT_PAGOS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Pagos`,
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
          dispatch({
            type: DASHBOARD_INSERT_PAGOS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_INSERT_PAGOS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissInsertPagosError() {
  return {
    type: DASHBOARD_INSERT_PAGOS_DISMISS_ERROR,
  };
}

export function useInsertPagos() {
  const dispatch = useDispatch();

  const { insertPagosPending, insertPagosError, insertPagosNotify } = useSelector(
    state => ({
      insertPagosPending: state.dashboard.insertPagosPending,
      insertPagosError: state.dashboard.insertPagosError,
      insertPagosNotify: state.dashboard.insertPagosNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(insertPagos(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissInsertPagosError());
  }, [dispatch]);

  return {
    insertPagos: boundAction,
    insertPagosNotify,
    insertPagosPending,
    insertPagosError,
    dismissInsertPagosError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_INSERT_PAGOS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        insertPagosPending: true,
        insertPagosNotify: false,
        insertPagosError: null,
      };

    case DASHBOARD_INSERT_PAGOS_SUCCESS:
      // The request is success
      return {
        ...state,
        insertPagosPending: false,
        insertPagosNotify: true,
        insertPagosError: null,
      };

    case DASHBOARD_INSERT_PAGOS_FAILURE:
      // The request is failed
      return {
        ...state,
        insertPagosPending: false,
        insertPagosNotify: true,
        insertPagosError: action.data.error,
      };

      case DASHBOARD_INSERT_PAGOS_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        insertPagosNotify: false,
        insertPagosError: null,
      };
    
      case DASHBOARD_INSERT_PAGOS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        insertPagosNotify: false,
        insertPagosError: null,
      };

    default:
      return state;
  }
}
