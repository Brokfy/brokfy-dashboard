import React from 'react';
import NavLink from './navlink';
import logo from '../../images/logo.png';

const Sidebar = () => {
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <img src={logo} className="img-fluid" />
            </div>
            <div className="logo-element">
              BFY
            </div>
          </li>
          <NavLink to="/">
            <i className="fa fa-th-large"></i> <span className="nav-label">Dashboard</span>
          </NavLink>

          <NavLink to="/clientes">
            <i className="fa fa-th-large"></i> <span className="nav-label">Clientes</span>
          </NavLink>

          <NavLink to="/polizas">
            <i className="fa fa-th-large"></i> <span className="nav-label">Polizas</span>
          </NavLink>

          <NavLink to="/pagos">
            <i className="fa fa-th-large"></i> <span className="nav-label">Pagos</span>
          </NavLink>

          <NavLink to="/atencion-clientes">
            <i className="fa fa-th-large"></i> <span className="nav-label">Atención Clientes</span>
          </NavLink>

          <NavLink to="/siniestros">
            <i className="fa fa-th-large"></i> <span className="nav-label">Siniestros</span>
          </NavLink>

          <NavLink to="/reportes">
            <i className="fa fa-th-large"></i> <span className="nav-label">Reportes</span>
          </NavLink>

          <NavLink to="/aseguradoras">
            <i className="fa fa-th-large"></i> <span className="nav-label">Aseguradoras</span>
          </NavLink>
        </ul>

      </div>
    </nav>
  );
}

export default Sidebar;