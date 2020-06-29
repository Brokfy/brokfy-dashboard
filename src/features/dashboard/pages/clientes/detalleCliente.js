import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import DatosPersonales from './datosPersonales';
import PolizasCliente from './polizasCliente';
import PerfilAsegurado from './perfilAsegurado';
import BLoading from '../../../../components/bloading';
import { useUpdateProfileItems } from '../../redux/updateProfileItems';
import { useGetToken } from '../../../common/redux/hooks';

const DetalleCliente = ({detalleUsuario, checked, fetchDetalleUsuarioPending}) => {
  const { updateProfileItems, updateProfileItemsPending, updateProfileItemsError } = useUpdateProfileItems();
  const [idGadget, setIdGadget] = useState();
  const [idPropiedad, setIdPropiedad] = useState();
  const [idSalud, setIdSalud] = useState();
  const [idActividad, setIdActividad] = useState();
  const [data, setData] = useState();
  const { auth } = useGetToken(); 

  // Cambios en actividades
  useEffect(() => {
    if( updateProfileItemsPending ) return;
    if ( !idActividad ) return;
    if ( !updateProfileItemsPending ) {
      if( !updateProfileItemsError || updateProfileItemsError === "" ) {
        setData({
          ...data,
          detallePerfil: {
            ...data.detallePerfil,
            actividades: [
              ...data.detallePerfil.actividades.map(i => i.id === idActividad ? {
                ...i,
                aplica: !i.aplica,
              } : i)
            ]
          }
        })
      }
      setIdActividad(null);
    }
  }, [updateProfileItemsPending, data, idActividad, updateProfileItemsError]);

  // Cambios en gadget
  useEffect(() => {
    if( updateProfileItemsPending ) return;
    if ( !idGadget ) return;
    if ( !updateProfileItemsPending ) {
      if( !updateProfileItemsError || updateProfileItemsError === "" ) {
        setData({
          ...data,
          detallePerfil: {
            ...data.detallePerfil,
            gadgets: [
              ...data.detallePerfil.gadgets.map(i => i.id === idGadget ? {
                ...i,
                aplica: !i.aplica,
              } : i)
            ],
          }
        })
      }
      setIdGadget(null);
    }
  }, [updateProfileItemsPending, data, idGadget, updateProfileItemsError]);

  // Cambios en propiedades
  useEffect(() => {
    if( updateProfileItemsPending ) return;
    if ( !idPropiedad ) return;
    if ( !updateProfileItemsPending ) {
      if( !updateProfileItemsError || updateProfileItemsError === "" ) {
        setData({
          ...data,
          detallePerfil: {
            ...data.detallePerfil,
            propiedades: [
              ...data.detallePerfil.propiedades.map(i => i.id === idPropiedad ? {
                ...i,
                aplica: !i.aplica,
              } : i)
            ],
          }
        })
      }
      setIdPropiedad(null);
    }
  }, [updateProfileItemsPending, data, idPropiedad, updateProfileItemsError]);

  // Cambios en salud
  useEffect(() => {
    if( updateProfileItemsPending ) return;
    if ( !idSalud ) return;
    if ( !updateProfileItemsPending ) {
      if( !updateProfileItemsError || updateProfileItemsError === "" ) {
        setData({
          ...data,
          detallePerfil: {
            ...data.detallePerfil,
            salud: [
              ...data.detallePerfil.salud.map(i => i.id === idSalud ? {
                ...i,
                aplica: !i.aplica,
              } : i)
            ],
          }
        })
      }
      setIdSalud(null);
    }
  }, [updateProfileItemsPending, data, idSalud, updateProfileItemsError]);

  useEffect(() => {
    if( detalleUsuario ) setData(detalleUsuario);
  }, [detalleUsuario])

  if( !data || !data.datosPersonales || checked.toString() === "0" || checked.toString().length === 0 ) {
    return null;
  }

  if ( fetchDetalleUsuarioPending ) return <BLoading />;

  const updateActividad = (idActividad, aplica) => {
    if( updateProfileItemsPending ) return;

    const reqData = {
      "username": detalleUsuario.datosPersonales.username,
      "modulo": "actividades",
      "idDetalle": idActividad,
      "aplica": !aplica,
    }
    setIdActividad(idActividad);
    updateProfileItems({
      data: reqData,
      token: auth.tokenFirebase
    });
  }

  const updateGadget = (idGadget, aplica) => {
    if( updateProfileItemsPending ) return;

    const reqData = {
      "username": detalleUsuario.datosPersonales.username,
      "modulo": "gadgets",
      "idDetalle": idGadget,
      "aplica": !aplica,
    }
    setIdGadget(idGadget);
    updateProfileItems({
      data: reqData,
      token: auth.tokenFirebase
    });
  }

  const updatePropiedades = (idPropiedad, aplica) => {
    if( updateProfileItemsPending ) return;

    const reqData = {
      "username": detalleUsuario.datosPersonales.username,
      "modulo": "propiedades",
      "idDetalle": idPropiedad,
      "aplica": !aplica,
    }
    setIdPropiedad(idPropiedad);
    updateProfileItems({
      data: reqData,
      token: auth.tokenFirebase
    });
  }

  const updateSalud = (idSalud, aplica) => {
    if( updateProfileItemsPending ) return;
    
    const reqData = {
      "username": detalleUsuario.datosPersonales.username,
      "modulo": "salud",
      "idDetalle": idSalud,
      "aplica": !aplica,
    }
    setIdSalud(idSalud);
    updateProfileItems({
      data: reqData,
      token: auth.tokenFirebase
    });
  }

  return (
    <div style={{width: "calc(100% - 78px)", height: "calc(100% - 101px)", display: "inline-block", position: "absolute", paddingLeft: "4px", overflowX: "hidden", overflowY: "auto"}}>
      <div className="wrapper wrapper-content animated fadeInRight">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <DatosPersonales {...data.datosPersonales} estado={data && data.perfilAsegurado ? data.perfilAsegurado.estado : ""} />
              </Grid>

              <Grid item xs={12}>
                <PerfilAsegurado {...data.perfilAsegurado} />
              </Grid>
            </Grid>
          </Grid>

          {(!data.detallePerfil.actividades || data.detallePerfil.actividades.length === 0) && (!data.detallePerfil.gadgets || data.detallePerfil.gadgets.length === 0) && (!data.detallePerfil.propiedades || data.detallePerfil.propiedades.length === 0) && (!data.detallePerfil.salud || data.detallePerfil.salud.length === 0)  ? null :
            <Grid item xs={12} md={6} xl={4}>
              <Grid container spacing={3}>
                {!data.detallePerfil.actividades || data.detallePerfil.actividades.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Actividades</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {data.detallePerfil.actividades.map((act, index) => {
                            return <li key={`list-act-item${index}`}><a href="#!" onClick={(evt) => { evt.preventDefault(); updateActividad(act.id, act.aplica) }}><i className={`fa ${
                              updateProfileItemsPending && act.id === idActividad ? 
                                "fa-cog fa-spin" : 
                                act.aplica ? "fa-check-circle" : "fa-circle-o" 
                            }`}></i> {act.descripcion}</a></li>;
                          })}
                        </ul>
                        <br />
                      </div>
                    </div>
                  </Grid>
                }

                {!data.detallePerfil.gadgets || data.detallePerfil.gadgets.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Gadgets</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {data.detallePerfil.gadgets.map((gad, index) => {
                            return <li key={`list-act-item${index}`}><a href="#!" onClick={(evt) => { evt.preventDefault(); updateGadget(gad.id, gad.aplica) }}><i className={`fa ${
                              updateProfileItemsPending && gad.id === idGadget ? 
                                "fa-cog fa-spin" : 
                                gad.aplica ? "fa-check-circle" : "fa-circle-o" 
                            }`}></i> {gad.descripcion}</a></li>;
                          })}
                        </ul>
                        <br />
                      </div>
                    </div>
                  </Grid>
                }

                {!data.detallePerfil.propiedades || data.detallePerfil.propiedades.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Propiedades</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {data.detallePerfil.propiedades.map((pro, index) => {
                            return <li key={`list-act-item${index}`}><a href="#!" onClick={(evt) => { evt.preventDefault(); updatePropiedades(pro.id, pro.aplica) }}><i className={`fa ${
                              updateProfileItemsPending && pro.id === idPropiedad ? 
                                "fa-cog fa-spin" : 
                                pro.aplica ? "fa-check-circle" : "fa-circle-o" 
                            }`}></i> {pro.descripcion}</a></li>;
                          })}
                        </ul>
                        <br />
                      </div>
                    </div>
                  </Grid>
                }

                {!data.detallePerfil.salud || data.detallePerfil.salud.length === 0 ? null :
                  <Grid item xs={12} >
                    <div className="panel panel-default" style={{ marginBottom: "0px", maxHeight: "182px" }}>
                      <div className="panel-body">
                        <span className="titulo-panel">Salud</span>
                        <br /><br />
                        <ul className="tag-list" style={{padding: 0}}>
                          {data.detallePerfil.salud.map((sal, index) => {
                            return <li key={`list-act-item${index}`}><a href="#!" onClick={(evt) => { evt.preventDefault(); updateSalud(sal.id, sal.aplica) }}><i className={`fa ${
                              updateProfileItemsPending && sal.id === idSalud ? 
                                "fa-cog fa-spin" : 
                                sal.aplica ? "fa-check-circle" : "fa-circle-o" 
                            }`}></i> {sal.descripcion}</a></li>;
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
            <PolizasCliente polizas={data.polizas} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default DetalleCliente;