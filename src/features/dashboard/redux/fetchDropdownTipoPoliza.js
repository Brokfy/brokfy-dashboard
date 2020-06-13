import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_BEGIN,
  DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_SUCCESS,
  DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_FAILURE,
  DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_DISMISS_ERROR,
} from './constants';

export function fetchDropdownTipoPoliza(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `http://3.136.94.107:4300/api/Dropdown/tipo_poliza`,
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
            type: DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDropdownTipoPolizaError() {
  return {
    type: DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_DISMISS_ERROR,
  };
}

export function useFetchDropdownTipoPoliza() {
  const dropdownTipoPoliza = useSelector(state => state.dashboard.dropdownTipoPoliza);

  const dispatch = useDispatch();

  const { fetchDropdownTipoPolizaPending, fetchDropdownTipoPolizaError } = useSelector(
    state => ({
      fetchDropdownTipoPolizaPending: state.dashboard.fetchDropdownTipoPolizaPending,
      fetchDropdownTipoPolizaError: state.dashboard.fetchDropdownTipoPolizaError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDropdownTipoPoliza(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDropdownTipoPolizaError());
  }, [dispatch]);

  return {
    dropdownTipoPoliza: dropdownTipoPoliza,
    fetchDropdownTipoPoliza: boundAction,
    fetchDropdownTipoPolizaPending,
    fetchDropdownTipoPolizaError,
    dismissFetchDropdownTipoPolizaError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDropdownTipoPolizaPending: true,
        fetchDropdownTipoPolizaError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_SUCCESS:
      // The request is success
      return {
        ...state,
        dropdownTipoPoliza: action.data.data[0].data.map(item => {
          return {
            id: item.id,
            tipo: item.tipo,
          };
        }),
        fetchDropdownTipoPolizaPending: false,
        fetchDropdownTipoPolizaError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDropdownTipoPolizaPending: false,
        fetchDropdownTipoPolizaError: action.data.error,
      };

    case DASHBOARD_FETCH_DROPDOWN_TIPO_POLIZA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDropdownTipoPolizaError: null,
      };

    default:
      return state;
  }
}
