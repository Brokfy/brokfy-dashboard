import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_BEGIN,
  DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_SUCCESS,
  DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_FAILURE,
  DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_DISMISS_ERROR,
} from './constants';
import format from 'date-fns/format'

export function fetchCartasNombramiento(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/CartaNombramiento`,
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
            type: DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchCartasNombramientoError() {
  return {
    type: DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_DISMISS_ERROR,
  };
}

export function useFetchCartasNombramiento() {
  const cartasNombramiento = useSelector(state => state.dashboard.cartasNombramiento);

  const dispatch = useDispatch();

  const { fetchCartasNombramientoPending, fetchCartasNombramientoError } = useSelector(
    state => ({
      fetchCartasNombramientoPending: state.dashboard.fetchCartasNombramientoPending,
      fetchCartasNombramientoError: state.dashboard.fetchCartasNombramientoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchCartasNombramiento(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchCartasNombramientoError());
  }, [dispatch]);

  return {
    cartasNombramiento: cartasNombramiento,
    fetchCartasNombramiento: boundAction,
    fetchCartasNombramientoPending,
    fetchCartasNombramientoError,
    dismissFetchCartasNombramientoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchCartasNombramientoPending: true,
        fetchCartasNombramientoError: null,
      };

    case DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_SUCCESS:
      // The request is success
      return {
        ...state,
        cartasNombramiento: action.data.data.map(item => {
          return {
            username: item.username,
            fullName: item.fullName,
            tipo: parseInt(item.tipo),
            aseguradora: parseInt(item.aseguradora),
            fecha: format(new Date(item.fecha), 'dd/MM/yyyy'),
            noPoliza: item.noPoliza,
            revisado: item.revisado,
            urlPoliza: item.urlPoliza,
            urlCartaNombramiento: item.urlCartaNombramiento,
            firmada: item.firmada
          };
        }),
        fetchCartasNombramientoPending: false,
        fetchCartasNombramientoError: null,
      };

    case DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchCartasNombramientoPending: false,
        fetchCartasNombramientoError: action.data.error,
      };

    case DASHBOARD_FETCH_CARTAS_NOMBRAMIENTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchCartasNombramientoError: null,
      };

    default:
      return state;
  }
}
