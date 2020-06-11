// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  fetchProductosPending: false,
  fetchProductosError: null,
  fetchAseguradorasPending: false,
  fetchAseguradorasError: null,
  fetchProductosBrokfyPending: false,
  fetchProductosBrokfyError: null,
  updateProductoNotify: false,
  updateProductoPending: false,
  updateProductoError: null,
  insertProductoNotify: false,
  insertProductoPending: false,
  insertProductoError: null,
  deleteProductoNotify: false,
  deleteProductoPending: false,
  deleteProductoError: null,
  deleteAseguradoraNotify: false,
  deleteAseguradoraPending: false,
  deleteAseguradoraError: null,
  insertAseguradoraNotify: false,
  insertAseguradoraPending: false,
  insertAseguradoraError: null,
  updateAseguradoraNotify: false,
  updateAseguradoraPending: false,
  updateAseguradoraError: null,
  fetchAprobacionesPending: false,
  fetchAprobacionesError: null,
  insertAprobacionNotify: false,
  insertAprobacionPending: false,
  insertAprobacionError: null,
  deleteAprobacionNotify: false,
  deleteAprobacionPending: false,
  deleteAprobacionError: null,
  updateAprobacionNotify: false,
  updateAprobacionPending: false,
  updateAprobacionError: null,
  fetchTipoPolizasPending: false,
  fetchTipoPolizasError: null,
  fetchCartasNombramientoPending: false,
  fetchCartasNombramientoError: null,
  fetchPolizasAutoPending: false,
  fetchPolizasAutoError: null,
  insertPolizasNotify: false,
  insertPolizasAutoPending: false,
  insertPolizasAutoError: null,
  updatePolizasNotify: false,
  updatePolizasAutoPending: false,
  updatePolizasAutoError: null,
  deletePolizasNotify: false,
  deletePolizasAutoPending: false,
  deletePolizasAutoError: null,
  fetchCartaNombramientoPending: false,
  fetchCartaNombramientoError: null,
  fetchPolizaPagoPending: false,
  fetchPolizaPagoError: null,
  fetchDropdownAseguradoraPending: false,
  fetchDropdownAseguradoraError: null,
  fetchDropdownTipoPolizaPending: false,
  fetchDropdownTipoPolizaError: null,
  fetchDropdownProductoPending: false,
  fetchDropdownProductoError: null,
  fetchComisionesPending: false,
  fetchComisionesError: null,
  updateComisionesPending: false,
  updateComisionesError: null,
  fetchDetallePolizaPending: false,
  fetchDetallePolizaError: null,
  fetchPolizasPending: false,
  fetchPolizasError: null,
  insertPagosPending: false,
  insertPagosError: null,
  fetchListadoUsuarioPending: false,
  fetchListadoUsuarioError: null,
  fetchDetalleUsuarioPending: false,
  fetchDetalleUsuarioError: null,
  fetchPolizasPorConfirmarPending: false,
  fetchPolizasPorConfirmarError: null,
  fetchPolizaPorConfirmarPending: false,
  fetchPolizaPorConfirmarError: null,
  fetchValorComisionPending: false,
  fetchValorComisionError: null,
  confirmarPolizaPending: false,
  confirmarPolizaError: null,
  fetchPolizasVidaPending: false,
  fetchPolizasVidaError: null,
  updatePolizasVidaPending: false,
  updatePolizasVidaError: null,
  insertPolizasVidaPending: false,
  insertPolizasVidaError: null,
  deletePolizasVidaPending: false,
  deletePolizasVidaError: null,
  fetchDropdownOcupacionesPending: false,
  fetchDropdownOcupacionesError: null,
  insertPolizasMotoPending: false,
  insertPolizasMotoError: null,
  fetchPolizasMotoPending: false,
  fetchPolizasMotoError: null,
  updatePolizasMotoPending: false,
  updatePolizasMotoError: null,
  deletePolizasMotoPending: false,
  deletePolizasMotoError: null,
  cancelarPolizaPending: false,
  cancelarPolizaError: null,
  fetchDropdownParentescoPending: false,
  fetchDropdownParentescoError: null,
  cambioAgentePending: false,
  cambioAgenteError: null,
  dashboardConsultaPolizaPending: false,
  dashboardConsultaPolizaError: null,
  dashboardPolizaPorVencerPending: false,
  dashboardPolizaPorVencerError: null,
  dashboardMisClientesPending: false,
  dashboardMisClientesError: null,
  dashboardDescargasPending: false,
  dashboardDescargasError: null,
  dashboardGraficoPending: false,
  dashboardGraficoError: null,
  getDashboardInitPending: false,
  getDashboardInitError: null,
  beneficiarios: [],
  beneficiariosPctAsignado: 0,
  dropdownParentesco: [],
  fetchListadoReportesPending: false,
  fetchListadoReportesError: null,
  listadoReportes: [],
  filtrosReportes: {
    fechaInicio: new Date().toISOString().substring(0,10),
    fechaFin: new Date().toISOString().substring(0,10),
    idAseguradora: 0,
    idTipoPoliza: 0,
  },
  fetchDataReporteFacturacionTotalPending: false,
  fetchDataReporteFacturacionTotalError: null
};

export default initialState;
