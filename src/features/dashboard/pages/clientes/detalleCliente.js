import React from 'react';
import { Grid } from '@material-ui/core';
import DatosPersonales from './datosPersonales';
import PolizasCliente from './polizasCliente';
import PerfilAsegurado from './perfilAsegurado';
import BLoading from '../../../../components/bloading';

const DetalleCliente = ({detalleUsuario, checked, fetchDetalleUsuarioPending}) => {

  if( !detalleUsuario || !detalleUsuario.datosPersonales || checked.toString() === "0" || checked.toString().length === 0 ) {
    return null;
    // (
    //   <div className="wrapper wrapper-content animated fadeInRight">
    //     <div className="panel panel-default" style={{ marginBottom: "0px" }}>
    //       <div className="panel-body">
    //           <span className="titulo-panel">Seleccione un usuario</span>
    //       </div>
    //     </div>
    //   </div>
    // );
  }

  if ( fetchDetalleUsuarioPending ) return <BLoading />;

  return (
    <div style={{width: "calc(100% - 78px)", height: "calc(100% - 101px)", display: "inline-block", position: "absolute", paddingLeft: "4px", overflowX: "hidden", overflowY: "auto"}}>
      <div className="wrapper wrapper-content animated fadeInRight">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DatosPersonales {...detalleUsuario.datosPersonales} estado={detalleUsuario && detalleUsuario.perfilAsegurado ? detalleUsuario.perfilAsegurado.estado : ""} />
              </Grid>

              <Grid item xs={12}>
                <PerfilAsegurado {...detalleUsuario.perfilAsegurado} />
              </Grid>
            </Grid>
          </Grid>

          {(!detalleUsuario.detallePerfil.actividades || detalleUsuario.detallePerfil.actividades.length === 0) && (!detalleUsuario.detallePerfil.gadgets || detalleUsuario.detallePerfil.gadgets.length === 0) && (!detalleUsuario.detallePerfil.propiedades || detalleUsuario.detallePerfil.propiedades.length === 0) && (!detalleUsuario.detallePerfil.salud || detalleUsuario.detallePerfil.salud.length === 0)  ? null :
            <Grid item xs={12} md={6} xl={4}>
              <Grid container spacing={3}>
                {!detalleUsuario.detallePerfil.actividades || detalleUsuario.detallePerfil.actividades.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Actividades</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {detalleUsuario.detallePerfil.actividades.map((act, index) => {
                            if ( index % 2 === 0 ) {
                              return <li key={`list-act-item${index}`}><a href="#!"><i className="fa fa-check-circle"></i> {act.descripcion}</a></li>;
                            }
                            return <li key={`list-act-item${index}`}><a href="#!"><i className="fa fa-circle-o"></i> {act.descripcion}</a></li>;
                          })}
                        </ul>
                        <br />
                      </div>
                    </div>
                  </Grid>
                }

                {!detalleUsuario.detallePerfil.gadgets || detalleUsuario.detallePerfil.gadgets.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Gadgets</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {detalleUsuario.detallePerfil.gadgets.map((gad, index) => {
                            if ( index % 2 === 0 ) {
                              return <li key={`list-gad-item${index}`}><a href="#!"><i className="fa fa-check-circle"></i> {gad.descripcion}</a></li>;
                            }
                            return <li key={`list-gad-item${index}`}><a href="#!"><i className="fa fa-circle-o"></i> {gad.descripcion}</a></li>;
                          })}
                        </ul>
                        <br />
                      </div>
                    </div>
                  </Grid>
                }

                {!detalleUsuario.detallePerfil.propiedades || detalleUsuario.detallePerfil.propiedades.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Propiedades</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {detalleUsuario.detallePerfil.propiedades.map((pro, index) => {
                            if ( index % 2 === 0 ) {
                              return <li key={`list-pro-item${index}`}><a href="#!"><i className="fa fa-check-circle"></i> {pro.descripcion}</a></li>;
                            }
                            return <li key={`list-pro-item${index}`}><a href="#!"><i className="fa fa-circle-o"></i> {pro.descripcion}</a></li>;
                          })}
                        </ul>
                        <br />
                      </div>
                    </div>
                  </Grid>
                }

                {!detalleUsuario.detallePerfil.salud || detalleUsuario.detallePerfil.salud.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Salud</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {detalleUsuario.detallePerfil.salud.map((sal, index) => {
                            if ( index % 2 === 0 ) {
                              return <li key={`list-sal-item${index}`}><a href="#!"><i className="fa fa-check-circle"></i> {sal.descripcion}</a></li>;
                            }
                            return <li key={`list-sal-item${index}`}><a href="#!"><i className="fa fa-circle-o"></i> {sal.descripcion}</a></li>;
                          })}
                        </ul>
                        <br />
                      </div>
                    </div>
                  </Grid>
                }
              </Grid>
            </Grid>
          }

          <Grid item xs={12} md={6} xl={4}>
            <PolizasCliente polizas={detalleUsuario.polizas} />
          </Grid>
        </Grid>
      </div>
    </div>
  );


        //             {!detalleUsuario || !detalleUsuario.detallePerfil ? null :
        //                 <Grid container spacing={3}>

        //                     {!detalleUsuario.detallePerfil.salud || detalleUsuario.detallePerfil.salud.length === 0 ? null :
        //                         <Grid item xs={3} >
        //                             <div className="panel panel-default" style={{ marginBottom: "0px" }}>
        //                                 <div className="panel-body">
        //                                     <span className="titulo-panel">Salud</span>
        //                                     <br /><br />
        //                                     <table className="table table-hover" style={{ marginBottom: "0px" }}>
        //                                         <tbody>
        //                                             {detalleUsuario.detallePerfil.salud.map(sal => {
        //                                                 return (
        //                                                     <tr key={`gadget_${sal.id}`}><td width="100%">{sal.descripcion}</td></tr>
        //                                                 )
        //                                             })}
        //                                         </tbody>
        //                                     </table>
        //                                     <br />
        //                                 </div>
        //                             </div>
        //                         </Grid>
        //                     }
}

export default DetalleCliente;