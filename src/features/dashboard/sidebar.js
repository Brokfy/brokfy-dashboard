import React from 'react';
import NavLink from './navlink';

const Sidebar = () => {
  return (
    <nav className="navbar-default navbar-static-side" role="navigation">
      <div className="sidebar-collapse">
        <ul className="nav metismenu" id="side-menu">
          <li className="nav-header">
            <div className="dropdown profile-element">
              <a data-toggle="dropdown" className="dropdown-toggle" href="#!">
                <span className="block m-t-xs font-bold">Example user</span>
                <span className="text-muted text-xs block">menu <b className="caret"></b></span>
              </a>
              <ul className="dropdown-menu animated fadeInRight m-t-xs">
                <li><a className="dropdown-item" href="login.html">Logout</a></li>
              </ul>
            </div>
            <div className="logo-element">
              IN+
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