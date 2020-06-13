import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DASHBOARD_CHANGE_POLIZA,
} from './constants';

export function changePoliza(args = {}) {
  return {
    type: DASHBOARD_CHANGE_POLIZA,
    data: args
  };
}

export function useChangePoliza() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(changePoliza(...params)), [dispatch]);
  return { changePoliza: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_CHANGE_POLIZA:
      return {
        ...state,
        polizas: [
          ...state.polizas.map(item => {
            return item.idPolizaComision === action.data.idPolizaComision ? {
              ...item,
              montoPago: action.data.valor
            } : item;
          })
        ],
      };

    default:
      return state;
  }
}
