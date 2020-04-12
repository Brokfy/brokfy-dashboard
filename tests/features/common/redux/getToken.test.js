import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COMMON_GET_TOKEN_BEGIN,
  COMMON_GET_TOKEN_SUCCESS,
  COMMON_GET_TOKEN_FAILURE,
  COMMON_GET_TOKEN_DISMISS_ERROR,
} from '../../../../src/features/common/redux/constants';

import {
  getToken,
  dismissGetTokenError,
  reducer,
} from '../../../../src/features/common/redux/getToken';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('common/redux/getToken', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getToken succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getToken())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_GET_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_GET_TOKEN_SUCCESS);
      });
  });

  it('dispatches failure action when getToken fails', () => {
    const store = mockStore({});

    return store.dispatch(getToken({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COMMON_GET_TOKEN_BEGIN);
        expect(actions[1]).toHaveProperty('type', COMMON_GET_TOKEN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetTokenError', () => {
    const expectedAction = {
      type: COMMON_GET_TOKEN_DISMISS_ERROR,
    };
    expect(dismissGetTokenError()).toEqual(expectedAction);
  });

  it('handles action type COMMON_GET_TOKEN_BEGIN correctly', () => {
    const prevState = { getTokenPending: false };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TOKEN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getTokenPending).toBe(true);
  });

  it('handles action type COMMON_GET_TOKEN_SUCCESS correctly', () => {
    const prevState = { getTokenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TOKEN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getTokenPending).toBe(false);
  });

  it('handles action type COMMON_GET_TOKEN_FAILURE correctly', () => {
    const prevState = { getTokenPending: true };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TOKEN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getTokenPending).toBe(false);
    expect(state.getTokenError).toEqual(expect.anything());
  });

  it('handles action type COMMON_GET_TOKEN_DISMISS_ERROR correctly', () => {
    const prevState = { getTokenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COMMON_GET_TOKEN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getTokenError).toBe(null);
  });
});

