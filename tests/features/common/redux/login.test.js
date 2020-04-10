import {
  COMMON_LOGIN,
} from '../../../../src/features/common/redux/constants';

import {
  login,
  reducer,
} from '../../../../src/features/common/redux/login';

describe('common/redux/login', () => {
  it('returns correct action by login', () => {
    expect(login()).toHaveProperty('type', COMMON_LOGIN);
  });

  it('handles action type COMMON_LOGIN correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_LOGIN }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
