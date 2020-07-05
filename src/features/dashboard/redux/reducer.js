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
import { reducer as fetchListadoUsuarioReducer } from './fetchListadoUsuario';
import { reducer as fetchDetalleUsuarioReducer } from './fetchDetalleUsuario';
import { reducer as fetchPolizasPorConfirmarReducer } from './fetchPolizasPorConfirmar';
import { reducer as fetchPolizaPorConfirmarReducer } from './fetchPolizaPorConfirmar';
import { reducer as fetchValorComisionReducer } from './fetchValorComision';
import { reducer as confirmarPolizaReducer } from './confirmarPoliza';
import { reducer as fetchPolizasVidaReducer } from './fetchPolizasVida';
import { reducer as updatePolizasVidaReducer } from './updatePolizasVida';
import { reducer as insertPolizasVidaReducer } from './insertPolizasVida';
import { reducer as deletePolizasVidaReducer } from './deletePolizasVida';
import { reducer as fetchDropdownOcupacionesReducer } from './fetchDropdownOcupaciones';
import { reducer as insertPolizasMotoReducer } from './insertPolizasMoto';
import { reducer as fetchPolizasMotoReducer } from './fetchPolizasMoto';
import { reducer as updatePolizasMotoReducer } from './updatePolizasMoto';
import { reducer as deletePolizasMotoReducer } from './deletePolizasMoto';
import { reducer as cancelarPolizaReducer } from './cancelarPoliza';
import { reducer as cambioAgenteReducer } from './cambioAgente';
import { reducer as dashboardConsultaPolizaReducer } from './dashboardConsultaPoliza';
import { reducer as dashboardPolizaPorVencerReducer } from './dashboardPolizaPorVencer';
import { reducer as dashboardMisClientesReducer } from './dashboardMisClientes';
import { reducer as dashboardDescargasReducer } from './dashboardDescargas';
import { reducer as dashboardGraficoReducer } from './dashboardGrafico';
import { reducer as getDashboardInitReducer } from './getDashboardInit';
import { reducer as fetchDropdownParentescoReducer } from './fetchDropdownParentesco';
import { reducer as agregarBeneficiarioReducer } from './agregarBeneficiario';
import { reducer as eliminarBeneficiarioReducer } from './eliminarBeneficiario';
import { reducer as resetBeneficiariosReducer } from './resetBeneficiarios';
import { reducer as fetchListadoReportesReducer } from './fetchListadoReportes';
import { reducer as updateFiltrosReportesReducer } from './updateFiltrosReportes';
import { reducer as fetchDataReporteFacturacionTotalReducer } from './fetchDataReporteFacturacionTotal';
import { reducer as fetchDataReporteComisionesRecibidasReducer } from './fetchDataReporteComisionesRecibidas';
import { reducer as fetchDataReporteComisionesPendientesReducer } from './fetchDataReporteComisionesPendientes';
import { reducer as fetchDataReportePolizasPorVencerReducer } from './fetchDataReportePolizasPorVencer';
import { reducer as fetchDataReporteHistoricoComisionesReducer } from './fetchDataReporteHistoricoComisiones';
import { reducer as fetchDataReportePolizasBrokfyVsOtrasReducer } from './fetchDataReportePolizasBrokfyVsOtras';
import { reducer as fetchRestriccionesReducer } from './fetchRestricciones';
import { reducer as fetchMenuReducer } from './fetchMenu';
import { reducer as updateRestriccionesReducer } from './updateRestricciones';
import { reducer as fetchRestriccionesEdicionReducer } from './fetchRestriccionesEdicion';
import { reducer as updateProfileItemsReducer } from './updateProfileItems';
import { reducer as fetchEstadosSiniestroReducer } from './fetchEstadosSiniestro';
import { reducer as fetchSiniestrosReducer } from './fetchSiniestros';
import { reducer as fetchSiniestroTimelineReducer } from './fetchSiniestroTimeline';
import { reducer as updateEstadosSiniestroReducer } from './updateEstadosSiniestro';
import { reducer as updateComentariosSiniestroReducer } from './updateComentariosSiniestro';

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
  fetchListadoUsuarioReducer,
  fetchDetalleUsuarioReducer,
  fetchPolizasPorConfirmarReducer,
  fetchPolizaPorConfirmarReducer,
  fetchValorComisionReducer,
  confirmarPolizaReducer,
  fetchPolizasVidaReducer,
  updatePolizasVidaReducer,
  insertPolizasVidaReducer,
  deletePolizasVidaReducer,
  fetchDropdownOcupacionesReducer,
  insertPolizasMotoReducer,
  fetchPolizasMotoReducer,
  updatePolizasMotoReducer,
  deletePolizasMotoReducer,
  cancelarPolizaReducer,
  cambioAgenteReducer,
  dashboardConsultaPolizaReducer,
  dashboardPolizaPorVencerReducer,
  dashboardMisClientesReducer,
  dashboardDescargasReducer,
  dashboardGraficoReducer,
  getDashboardInitReducer,
  fetchDropdownParentescoReducer,
  agregarBeneficiarioReducer,
  eliminarBeneficiarioReducer,
  resetBeneficiariosReducer,
  fetchListadoReportesReducer,
  updateFiltrosReportesReducer,
  fetchDataReporteFacturacionTotalReducer,
  fetchDataReporteComisionesRecibidasReducer,
  fetchDataReporteComisionesPendientesReducer,
  fetchDataReportePolizasPorVencerReducer,
  fetchDataReporteHistoricoComisionesReducer,
  fetchDataReportePolizasBrokfyVsOtrasReducer,
  fetchRestriccionesReducer,
  fetchMenuReducer,
  updateRestriccionesReducer,
  fetchRestriccionesEdicionReducer,
  updateProfileItemsReducer,
  fetchEstadosSiniestroReducer,
  fetchSiniestrosReducer,
  fetchSiniestroTimelineReducer,
  updateEstadosSiniestroReducer,
  updateComentariosSiniestroReducer,
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
