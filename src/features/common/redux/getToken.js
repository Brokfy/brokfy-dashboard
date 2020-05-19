import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  COMMON_GET_TOKEN_BEGIN,
  COMMON_GET_TOKEN_SUCCESS,
  COMMON_GET_TOKEN_FAILURE,
  COMMON_GET_TOKEN_DISMISS_ERROR,
} from './constants';

export function getToken(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: COMMON_GET_TOKEN_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      var formData = new FormData();

      for (var k in args) {
          formData.append(k, args[k]);
      }
      
      const doRequest = axios.post('https://ec2-3-136-94-107.us-east-2.compute.amazonaws.com/api/security/oauth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: "frontendapp",
          password: "12345"
        }
      })
      doRequest.then(
        (res) => {
          dispatch({
            type: COMMON_GET_TOKEN_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: COMMON_GET_TOKEN_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissGetTokenError() {
  return {
    type: COMMON_GET_TOKEN_DISMISS_ERROR,
  };
}

export function useGetToken() {
  const auth = useSelector(state => state.common.auth);

  const dispatch = useDispatch();

  const { getTokenPending, getTokenError } = useSelector(
    state => ({
      getTokenPending: state.common.getTokenPending,
      getTokenError: state.common.getTokenError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(getToken(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissGetTokenError());
  }, [dispatch]);

  return {
    auth: auth,
    getToken: boundAction,
    getTokenPending,
    getTokenError,
    dismissGetTokenError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_GET_TOKEN_BEGIN:
      // Just after a request is sent
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("auth", null);
      return {
        ...state,
        isAuthenticated: false,
        getTokenPending: true,
        getTokenError: null,
      };

    case COMMON_GET_TOKEN_SUCCESS:
      // The request is success
      localStorage.setItem("isAuthenticated", true);
      localStorage.setItem("auth", JSON.stringify(action.data.data));
      return {
        ...state,
        isAuthenticated: true,
        auth: action.data.data,
        getTokenPending: false,
        getTokenError: null,
      };

    case COMMON_GET_TOKEN_FAILURE:
      // The request is failed
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("auth", null);
      return {
        ...state,
        isAuthenticated: false,
        getTokenPending: false,
        getTokenError: action.data.error.response.data.error_description,
      };

    case COMMON_GET_TOKEN_DISMISS_ERROR:
      // Dismiss the request failure error
      localStorage.setItem("isAuthenticated", false);
      localStorage.setItem("auth", null);
      return {
        ...state,
        isAuthenticated: false,
        getTokenError: null,
      };

    default:
      return state;
  }
}
