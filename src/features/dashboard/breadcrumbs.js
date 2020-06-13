import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  var path = location.pathname.split("/").filter(item => item !== "");
  var titleOpt = path.slice(-1).length > 0 ? path.slice(-1)[0] : '';
  var title = titleOpt.replace("-", " ").split(" ").map(item => {
                if( !item || item === '' ) item = 'Dashboard';
                return item
                  .replace(/^./, item[0].toUpperCase())
                  .replace("Atencion", "Atención")
                  .replace("Facturacion", "Facturación");
              }).join(" ");

  return (
    <div className="row wrapper border-bottom white-bg">
      <div className="breadcrumb-container">
          <h2>{title}</h2>
          <ol className="breadcrumb">
              <span className={`breadcrumb-item ${path.length === 0 ? "active": ""}`} to="/">
                Dashboard
              </span>
              {
                path.map((item, index) => {
                  var activo = index === path.length - 1 ? "active" : "";
                  var opcion = item.replace("-", " ").split(" ").map(item => 
                    item
                      .replace(/^./, item[0].toUpperCase())
                      .replace("Atencion", "Atención")
                      .replace("Facturacion", "Facturación")
                  ).join(" ");
                  var to = path.slice(0, index + 1).join("/");

                  return (
                    <span key={item} className={`breadcrumb-item ${activo}`} to={`/${to}`}>
                      {opcion}
                    </span>
                  );
                })
              }
              
          </ol>
      </div>
    </div>
  );
}

export default Breadcrumbs;