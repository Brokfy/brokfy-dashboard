import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();

  var path = location.pathname.split("/").filter(item => item !== "");

  return (
    <div className="row wrapper border-bottom white-bg">
      <div className="breadcrumb-container">
          <h2>Clientes</h2>
          <ol className="breadcrumb">
              <Link className={`breadcrumb-item ${path.length === 0 ? "active": ""}`} to="/">
                Dashboard
              </Link>
              {
                path.map((item, index) => {
                  var activo = index === path.length - 1 ? "active" : "";
                  var opcion = item.replace("-", " ").split(" ").map(item => 
                    item
                      .replace(/^./, item[0].toUpperCase())
                      .replace("Atencion", "Atención")
                  ).join(" ");
                  var to = path.slice(0, index + 1).join("/");

                  return (
                    <Link key={item} className={`breadcrumb-item ${activo}`} to={`/${to}`}>
                      {opcion}
                    </Link>
                  );
                })
              }
              
          </ol>
      </div>
    </div>
  );
}

export default Breadcrumbs;