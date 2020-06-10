import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DASHBOARD_RESET_BENEFICIARIOS,
} from './constants';

export function resetBeneficiarios() {
  return {
    type: DASHBOARD_RESET_BENEFICIARIOS,
  };
}

export function useResetBeneficiarios() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(resetBeneficiarios(...params)), [dispatch]);
  return { resetBeneficiarios: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_RESET_BENEFICIARIOS:
      return {
        ...state,
        beneficiarios: [],
        beneficiariosPctAsignado: 0
      };

    default:
      return state;
  }
}
