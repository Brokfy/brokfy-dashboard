// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
} from './';
import Index from './pages';
import Aseguradoras from './pages/aseguradoras/aseguradoras';
import CatalogoProductos from './pages/aseguradoras/catalogo_productos';
import AtencionClientes from './pages/atencion_clientes';
import Clientes from './pages/clientes/';
import Pagos from './pages/pagos';
import Polizas from './pages/polizas/polizas';
import Reportes from './pages/reportes';
import Siniestros from './pages/siniestros';
import Aprobar from './pages/polizas/aprobar';
import Confirmar from './pages/polizas/confirmar';
import RegistrarPago from './pages/pagos/registrarPago';
import Comisiones from './pages/aseguradoras/comisiones';

export default {
  path: 'dashboard',
  childRoutes: [
    { path: '/', component: Index, isIndex: true },
    { path: '/aseguradoras', component: Aseguradoras },
    { path: '/aseguradoras/productos', component: CatalogoProductos },
    { path: '/aseguradoras/comisiones', component: Comisiones },
    { path: '/atencion-clientes', component: AtencionClientes },
    { path: '/clientes/', component: Clientes },
    { path: '/pagos', component: Pagos },
    { path: '/polizas', component: Polizas },
    { path: '/polizas/:propia/:tipo', component: Polizas },
    { path: '/polizas/:propia/:tipo/aprobar', component: Aprobar },
    { path: '/polizas/:propia/:tipo/confirmar', component: Confirmar },
    { path: '/reportes', component: Reportes },
    { path: '/siniestros', component: Siniestros },
    { path: '/pagos/registrar', component: RegistrarPago },
  ],
};
