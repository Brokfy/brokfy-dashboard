import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  DASHBOARD_UPDATE_FILTROS_REPORTES,
} from './constants';

export function updateFiltrosReportes(args) {
  return {
    type: DASHBOARD_UPDATE_FILTROS_REPORTES,
    data: args
  };
}

export function useUpdateFiltrosReportes() {
  const filtrosReportes = useSelector(state => state.dashboard.filtrosReportes);
  const dispatch = useDispatch();
  const boundAction = useCallback((...params) => dispatch(updateFiltrosReportes(...params)), [dispatch]);
  return { 
    filtrosReportes,
    updateFiltrosReportes: boundAction 
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case DASHBOARD_UPDATE_FILTROS_REPORTES:
      return {
        ...state,
        filtrosReportes: {
          ...state.filtrosReportes,
          ...action.data
        }
      };

    default:
      return state;
  }
}
