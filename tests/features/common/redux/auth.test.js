import {
  COMMON_AUTH,
} from '../../../../src/features/common/redux/constants';

import {
  auth,
  reducer,
} from '../../../../src/features/common/redux/auth';

describe('common/redux/auth', () => {
  it('returns correct action by auth', () => {
    expect(auth()).toHaveProperty('type', COMMON_AUTH);
  });

  it('handles action type COMMON_AUTH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_AUTH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
