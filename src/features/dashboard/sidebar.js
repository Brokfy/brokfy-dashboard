import React, { useState, useEffect } from 'react';
import NavLink from './navlink';
import logo from '../../images/logo.png';
import { useIsAuthenticated, useGetToken } from '../common/redux/hooks';
import { useTipoPoliza } from './hooks';
import { DashboardOutlined, AccountCircleOutlined, MobileFriendly, PolicyOutlined, AccountBalanceOutlined, VerifiedUserOutlined, MonetizationOnOutlined, RoomServiceOutlined, ReportProblemOutlined, InsertChartOutlined } from '@material-ui/icons';
import { useFetchListadoReportes } from './redux/fetchListadoReportes';
import { useFetchRestricciones } from './redux/fetchRestricciones';

const Sidebar = () => {
  const { isAuthenticated } = useIsAuthenticated();
  const [menu, setMenu] = useState([]);
  const [tipoPoliza, TipoPolizaView, setInitialValue, options] = useTipoPoliza();
  const { listadoReportes, fetchListadoReportes, fetchListadoReportesPending } = useFetchListadoReportes();
  const { restricciones, fetchRestricciones, fetchRestriccionesPending } = useFetchRestricciones();
  const { auth } = useGetToken();

  useEffect(() => {
    if (!auth || !auth.tokenFirebase || auth.tokenFirebase === "") return;
    fetchRestricciones({ dato: auth.tokenFirebase, campo: "token", token: auth.tokenFirebase });
    fetchListadoReportes(auth.tokenFirebase);
  }, [fetchListadoReportes, fetchRestricciones, auth]);

  useEffect(() => {
    setMenu([
      { id: 9, icon: DashboardOutlined, to: "/", label: "Dashboard", protected: false, open: false, active: false },
      { id: 10, icon: AccountCircleOutlined, to: "/clientes", label: "Clientes", protected: true, open: false, active: false },
      {
        id: 11, icon: MobileFriendly, to: "/polizas/todas/aprobaciones", label: "Aprobaciones", protected: true, childrenRoutes:
          [
            { id: 57, to: "/polizas/todas/aprobaciones", label: "Aprobar" },
            { id: 58, to: "/polizas/todas/confirmaciones", label: "Confirmar" },
          ]
      },
      {
        id: 12,
        icon: VerifiedUserOutlined, to: "/polizas/brokfy", label: "Polizas Brokfy", protected: true, childrenRoutes: [
          { id: 59, to: "/polizas/brokfy/carta-nombramiento", label: "Carta Nombramiento" },
          { id: 60, to: `/polizas/brokfy/auto`, label: `Auto` },
          { id: 61, to: `/polizas/brokfy/vida`, label: `Vida` },
          { id: 62, to: `/polizas/brokfy/moto`, label: `Moto` }
        ]
      },
      {
        id: 13,
        icon: PolicyOutlined, to: "/polizas/otras", label: "Polizas Otras", protected: true, childrenRoutes: [
          { id: 63, to: `/polizas/otras/auto`, label: `Auto` },
          { id: 64, to: `/polizas/otras/vida`, label: `Vida` },
          { id: 65, to: `/polizas/otras/moto`, label: `Moto` }
        ]
      },

      {
        id: 14,
        icon: MonetizationOnOutlined, to: "/pagos", label: "Pagos", protected: true, childrenRoutes:
          [
            { id: 66, to: "/pagos/registrar", label: "Registrar Pago" },
          ]
      },

      { id: 15, icon: RoomServiceOutlined, to: "/atencion-clientes", label: "Atención Clientes", protected: true, open: false, active: false },
      { id: 76, icon: ReportProblemOutlined, to: "/siniestros", label: "Siniestros", protected: true, open: false, active: false },
      {
        id: 17,
        icon: InsertChartOutlined, to: "/reportes", label: "Reportes", protected: true, childrenRoutes: [
          { id: 67, to: "/reportes/facturacion-total", label: "Facturación Total" },
          { id: 68, to: "/reportes/comisiones-recibidas", label: "Comisiones Recibidas" },
          { id: 69, to: "/reportes/comisiones-pendientes", label: "Comisiones Pendientes" },
          { id: 70, to: "/reportes/polizas-por-vencer", label: "Pólizas por Vencer" },
          { id: 71, to: "/reportes/historico-comisiones", label: "Histórico Comisiones" },
          { id: 72, to: "/reportes/polizas-propias-vs-otras", label: "Pólizas Propias vs Otras" },
        ]
      },
      {
        id: 16,
        icon: AccountBalanceOutlined, to: "/aseguradoras", label: "Aseguradoras", protected: true, childrenRoutes: [
          { id: 73, to: "/aseguradoras", label: "Aseguradoras" },
          { id: 74, to: "/aseguradoras/productos", label: "Productos" },
          { id: 75, to: "/aseguradoras/comisiones", label: "Comisiones" },
        ]
      },
      { id: 76, icon: ReportProblemOutlined, to: "/permisos", label: "Permisos", protected: true, open: false, active: false },
    ]);
  }, [options, listadoReportes]);


  console.log(restricciones)

  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <img src={logo} className="img-fluid" alt="Brokfy" />
            </div>
            <div className="logo-element">
              BFY
            </div>
          </li>

          {
            !restricciones ? null :
              menu
                .filter(item => !item.protected || isAuthenticated)
                .map(item => {
                  const Icon = item.icon;
                  return restricciones.filter(res => res.idMenu === item.id).length > 0 ? null : (
                    <NavLink key={item.label} menu={menu} setMenu={setMenu} data={item}>
                      <Icon /> <span className="nav-label">{item.label}</span>
                    </NavLink>
                  );
                })
          }
        </ul>

      </div>
    </nav>
  );
}

export default Sidebar;