import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_DROPDOWN_PARENTESCO_BEGIN,
  DASHBOARD_FETCH_DROPDOWN_PARENTESCO_SUCCESS,
  DASHBOARD_FETCH_DROPDOWN_PARENTESCO_FAILURE,
  DASHBOARD_FETCH_DROPDOWN_PARENTESCO_DISMISS_ERROR,
} from './constants';

export function fetchDropdownParentesco(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_DROPDOWN_PARENTESCO_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/Dropdown/parentesco`,
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
            type: DASHBOARD_FETCH_DROPDOWN_PARENTESCO_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_DROPDOWN_PARENTESCO_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchDropdownParentescoError() {
  return {
    type: DASHBOARD_FETCH_DROPDOWN_PARENTESCO_DISMISS_ERROR,
  };
}

export function useFetchDropdownParentesco() {
  const dropdownParentesco = useSelector(state => state.dashboard.dropdownParentesco);

  const dispatch = useDispatch();

  const { fetchDropdownParentescoPending, fetchDropdownParentescoError } = useSelector(
    state => ({
      fetchDropdownParentescoPending: state.dashboard.fetchDropdownParentescoPending,
      fetchDropdownParentescoError: state.dashboard.fetchDropdownParentescoError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchDropdownParentesco(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchDropdownParentescoError());
  }, [dispatch]);

  return {
    dropdownParentesco: dropdownParentesco,
    fetchDropdownParentesco: boundAction,
    fetchDropdownParentescoPending,
    fetchDropdownParentescoError,
    dismissFetchDropdownParentescoError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_DROPDOWN_PARENTESCO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchDropdownParentescoPending: true,
        fetchDropdownParentescoError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_PARENTESCO_SUCCESS:
      // The request is success
      return {
        ...state,
        dropdownParentesco: action.data.data[0].data.map(item => {
          return {
            id: item.id,
            descripcion: item.descripcion,
          };
        }),
        fetchDropdownParentescoPending: false,
        fetchDropdownParentescoError: null,
      };

    case DASHBOARD_FETCH_DROPDOWN_PARENTESCO_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchDropdownParentescoPending: false,
        fetchDropdownParentescoError: action.data.error,
      };

    case DASHBOARD_FETCH_DROPDOWN_PARENTESCO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchDropdownParentescoError: null,
      };

    default:
      return state;
  }
}
