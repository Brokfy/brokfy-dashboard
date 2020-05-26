import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_BEGIN,
  DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_SUCCESS,
  DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_FAILURE,
  DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_DISMISS_ERROR,
} from './constants';

export function fetchDropdownOcupaciones(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Dropdown/Ocupaciones`,
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
            type: DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDropdownOcupacionesError() {
  return {
    type: DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_DISMISS_ERROR,
  };
}

export function useFetchDropdownOcupaciones() {
  const dropdownOcupaciones = useSelector(state => state.dashboard.dropdownOcupaciones);

  const dispatch = useDispatch();

  const { fetchDropdownOcupacionesPending, fetchDropdownOcupacionesError } = useSelector(
    state => ({
      fetchDropdownOcupacionesPending: state.dashboard.fetchDropdownOcupacionesPending,
      fetchDropdownOcupacionesError: state.dashboard.fetchDropdownOcupacionesError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDropdownOcupaciones(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDropdownOcupacionesError());
  }, [dispatch]);

  return {
    dropdownOcupaciones: dropdownOcupaciones,
    fetchDropdownOcupaciones: boundAction,
    fetchDropdownOcupacionesPending,
    fetchDropdownOcupacionesError,
    dismissFetchDropdownOcupacionesError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDropdownOcupacionesPending: true,
        fetchDropdownOcupacionesError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        dropdownOcupaciones: action.data.data[0].data.map(item => {
          return {
            id: item.id,
            descripcion: item.descripcion,
          };
        }),
        fetchDropdownOcupacionesPending: false,
        fetchDropdownOcupacionesError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDropdownOcupacionesPending: false,
        fetchDropdownOcupacionesError: action.data.error,
      };

    case DASHBOARD_FETCH_DROPDOWN_OCUPACIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDropdownOcupacionesError: null,
      };

    default:
      return state;
  }
}
