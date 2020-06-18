import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_BEGIN,
  DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_SUCCESS,
  DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_FAILURE,
  DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_DISMISS_ERROR,
} from './constants';

export function fetchDropdownAseguradora(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://ec2-3-136-94-107.us-east-2.compute.amazonaws.com:4300/api/Dropdown/aseguradoras`,
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
            type: DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDropdownAseguradoraError() {
  return {
    type: DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_DISMISS_ERROR,
  };
}

export function useFetchDropdownAseguradora() {
  const dropdownAseguradoras = useSelector(state => state.dashboard.dropdownAseguradoras);

  const dispatch = useDispatch();

  const { fetchDropdownAseguradoraPending, fetchDropdownAseguradoraError } = useSelector(
    state => ({
      fetchDropdownAseguradoraPending: state.dashboard.fetchDropdownAseguradoraPending,
      fetchDropdownAseguradoraError: state.dashboard.fetchDropdownAseguradoraError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDropdownAseguradora(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDropdownAseguradoraError());
  }, [dispatch]);

  return {
    dropdownAseguradoras: dropdownAseguradoras,
    fetchDropdownAseguradora: boundAction,
    fetchDropdownAseguradoraPending,
    fetchDropdownAseguradoraError,
    dismissFetchDropdownAseguradoraError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDropdownAseguradoraPending: true,
        fetchDropdownAseguradoraError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_SUCCESS:
      // The request is success
      return {
        ...state,
        dropdownAseguradoras: action.data.data[0].data.map(item => {
          return {
            idAseguradora: item.idAseguradora,
            nombre: item.nombre,
          };
        }),
        fetchDropdownAseguradoraPending: false,
        fetchDropdownAseguradoraError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDropdownAseguradoraPending: false,
        fetchDropdownAseguradoraError: action.data.error,
      };

    case DASHBOARD_FETCH_DROPDOWN_ASEGURADORA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDropdownAseguradoraError: null,
      };

    default:
      return state;
  }
}
