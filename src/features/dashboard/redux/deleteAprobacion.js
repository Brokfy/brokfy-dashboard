import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_DELETE_APROBACION_BEGIN,
  DASHBOARD_DELETE_APROBACION_SUCCESS,
  DASHBOARD_DELETE_APROBACION_FAILURE,
  DASHBOARD_DELETE_APROBACION_DISMISS_SUCCESS,
  DASHBOARD_DELETE_APROBACION_DISMISS_ERROR,
} from './constants';

export function deleteAprobacion(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_DELETE_APROBACION_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://ec2-3-136-94-107.us-east-2.compute.amazonaws.com:4300/api/Aprobaciones`,
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
                type: DASHBOARD_DELETE_APROBACION_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_DELETE_APROBACION_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDeleteAprobacionError() {
  return {
    type: DASHBOARD_DELETE_APROBACION_DISMISS_ERROR,
  };
}

export function useDeleteAprobacion() {
  const dispatch = useDispatch();

  const { deleteAprobacionPending, deleteAprobacionError, deleteAprobacionNotify } = useSelector(
    state => ({
      deleteAprobacionPending: state.dashboard.deleteAprobacionPending,
      deleteAprobacionError: state.dashboard.deleteAprobacionError,
      deleteAprobacionNotify: state.dashboard.deleteAprobacionNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(deleteAprobacion(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDeleteAprobacionError());
  }, [dispatch]);

  return {
    deleteAprobacion: boundAction,
    deleteAprobacionNotify,
    deleteAprobacionPending,
    deleteAprobacionError,
    dismissDeleteAprobacionError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_DELETE_APROBACION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        deleteAprobacionNotify: false,
        deleteAprobacionPending: true,
        deleteAprobacionError: null,
      };

    case DASHBOARD_DELETE_APROBACION_SUCCESS:
      // The request is success
      return {
        ...state,
        aprobaciones: action.data.data.map(item => {
          return {
            username: item.username,
            fullName: item.fullName,
            tipo: parseInt(item.tipo),
            aseguradora: parseInt(item.aseguradora),
            fecha: item.fecha,
            noPoliza: item.noPoliza,
            revisado: item.revisado,
            urlPoliza: item.urlPoliza,
            urlCartaNombramiento: item.urlCartaNombramiento,
            firmada: item.firmada
          };
        }),
        deleteAprobacionNotify: true,
        deleteAprobacionPending: false,
        deleteAprobacionError: null,
      };

    case DASHBOARD_DELETE_APROBACION_FAILURE:
      // The request is failed
      return {
        ...state,
        deleteAprobacionNotify: true,
        deleteAprobacionPending: false,
        deleteAprobacionError: action.data.error,
      };

    case DASHBOARD_DELETE_APROBACION_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        deleteAprobacionNotify: false,
        deleteAprobacionError: null,
      };

    case DASHBOARD_DELETE_APROBACION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        deleteAprobacionNotify: false,
        deleteAprobacionError: null,
      };

    default:
      return state;
  }
}
