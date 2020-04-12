import React, { Fragment } from 'react';
// import {
//   useLocation,
// } from "react-router-dom";

const PageProtected = (props) => {
  // const location = useLocation();
  // const { from } = location.state || { from: { pathname: props.location || "/" } };
  return (
    <Fragment>
      <div className="lock-word animated fadeInDown">
        <span className="first-word">ACCESO</span>
        <i className="fa fa-lock icon-lock" aria-hidden="true"></i>
        <span>RESTRINGIDO</span>
      </div>
      <div className="texto-pagina-restringida lockscreen animated fadeInDown">
        {/* <div>
          <p>Está intentando acceder a una página protegida. Debe iniciar sesión para ver la página {from.pathname}.</p>
        </div> */}
      </div>
    </Fragment>
  );
}

export default PageProtected;