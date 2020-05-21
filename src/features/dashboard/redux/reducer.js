// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as fetchProductosReducer } from './fetchProductos';
import { reducer as fetchAseguradorasReducer } from './fetchAseguradoras';
import { reducer as fetchProductosBrokfyReducer } from './fetchProductosBrokfy';
import { reducer as updateProductoReducer } from './updateProducto';
import { reducer as insertProductoReducer } from './insertProducto';
import { reducer as deleteProductoReducer } from './deleteProducto';
import { reducer as deleteAseguradoraReducer } from './deleteAseguradora';
import { reducer as insertAseguradoraReducer } from './insertAseguradora';
import { reducer as updateAseguradoraReducer } from './updateAseguradora';
import { reducer as fetchAprobacionesReducer } from './fetchAprobaciones';
import { reducer as insertAprobacionReducer } from './insertAprobacion';
import { reducer as deleteAprobacionReducer } from './deleteAprobacion';
import { reducer as updateAprobacionReducer } from './updateAprobacion';
import { reducer as fetchTipoPolizasReducer } from './fetchTipoPolizas';
import { reducer as fetchCartasNombramientoReducer } from './fetchCartasNombramiento';
import { reducer as fetchPolizasAutoReducer } from './fetchPolizasAuto';
import { reducer as insertPolizasAutoReducer } from './insertPolizasAuto';
import { reducer as updatePolizasAutoReducer } from './updatePolizasAuto';
import { reducer as deletePolizasAutoReducer } from './deletePolizasAuto';
import { reducer as fetchCartaNombramientoReducer } from './fetchCartaNombramiento';
import { reducer as fetchPolizaPagoReducer } from './fetchPolizaPago';
import { reducer as fetchDropdownAseguradoraReducer } from './fetchDropdownAseguradora';
import { reducer as fetchDropdownTipoPolizaReducer } from './fetchDropdownTipoPoliza';
import { reducer as fetchDropdownProductoReducer } from './fetchDropdownProducto';
import { reducer as fetchComisionesReducer } from './fetchComisiones';
import { reducer as updateComisionesReducer } from './updateComisiones';
import { reducer as fetchDetallePolizaReducer } from './fetchDetallePoliza';
import { reducer as fetchPolizasReducer } from './fetchPolizas';
import { reducer as changePolizaReducer } from './changePoliza';
import { reducer as insertPagosReducer } from './insertPagos';
import { reducer as fetchPolizasPorConfirmarReducer } from './fetchPolizasPorConfirmar';
import { reducer as fetchPolizaPorConfirmarReducer } from './fetchPolizaPorConfirmar';
import { reducer as fetchValorComisionReducer } from './fetchValorComision';

const reducers = [
  fetchProductosReducer,
  fetchAseguradorasReducer,
  fetchProductosBrokfyReducer,
  updateProductoReducer,
  insertProductoReducer,
  deleteProductoReducer,
  deleteAseguradoraReducer,
  insertAseguradoraReducer,
  updateAseguradoraReducer,
  fetchAprobacionesReducer,
  insertAprobacionReducer,
  deleteAprobacionReducer,
  updateAprobacionReducer,
  fetchTipoPolizasReducer,
  fetchCartasNombramientoReducer,
  fetchPolizasAutoReducer,
  insertPolizasAutoReducer,
  updatePolizasAutoReducer,
  deletePolizasAutoReducer,
  fetchCartaNombramientoReducer,
  fetchPolizaPagoReducer,
  fetchDropdownAseguradoraReducer,
  fetchDropdownTipoPolizaReducer,
  fetchDropdownProductoReducer,
  fetchComisionesReducer,
  updateComisionesReducer,
  fetchDetallePolizaReducer,
  fetchPolizasReducer,
  changePolizaReducer,
  insertPagosReducer,
  fetchPolizasPorConfirmarReducer,
  fetchPolizaPorConfirmarReducer,
  fetchValorComisionReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
