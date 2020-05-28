import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  DASHBOARD_UPDATE_DETALLE_CLIENTE_SUCCESS,
} from './constants';

export function fetchDropdownParentescos() {
  return {
    type: DASHBOARD_UPDATE_DETALLE_CLIENTE_SUCCESS,
  };
}

export function useFetchDropdownParentescos() {
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(fetchDropdownParentescos(...params)), [dispatch]);
  return { fetchDropdownParentescos: boundAction };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_DETALLE_CLIENTE_SUCCESS:
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          detalleUsuario: {
            ...state.dashboard.detalleUsuario,

          }
        }
      };

    default:
      return state;
  }
}