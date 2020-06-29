// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
} from './';
import Dashboard from './pages/dashboard/index';
import Aseguradoras from './pages/aseguradoras/aseguradoras';
import CatalogoProductos from './pages/aseguradoras/catalogo_productos';
import AtencionClientes from './pages/atencion_clientes';
import Clientes from './pages/clientes/';
import Permisos from './pages/permisos';
import Pagos from './pages/pagos';
import Polizas from './pages/polizas/polizas';
import Reportes from './pages/reportes/reportes';
import Siniestros from './pages/siniestros';
import Aprobar from './pages/polizas/aprobar';
import Confirmar from './pages/polizas/confirmar';
import RegistrarPago from './pages/pagos/registrarPago';
import Comisiones from './pages/aseguradoras/comisiones';
import Wrapper from '../../common/wrapper';

export default {
  path: 'dashboard',
  childRoutes: [
    { path: '/', component: Wrapper(Dashboard), isIndex: true },
    { path: '/aseguradoras', component: Wrapper(Aseguradoras) },
    { path: '/aseguradoras/productos', component: Wrapper(CatalogoProductos) },
    { path: '/aseguradoras/comisiones', component: Wrapper(Comisiones) },
    { path: '/atencion-clientes', component: Wrapper(AtencionClientes) },
    { path: '/clientes/', component: Wrapper(Clientes) },
    { path: '/pagos', component: Wrapper(Pagos) },
    { path: '/polizas', component: Wrapper(Polizas) },
    { path: '/polizas/:propia/:tipo', component: Wrapper(Polizas) },
    { path: '/polizas/:propia/:tipo/aprobar', component: Wrapper(Aprobar) },
    { path: '/polizas/:propia/:tipo/confirmar', component: Wrapper(Confirmar) },
    { path: '/reportes/:reporte', component: Reportes },
    { path: '/siniestros', component: Wrapper(Siniestros) },
    { path: '/pagos/registrar', component: Wrapper(RegistrarPago) },
    { path: '/permisos', component: Wrapper(Permisos) },
  ],
};
