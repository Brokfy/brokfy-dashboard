import React from 'react';
import NavLink from './navlink';
import logo from '../../images/logo.png';
import { useIsAuthenticated } from '../common/redux/hooks';

const Sidebar = () => {
  const { isAuthenticated } = useIsAuthenticated();

  var links = [
    { icon: "fa fa-th-large", to: "/", label: "Dashboard", protected: false },
    { icon: "fa fa-th-large", to: "/clientes", label: "Clientes", protected: true },
    { icon: "fa fa-th-large", to: "/polizas", label: "Polizas", protected: true },
    { icon: "fa fa-th-large", to: "/pagos", label: "Pagos", protected: true },
    { icon: "fa fa-th-large", to: "/atencion-clientes", label: "Atención Clientes", protected: true },
    { icon: "fa fa-th-large", to: "/siniestros", label: "Siniestros", protected: true },
    { icon: "fa fa-th-large", to: "/reportes", label: "Reportes", protected: true },
    { icon: "fa fa-th-large", to: "/aseguradoras", label: "Aseguradoras", protected: true },
  ];

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
            links
              .filter(item => !item.protected || isAuthenticated)
              .map( item => {
                return (
                  <NavLink key={item.label} to={item.to}>
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