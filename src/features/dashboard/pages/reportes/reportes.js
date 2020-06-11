import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../../../common/wrapper';
import { Grid, FormControl, InputLabel, Select, makeStyles, TextField, IconButton, MenuItem } from '@material-ui/core';
import { getDateFormated } from '../../../../common/utils';
import { PrintSharp, FindInPage, SearchSharp, RestaurantMenu } from '@material-ui/icons';
import ReporteContenido from './reporte_contenido';
import { useFetchListadoReportes } from '../../redux/fetchListadoReportes';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchDropdownAseguradora } from '../../redux/fetchDropdownAseguradora';
import BLoading from '../../../../components/bloading';
import { PageNotFound } from '../../../common';
import { useUpdateFiltrosReportes } from '../../redux/updateFiltrosReportes';
import { useFetchDropdownTipoPoliza } from '../../redux/fetchDropdownTipoPoliza';
import { useFetchDataReporteFacturacionTotal } from '../../redux/fetchDataReporteFacturacionTotal';
import { FoldingCube } from 'styled-spinkit';
import { useFetchDataReporteComisionesRecibidas } from '../../redux/fetchDataReporteComisionesRecibidas';

const Reportes = () => {
  let { reporte } = useParams();

  const [showReport, setShowReport] = useState(false);
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    listadoReportes: false,
    reporteInfo: false,
    aseguradoras: false,
    tipoPolizas: false,
    detalleReporte: false,
  });
  const [reporteInfo, setReporteInfo] = useState({nombre: "", descripcion: ""});
  const { auth } = useGetToken();  

  const { listadoReportes, fetchListadoReportes, fetchListadoReportesPending } = useFetchListadoReportes();
  const { dropdownAseguradoras: listadoAseguradoras, fetchDropdownAseguradora } = useFetchDropdownAseguradora();
  const { dropdownTipoPoliza: listadoTipoPolizas, fetchDropdownTipoPoliza } = useFetchDropdownTipoPoliza();
  const { dataReporteFacturacionTotal, fetchDataReporteFacturacionTotal, fetchDataReporteFacturacionTotalPending } = useFetchDataReporteFacturacionTotal();
  const { dataReporteComisionesRecibidas, fetchDataReporteComisionesRecibidas, fetchDataReporteComisionesRecibidasPending } = useFetchDataReporteComisionesRecibidas();
  const { filtrosReportes, updateFiltrosReportes } = useUpdateFiltrosReportes();
  const [nombreReporte, setNombreReporte] = useState();
  const [dataReporte, setDataReporte] = useState([]);

  useEffect(() => {
    setDatosCargados({
      reporteInfo: false,
    });
    setLoading(true);
    setShowReport(false);
    updateFiltrosReportes({
      fechaInicio: "2019-06-01",
      // new Date().toISOString().substring(0,10),
      // fechaFin: new Date().toISOString().substring(0,10),
      fechaFin: "2020-10-11",
      aseguradora: 0,
      tipoPoliza: 0,
    });

    setDataReporte([]);

    switch(reporte) {
      case "comisiones-recibidas": 
        setNombreReporte("Comisiones");
        break;
      case "facturacion-total": 
        setNombreReporte("FacturacionTotal");
        break;
      case "comisiones-pendientes": 
        setNombreReporte("");
        break;
      default: 
        setNombreReporte("");
        break;
    }
  }, [reporte, updateFiltrosReportes, setNombreReporte]);

  useEffect(() => {
    if ( auth.tokenFirebase === "" ) return;
    if( fetchListadoReportesPending ) return;

    if( !datosCargados.listadoReportes ) {
      fetchListadoReportes(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        listadoReportes: true,
      });
      return;
    }

    if( !datosCargados.aseguradoras ) {
      fetchDropdownAseguradora(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        aseguradoras: true,
      });
      return;
    }

    if( !datosCargados.tipoPolizas ) {
      fetchDropdownTipoPoliza(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        tipoPolizas: true,
      });
      return;
    }

    if( datosCargados.listadoReportes && listadoReportes.length > 0 ) {
      if ( !datosCargados.reporteInfo ) {
        const reporteFiltrado = listadoReportes.filter(i => i.path.slice(reporte.length * -1) === reporte);
        if( reporteFiltrado.length > 0 ) {
          setReporteInfo(reporteFiltrado[0]);
          setDatosCargados({
            ...datosCargados,
            reporteInfo: true,
          });
        }
        setLoading(false);
      }
    }
  }, [datosCargados, auth, fetchListadoReportesPending, fetchListadoReportes, listadoReportes, reporte, fetchDropdownAseguradora, fetchDropdownTipoPoliza]);

  useEffect(() => {
    if ( nombreReporte === "FacturacionTotal" ) {
      setDataReporte(dataReporteFacturacionTotal);
    } else if( nombreReporte === "Comisiones" ) {
      setDataReporte(dataReporteComisionesRecibidas);
    }
  }, [dataReporteFacturacionTotal, dataReporteComisionesRecibidas, nombreReporte, setDataReporte]);

  const useStyles = makeStyles((theme) => ({
    iconButton: {
      fontSize: "16px",
      marginTop: "10px",
    }
  }));
  const classes = useStyles();

  const ContenidoReporte = Wrapper(ReporteContenido);

  const buscar = () => {
    updateFiltrosReportes({
      fechaInicio: document.querySelector("#fechaInicio").value,
      fechaFin: document.querySelector("#fechaFin").value,
      idAseguradora: parseInt(document.querySelector("[name='aseguradora']").value),
      idTipoPoliza: parseInt(document.querySelector("[name='tipoPoliza']").value),
    });

    const parametrosRequest = {
      token: auth.tokenFirebase,
      nombre: nombreReporte,
      fechaInicio: document.querySelector("#fechaInicio").value,
      fechaFin: document.querySelector("#fechaFin").value,
      idAseguradora: parseInt(document.querySelector("[name='aseguradora']").value),
      idTipoPoliza: parseInt(document.querySelector("[name='tipoPoliza']").value),
    };

    console.log(nombreReporte);

    if( nombreReporte === "FacturacionTotal" ) {
      fetchDataReporteFacturacionTotal(parametrosRequest);
    } else if ( nombreReporte === "Comisiones" ) {
      fetchDataReporteComisionesRecibidas(parametrosRequest);
    }

    setShowReport(true);
  }

  if( loading === true ) return <BLoading />;
  if( reporteInfo.nombre === "" ) return <PageNotFound />;

  return(
    <>
      <div className="row wrapper border-bottom page-heading hide-print-mode">
        <div className="col-lg-12">
          <div className="p-xs">
            <div className="float-left m-r-md">
              <i className="fa fa-file-text-o text-navy mid-icon"></i>
            </div>
            <h2>{reporteInfo.nombre}</h2>
            <span>{reporteInfo.descripcion}</span>
          </div>
        </div>
      </div>

      <div className="row wrapper border-bottom page-heading show-print-mode">
        <div className="col-lg-12">
          <div className="p-xs" style={{ position: "relative", width: "80%" }}>
            <div className="float-left m-r-md">
              <i className="fa fa-file-text-o text-navy mid-icon"></i>
            </div>
            <h2>{reporteInfo.nombre}</h2>
            <span>{reporteInfo.descripcion}</span>
          </div>
          <div className="p-xs" style={{ position: "absolute", top: "10px", right: "10px" }}>
            <table>
              <tbody>
                <tr>
                  <td align="right"><b>Fecha Inicio &nbsp;:</b></td>
                  <td>&nbsp;&nbsp;{filtrosReportes.fechaInicio}</td>
                </tr>
                <tr>
                  <td align="right"><b>Fecha Fin &nbsp;:</b></td>
                  <td>&nbsp;&nbsp;{filtrosReportes.fechaFin}</td>
                </tr>
                <tr>
                  <td align="right"><b>Aseguradora &nbsp;:</b></td>
                  <td>&nbsp;&nbsp;Todas</td>
                </tr>
                <tr>
                  <td align="right"><b>Tipo Póliza &nbsp;:</b></td>
                  <td>&nbsp;&nbsp;Todas</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row wrapper border-bottom page-heading-2 hide-print-mode">
          <div className="col-lg-12">
            <div className="p-xs">
              <Grid container spacing={3}>
                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    id={"fechaInicio"}
                    name={"fechaInicio"}
                    label={"Fecha Inicio"}
                    type="date"
                    defaultValue={filtrosReportes.fechaInicio}
                    // disabled={options.display === false || options.disabled}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    id={"fechaFin"}
                    name={"fechaFin"}
                    label={"Fecha Fin"}
                    type="date"
                    defaultValue={filtrosReportes.fechaFin}
                    // disabled={options.display === false || options.disabled}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <FormControl className={classes.formControl} style={{ margin: '0' }}>
                        <InputLabel id="aseguradoraLabel">Aseguradora</InputLabel>
                        <Select
                            id="aseguradora"
                            name="aseguradora"
                            defaultValue={filtrosReportes.aseguradora}
                            // value={formData.aseguradora}
                        >
                            {
                              !listadoAseguradoras || listadoAseguradoras.length <= 0 ? 
                                <MenuItem key={`mi_${0}_aseguradora`} value={0}>{"Todas"}</MenuItem> : 
                                [{ idAseguradora: 0, nombre: "Todas" }, ...listadoAseguradoras].map((x, i) => <MenuItem key={`mi_${i}_aseguradora`} value={x.idAseguradora}>{x.nombre}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <FormControl className={classes.formControl} style={{ margin: '0' }}>
                        <InputLabel id="tipoPolizaLabel">Tipo Póliza</InputLabel>
                        <Select
                            id="tipoPoliza"
                            name="tipoPoliza"
                            defaultValue={filtrosReportes.tipoPoliza}
                            // value={formData.aseguradora}
                        >
                            { 
                              !listadoTipoPolizas || listadoTipoPolizas.length <= 0 ? 
                                <MenuItem key={`mi_${0}_tipoPoliza`} value={0}>{"Todas"}</MenuItem> : 
                                [{ id: 0, tipo: "Todas" }, ...listadoTipoPolizas].map((x, i) => <MenuItem key={`mi_${i}_tipoPoliza`} value={x.id}>{x.tipo}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={4}>
                  <IconButton color="primary" component="span" className={classes.iconButton} onClick={buscar} disabled={fetchDataReporteFacturacionTotalPending || fetchDataReporteComisionesRecibidasPending}>
                    <SearchSharp /> &nbsp; Buscar
                  </IconButton>

                  { 
                    showReport && !fetchDataReporteFacturacionTotalPending && !fetchDataReporteComisionesRecibidasPending ?
                      <IconButton color="primary" component="span" className={classes.iconButton} onClick={() => window.print()}>
                        <PrintSharp /> &nbsp; Imprimir
                      </IconButton> : null
                  }
                </Grid>
              </Grid>
            </div>
          </div>
      </div>

      { showReport ? 
          fetchDataReporteFacturacionTotalPending || fetchDataReporteComisionesRecibidasPending ? 
            <BLoading mensaje="Generando..." secundario={true} /> :
            <ContenidoReporte nombreReporte={nombreReporte} data={dataReporte}/> : 
          null 
      }
      
    </>
  );
}

export default Reportes;