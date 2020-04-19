import React, { useState } from 'react';
import NavLink from './navlink';
import logo from '../../images/logo.png';
import { useIsAuthenticated } from '../common/redux/hooks';

const Sidebar = () => {
  const { isAuthenticated } = useIsAuthenticated();
  const [menu, setMenu] = useState([
    { icon: "fa fa-th-large", to: "/", label: "Dashboard", protected: false, open: false, active: false },
    { icon: "fa fa-th-large", to: "/clientes", label: "Clientes", protected: true, open: false, active: false },
    { icon: "fa fa-th-large", to: "/polizas", label: "Polizas", protected: true, childrenRoutes: [
      { to: "/polizas/autos", label: "Autos" },
      { to: "/polizas/motos", label: "Motos" }
    ] },
    { icon: "fa fa-th-large", to: "/pagos", label: "Pagos", protected: true, open: false, active: false },
    { icon: "fa fa-th-large", to: "/atencion-clientes", label: "Atención Clientes", protected: true, open: false, active: false },
    { icon: "fa fa-th-large", to: "/siniestros", label: "Siniestros", protected: true, open: false, active: false },
    { icon: "fa fa-th-large", to: "/reportes", label: "Reportes", protected: true, open: false, active: false },
    { icon: "fa fa-th-large", to: "/aseguradoras", label: "Aseguradoras", protected: true, open: false, active: false },
  ]);

  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <img src={logo} className="img-fluid" alt="Brokfy"/>
            </div>
            <div className="logo-element">
              BFY
            </div>
          </li>
          
          {
            menu
              .filter(item => !item.protected || isAuthenticated)
              .map( item => {
                return (
                  <NavLink key={item.label} menu={menu} setMenu={setMenu} data={item}>
                    <i className={item.icon}></i> <span className="nav-label">{item.label}</span>
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