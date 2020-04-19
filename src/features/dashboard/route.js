// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
} from './';
import Index from './pages';
import Aseguradoras from './pages/aseguradoras';
import AtencionClientes from './pages/atencion_clientes';
import Clientes from './pages/clientes';
import Pagos from './pages/pagos';
import Polizas from './pages/polizas';
import Reportes from './pages/reportes';
import Siniestros from './pages/siniestros';

export default {
  path: 'dashboard',
  childRoutes: [
    { path: '/', component: Index, isIndex: true },
    { path: '/aseguradoras', component: Aseguradoras },
    { path: '/atencion-clientes', component: AtencionClientes },
    { path: '/clientes', component: Clientes },
    { path: '/pagos', component: Pagos },
    { path: '/polizas', component: Polizas },
    { path: '/polizas/:tipo', component: Polizas },
    { path: '/reportes', component: Reportes },
    { path: '/siniestros', component: Siniestros },
  ],
};
