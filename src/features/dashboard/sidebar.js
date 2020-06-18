import React, { useState, useEffect } from 'react';
import NavLink from './navlink';
import logo from '../../images/logo.png';
import { useIsAuthenticated, useGetToken } from '../common/redux/hooks';
import { useTipoPoliza } from './hooks';
import { DashboardOutlined, AccountCircleOutlined, MobileFriendly, PolicyOutlined, AccountBalanceOutlined, VerifiedUserOutlined, MonetizationOnOutlined, RoomServiceOutlined, ReportProblemOutlined, InsertChartOutlined } from '@material-ui/icons';
import { useFetchListadoReportes } from './redux/fetchListadoReportes';

const Sidebar = () => {
  const { isAuthenticated } = useIsAuthenticated();
  const [menu, setMenu] = useState([]);
  const [tipoPoliza, TipoPolizaView, setInitialValue, options] = useTipoPoliza();
  const { listadoReportes, fetchListadoReportes, fetchListadoReportesPending } = useFetchListadoReportes();
  const { auth } = useGetToken();  
  
  useEffect(() => {
    if( !auth || !auth.tokenFirebase || auth.tokenFirebase === "" ) return;
    fetchListadoReportes(auth.tokenFirebase);
  }, [fetchListadoReportes, auth]);

  useEffect(() => {
    setMenu([
      { icon: DashboardOutlined, to: "/", label: "Dashboard", protected: false, open: false, active: false },
      { icon: AccountCircleOutlined, to: "/clientes", label: "Clientes", protected: true, open: false, active: false },
      { icon: MobileFriendly, to: "/polizas/todas/aprobaciones", label: "Aprobaciones", protected: true, childrenRoutes:
        [
          { to: "/polizas/todas/aprobaciones", label: "Aprobar" },
          { to: "/polizas/todas/confirmaciones", label: "Confirmar" },
        ]
      },
      {
        icon: VerifiedUserOutlined, to: "/polizas/brokfy", label: "Polizas Brokfy", protected: true, childrenRoutes: [
          { to: "/polizas/brokfy/carta-nombramiento", label: "Carta Nombramiento" },
          ...options.filter(item => 
            item.tipo === "Auto" || 
            item.tipo === "Vida" || 
            item.tipo === "Moto"
          ).map(item => { return { to: `/polizas/brokfy/${item.tipo.toLowerCase()}`, label: item.tipo }; })
        ]
      },
      {
        icon: PolicyOutlined, to: "/polizas/otras", label: "Polizas Otras", protected: true, childrenRoutes: [
          ...options.filter(item => 
            item.tipo === "Auto" || 
            item.tipo === "Vida" ||
            item.tipo === "Moto"
          ).map(item => { return { to: `/polizas/otras/${item.tipo.toLowerCase()}`, label: item.tipo }; })
        ]
      },

      {
        icon: MonetizationOnOutlined, to: "/pagos", label: "Pagos", protected: true, childrenRoutes:
          [
            { to: "/pagos/registrar", label: "Registrar Pago" },
          ]
      },

      { icon: RoomServiceOutlined, to: "/atencion-clientes", label: "Atención Clientes", protected: true, open: false, active: false },
      { icon: ReportProblemOutlined, to: "/siniestros", label: "Siniestros", protected: true, open: false, active: false },
      { icon: InsertChartOutlined, to: "/reportes", label: "Reportes", protected: true, childrenRoutes: [
          ...listadoReportes.map(item => { return { to: item.path.toLowerCase(), label: item.nombre }; })
        ]
      },
      {
        icon: AccountBalanceOutlined, to: "/aseguradoras", label: "Aseguradoras", protected: true, childrenRoutes: [
          { to: "/aseguradoras", label: "Aseguradoras" },
          { to: "/aseguradoras/productos", label: "Productos" },
          { to: "/aseguradoras/comisiones", label: "Comisiones" },
        ]
      },
    ]);
  }, [options, listadoReportes]);

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
            menu
              .filter(item => !item.protected || isAuthenticated)
              .map(item => {
                const Icon = item.icon;
                return (
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