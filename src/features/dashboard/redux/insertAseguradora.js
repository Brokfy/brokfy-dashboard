import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_INSERT_ASEGURADORA_BEGIN,
  DASHBOARD_INSERT_ASEGURADORA_SUCCESS,
  DASHBOARD_INSERT_ASEGURADORA_FAILURE,
  DASHBOARD_INSERT_ASEGURADORA_DISMISS_ERROR,
  DASHBOARD_INSERT_ASEGURADORA_DISMISS_SUCCESS,
} from './constants';

export function insertAseguradora(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    if( args.dismiss === true ) {
      dispatch({
        type: DASHBOARD_INSERT_ASEGURADORA_DISMISS_SUCCESS,
      });
      return
    }

    dispatch({
      type: DASHBOARD_INSERT_ASEGURADORA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Aseguradoras`,
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
                type: DASHBOARD_INSERT_ASEGURADORA_SUCCESS,
                data: res,
              });
              resolve(res);
            },
          );
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_INSERT_ASEGURADORA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissInsertAseguradoraError() {
  return {
    type: DASHBOARD_INSERT_ASEGURADORA_DISMISS_ERROR,
  };
}

export function useInsertAseguradora() {
  const dispatch = useDispatch();

  const { insertAseguradoraPending, insertAseguradoraError, insertAseguradoraNotify } = useSelector(
    state => ({
      insertAseguradoraPending: state.dashboard.insertAseguradoraPending,
      insertAseguradoraError: state.dashboard.insertAseguradoraError,
      insertAseguradoraNotify: state.dashboard.insertAseguradoraNotify,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(insertAseguradora(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissInsertAseguradoraError());
  }, [dispatch]);

  return {
    insertAseguradora: boundAction,
    insertAseguradoraNotify,
    insertAseguradoraPending,
    insertAseguradoraError,
    dismissInsertAseguradoraError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_INSERT_ASEGURADORA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        insertAseguradoraNotify: false,
        insertAseguradoraPending: true,
        insertAseguradoraError: null,
      };

    case DASHBOARD_INSERT_ASEGURADORA_SUCCESS:
      // The request is success
      return {
        ...state,
        aseguradoras: action.data.data.map(item => { 
          return {
            idAseguradora: item.idAseguradora,
            nombre: item.nombre,
            telefono: item.telefono,
            enabled: item.enabled,
            cveCopsis: item.cveCopsis,
          };
        }),
        insertAseguradoraNotify: true,
        insertAseguradoraPending: false,
        insertAseguradoraError: null,
      };

    case DASHBOARD_INSERT_ASEGURADORA_FAILURE:
      // The request is failed
      return {
        ...state,
        insertAseguradoraNotify: true,
        insertAseguradoraPending: false,
        insertAseguradoraError: "Ha ocurrido un error al insertar el registro",
      };

    case DASHBOARD_INSERT_ASEGURADORA_DISMISS_SUCCESS:
      // Dismiss the request failure error
      return {
        ...state,
        insertAseguradoraNotify: false,
        insertAseguradoraError: null,
      };

    case DASHBOARD_INSERT_ASEGURADORA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        insertAseguradoraNotify: false,
        insertAseguradoraError: null,
      };

    default:
      return state;
  }
}
