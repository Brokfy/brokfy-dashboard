import React from 'react';
import { useLogout, useIsAuthenticated, useAuth } from '../common/redux/hooks';
import Notificaciones from './notificaciones';
import Breadcrumbs from './breadcrumbs';

const Topbar = () => {
  const {logout} = useLogout();
  const { isAuthenticated } = useIsAuthenticated();
  const { auth } = useAuth();

  return (
    <div className="row border-bottom">
      <nav className="navbar navbar-static-top white-bg" role="navigation">
        <div className="navbar-header">
          <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#!"><i className="fa fa-bars"></i> </a>
        </div>
        <Breadcrumbs />
        <ul className="nav navbar-top-links navbar-right">
          <li>
            <span className="m-r-sm text-muted welcome-message">Bienvenido al dashboard administrativo de Brokfy.</span>
          </li>
          {
            isAuthenticated ?
            <li>
              <a className="pull-left btn-effect" data-modal="modal-1" data-rel="tooltip" data-placement="top" href="#!">
                <i className="fa fa-user"></i> { auth.NombreCompleto }
              </a>
            </li> :
            null
          }

          { isAuthenticated ? <Notificaciones /> : null }
          <li>
            <a href="#!" onClick={logout}>
              <i className="fa fa-sign-out"></i> { isAuthenticated ? "Cerrar Sesión" : "Iniciar Sesión" }
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Topbar;