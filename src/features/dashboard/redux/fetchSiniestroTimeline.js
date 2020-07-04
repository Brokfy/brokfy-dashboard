import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import {
  DASHBOARD_FETCH_SINIESTRO_TIMELINE_BEGIN,
  DASHBOARD_FETCH_SINIESTRO_TIMELINE_SUCCESS,
  DASHBOARD_FETCH_SINIESTRO_TIMELINE_FAILURE,
  DASHBOARD_FETCH_SINIESTRO_TIMELINE_DISMISS_ERROR,
} from './constants';

export function fetchSiniestroTimeline(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: DASHBOARD_FETCH_SINIESTRO_TIMELINE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: DASHBOARD_FETCH_SINIESTRO_TIMELINE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: DASHBOARD_FETCH_SINIESTRO_TIMELINE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissFetchSiniestroTimelineError() {
  return {
    type: DASHBOARD_FETCH_SINIESTRO_TIMELINE_DISMISS_ERROR,
  };
}

export function useFetchSiniestroTimeline() {
  const dispatch = useDispatch();

  const { fetchSiniestroTimelinePending, fetchSiniestroTimelineError } = useSelector(
    state => ({
      fetchSiniestroTimelinePending: state.dashboard.fetchSiniestroTimelinePending,
      fetchSiniestroTimelineError: state.dashboard.fetchSiniestroTimelineError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(fetchSiniestroTimeline(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissFetchSiniestroTimelineError());
  }, [dispatch]);

  return {
    fetchSiniestroTimeline: boundAction,
    fetchSiniestroTimelinePending,
    fetchSiniestroTimelineError,
    dismissFetchSiniestroTimelineError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_FETCH_SINIESTRO_TIMELINE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        fetchSiniestroTimelinePending: true,
        fetchSiniestroTimelineError: null,
      };

    case DASHBOARD_FETCH_SINIESTRO_TIMELINE_SUCCESS:
      // The request is success
      return {
        ...state,
        fetchSiniestroTimelinePending: false,
        fetchSiniestroTimelineError: null,
      };

    case DASHBOARD_FETCH_SINIESTRO_TIMELINE_FAILURE:
      // The request is failed
      return {
        ...state,
        fetchSiniestroTimelinePending: false,
        fetchSiniestroTimelineError: action.data.error,
      };

    case DASHBOARD_FETCH_SINIESTRO_TIMELINE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        fetchSiniestroTimelineError: null,
      };

    default:
      return state;
  }
}
