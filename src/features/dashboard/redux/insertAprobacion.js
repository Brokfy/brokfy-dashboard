import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_INSERT_APROBACION_BEGIN,
  DASHBOARD_INSERT_APROBACION_SUCCESS,
  DASHBOARD_INSERT_APROBACION_FAILURE,
  DASHBOARD_INSERT_APROBACION_DISMISS_ERROR,
} from './constants';

export function insertAprobacion(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_INSERT_APROBACION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_INSERT_APROBACION_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_INSERT_APROBACION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissInsertAprobacionError() {
  return {
    type: DASHBOARD_INSERT_APROBACION_DISMISS_ERROR,
  };
}

export function useInsertAprobacion() {
  const dispatch = useDispatch();

  const { insertAprobacionPending, insertAprobacionError } = useSelector(
    state => ({
      insertAprobacionPending: state.dashboard.insertAprobacionPending,
      insertAprobacionError: state.dashboard.insertAprobacionError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(insertAprobacion(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissInsertAprobacionError());
  }, [dispatch]);

  return {
    insertAprobacion: boundAction,
    insertAprobacionPending,
    insertAprobacionError,
    dismissInsertAprobacionError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_INSERT_APROBACION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        insertAprobacionPending: true,
        insertAprobacionError: null,
      };

    case DASHBOARD_INSERT_APROBACION_SUCCESS:
      // The request is success
      return {
        ...state,
        insertAprobacionPending: false,
        insertAprobacionError: null,
      };

    case DASHBOARD_INSERT_APROBACION_FAILURE:
      // The request is failed
      return {
        ...state,
        insertAprobacionPending: false,
        insertAprobacionError: action.data.error,
      };

    case DASHBOARD_INSERT_APROBACION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        insertAprobacionError: null,
      };

    default:
      return state;
  }
}
