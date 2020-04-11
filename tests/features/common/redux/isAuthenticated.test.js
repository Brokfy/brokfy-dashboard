import {
  COMMON_IS_AUTHENTICATED,
} from '../../../../src/features/common/redux/constants';

import {
  isAuthenticated,
  reducer,
} from '../../../../src/features/common/redux/isAuthenticated';

describe('common/redux/isAuthenticated', () => {
  it('returns correct action by isAuthenticated', () => {
    expect(isAuthenticated()).toHaveProperty('type', COMMON_IS_AUTHENTICATED);
  });

  it('handles action type COMMON_IS_AUTHENTICATED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_IS_AUTHENTICATED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
