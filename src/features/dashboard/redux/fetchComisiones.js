import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_COMISIONES_BEGIN,
  DASHBOARD_FETCH_COMISIONES_SUCCESS,
  DASHBOARD_FETCH_COMISIONES_FAILURE,
  DASHBOARD_FETCH_COMISIONES_DISMISS_ERROR,
} from './constants';

export function fetchComisiones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_COMISIONES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Comisiones`,
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
            type: DASHBOARD_FETCH_COMISIONES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_COMISIONES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchComisionesError() {
  return {
    type: DASHBOARD_FETCH_COMISIONES_DISMISS_ERROR,
  };
}

export function useFetchComisiones() {
  const comisiones = useSelector(state => state.dashboard.comisiones);
  
  const dispatch = useDispatch();

  const { fetchComisionesPending, fetchComisionesError } = useSelector(
    state => ({
      fetchComisionesPending: state.dashboard.fetchComisionesPending,
      fetchComisionesError: state.dashboard.fetchComisionesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchComisiones(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchComisionesError());
  }, [dispatch]);

  return {
    comisiones: comisiones,
    fetchComisiones: boundAction,
    fetchComisionesPending,
    fetchComisionesError,
    dismissFetchComisionesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_COMISIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchComisionesPending: true,
        fetchComisionesError: null,
      };

    case DASHBOARD_FETCH_COMISIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        comisiones: action.data.data.map(item => { 
          return {
            id_aseguradora: item.id_aseguradora,
            auto: item.auto,
            moto: item.moto,
            hogar: item.hogar,
            salud: item.salud,
            vida: item.vida,
            gadget: item.gadget,
            mascota: item.mascota,
            viaje: item.viaje,
            retiro: item.retiro,
            pyme: item.pyme,
          };
        }),
        fetchComisionesPending: false,
        fetchComisionesError: null,
      };

    case DASHBOARD_FETCH_COMISIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchComisionesPending: false,
        fetchComisionesError: action.data.error,
      };

    case DASHBOARD_FETCH_COMISIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchComisionesError: null,
      };

    default:
      return state;
  }
}
