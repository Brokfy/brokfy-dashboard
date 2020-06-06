import React, { useState } from 'react';
import Wrapper from '../../../common/wrapper';
import { Grid, FormControl, InputLabel, Select, makeStyles, TextField, IconButton } from '@material-ui/core';
import { getDateFormated } from '../../../common/utils';
import { PrintSharp, FindInPage, SearchSharp } from '@material-ui/icons';
import ReporteContenido from './reporte_contenido';

const Reportes = () => {
  const [showReport, setShowReport] = useState(false);

  const useStyles = makeStyles((theme) => ({
    iconButton: {
      fontSize: "16px",
      marginTop: "10px",
    }
  }));
  const classes = useStyles();

  const setInputDate = () => {
    var date = new Date();

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    
    return today;
}

  // const getDate = (fecha) => {
  //   var ano, mes, dia;
  //   try {
  //       if( fecha.toString().length > 0 ) {
  //           ano = fecha.substr(6,4);
  //           mes = fecha.substr(3,2);
  //           dia = fecha.substr(0,2);
  //           return getDateFormated(`${ano}-${mes}-${dia} 00:00:00.00`);
  //       }
  //   } catch {
  //       return fecha;
  //   }
  // }

  const ContenidoReporte = Wrapper(ReporteContenido);

  return(
    <>
      <div className="row wrapper border-bottom page-heading hide-print-mode">
        <div className="col-lg-12">
          <div className="p-xs">
            <div className="float-left m-r-md">
              <i className="fa fa-file-text-o text-navy mid-icon"></i>
            </div>
            <h2>Nombre del reporte</h2>
            <span>Descripción breve de la finalidad del informe</span>
          </div>
        </div>
      </div>

      <div className="row wrapper border-bottom page-heading show-print-mode">
        <div className="col-lg-12">
          <div className="p-xs" style={{ position: "relative", width: "80%" }}>
            <div className="float-left m-r-md">
              <i className="fa fa-file-text-o text-navy mid-icon"></i>
            </div>
            <h2>Nombre del reporte</h2>
            <span>
              Descripción breve de la finalidad del informe.  
              Descripción breve de la finalidad del informe. 
              Descripción breve de la finalidad del informe. 
              Descripción breve de la finalidad del informe. 
              Descripción breve de la finalidad del informe. 
              Descripción breve de la finalidad del informe. 
              Descripción breve de la finalidad del informe. 
            </span>
          </div>
          <div className="p-xs" style={{ position: "absolute", top: "10px", right: "10px" }}>
            <table>
              <tbody>
                <tr>
                  <td align="right"><b>Fecha Inicio &nbsp;:</b></td>
                  <td>&nbsp;&nbsp;06/06/2020</td>
                </tr>
                <tr>
                  <td align="right"><b>Fecha Fin &nbsp;:</b></td>
                  <td>&nbsp;&nbsp;06/06/2020</td>
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
            {/* <span>  : </span><br/>
            <span>: 06/06/2020</span><br/>
            <span>: </span><br/>
            <span>: Todas</span> */}
          </div>
          {/* <Grid container spacing={3}>
            <Grid item lg={8}>
              <div className="p-xs">
                <div className="float-left m-r-md">
                  <i className="fa fa-file-text-o text-navy mid-icon"></i>
                </div>
                <h2>Nombre del reporte</h2>
                <span>Descripción breve de la finalidad del informe</span>
              </div>
            </Grid>
            <Grid item lg={4}>
            </Grid>
          </Grid> */}
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
                    defaultValue={setInputDate()}
                    // disabled={options.display === false || options.disabled}
                    // error={error === true}
                    // helperText={error === true ? errorMessage : ''}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                  <TextField
                    id={"fechaFin"}
                    name={"fechaFin"}
                    label={"Fecha Fin"}
                    type="date"
                    defaultValue={setInputDate()}
                    // disabled={options.display === false || options.disabled}
                    // error={error === true}
                    // helperText={error === true ? errorMessage : ''}
                  />
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <FormControl className={classes.formControl} style={{ margin: '0' }}>
                        <InputLabel id="aseguradoraLabel">Aseguradora</InputLabel>
                        <Select
                            id="aseguradora"
                            name="aseguradora"
                            // value={formData.aseguradora}
                            // onChange={actualizarFormData}
                            // disabled={!modoEdicion}
                        >
                            {/* {!listadoAseguradora || listadoAseguradora.length <= 0 ? null : listadoAseguradora.map((x, i) => <MenuItem key={`mi_${i}_aseguradora`} value={x.idAseguradora}>{x.nombre}</MenuItem>)} */}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6} sm={4} md={3} lg={2}>
                    <FormControl className={classes.formControl} style={{ margin: '0' }}>
                        <InputLabel id="tipoPolizaLabel">Tipo Póliza</InputLabel>
                        <Select
                            id="tipoPoliza"
                            name="tipoPoliza"
                            // value={formData.aseguradora}
                            // onChange={actualizarFormData}
                            // disabled={!modoEdicion}
                        >
                            {/* {!listadoAseguradora || listadoAseguradora.length <= 0 ? null : listadoAseguradora.map((x, i) => <MenuItem key={`mi_${i}_aseguradora`} value={x.idAseguradora}>{x.nombre}</MenuItem>)} */}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={8} md={6} lg={4}>
                  <IconButton color="primary" component="span" className={classes.iconButton} onClick={() => setShowReport(true)}>
                    <SearchSharp /> &nbsp; Buscar
                  </IconButton>

                  { 
                    showReport ?
                      <IconButton color="primary" component="span" className={classes.iconButton} onClick={() => window.print()}>
                        <PrintSharp /> &nbsp; Imprimir
                      </IconButton> : null
                  }
                </Grid>
              </Grid>
            </div>
          </div>
      </div>


      { showReport ? <ContenidoReporte /> : null }
      
    </>
  );
}

export default Reportes;