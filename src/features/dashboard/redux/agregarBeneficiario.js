import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DASHBOARD_AGREGAR_BENEFICIARIO,
} from './constants';

export function agregarBeneficiario(data) {
  return {
    type: DASHBOARD_AGREGAR_BENEFICIARIO,
    data
  };
}

export function useAgregarBeneficiario() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(agregarBeneficiario(...params)), [dispatch]);
  return { agregarBeneficiario: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_AGREGAR_BENEFICIARIO:
      return {
        ...state,
        beneficiarios: [
          ...state.beneficiarios,
          { 
            ...action.data,
            pctAsignado: parseFloat(action.data.pctAsignado),
          }
        ],
        beneficiariosPctAsignado: [...state.beneficiarios, action.data].reduce((a, b) => a + parseFloat(b.pctAsignado), 0)
      };

    default:
      return state;
  }
}
