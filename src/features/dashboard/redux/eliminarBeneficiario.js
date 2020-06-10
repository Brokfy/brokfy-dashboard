import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DASHBOARD_ELIMINAR_BENEFICIARIO,
} from './constants';

export function eliminarBeneficiario(data) {
  return {
    type: DASHBOARD_ELIMINAR_BENEFICIARIO,
    data
  };
}

export function useEliminarBeneficiario() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(eliminarBeneficiario(...params)), [dispatch]);
  return { eliminarBeneficiario: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_ELIMINAR_BENEFICIARIO:
      return {
        ...state,
        beneficiarios: state.beneficiarios.filter(i => i.curp !== action.data),
        beneficiariosPctAsignado: state.beneficiarios.filter(i => i.curp !== action.data).reduce((a, b) => a + parseFloat(b.pctAsignado), 0)
      };

    default:
      return state;
  }
}
