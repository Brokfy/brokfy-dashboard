import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_UPDATE_PROFILE_ITEMS_BEGIN,
  DASHBOARD_UPDATE_PROFILE_ITEMS_SUCCESS,
  DASHBOARD_UPDATE_PROFILE_ITEMS_FAILURE,
  DASHBOARD_UPDATE_PROFILE_ITEMS_DISMISS_ERROR,
} from './constants';

export function updateProfileItems(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_UPDATE_PROFILE_ITEMS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = {
        url: `https://localhost:44341/api/ListaUsuarios`,
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
            type: DASHBOARD_UPDATE_PROFILE_ITEMS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_UPDATE_PROFILE_ITEMS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateProfileItemsError() {
  return {
    type: DASHBOARD_UPDATE_PROFILE_ITEMS_DISMISS_ERROR,
  };
}

export function useUpdateProfileItems() {
  const dispatch = useDispatch();

  const { updateProfileItemsPending, updateProfileItemsError } = useSelector(
    state => ({
      updateProfileItemsPending: state.dashboard.updateProfileItemsPending,
      updateProfileItemsError: state.dashboard.updateProfileItemsError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateProfileItems(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateProfileItemsError());
  }, [dispatch]);

  return {
    updateProfileItems: boundAction,
    updateProfileItemsPending,
    updateProfileItemsError,
    dismissUpdateProfileItemsError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_PROFILE_ITEMS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateProfileItemsPending: true,
        updateProfileItemsError: null,
      };

    case DASHBOARD_UPDATE_PROFILE_ITEMS_SUCCESS:
      // The request is success
      return {
        ...state,
        updateProfileItemsPending: false,
        updateProfileItemsError: null,
      };

    case DASHBOARD_UPDATE_PROFILE_ITEMS_FAILURE:
      // The request is failed
      return {
        ...state,
        updateProfileItemsPending: false,
        updateProfileItemsError: action.data.error,
      };

    case DASHBOARD_UPDATE_PROFILE_ITEMS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateProfileItemsError: null,
      };

    default:
      return state;
  }
}
