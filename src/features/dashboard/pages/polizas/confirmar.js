import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button } from '@material-ui/core'
import { useLocation, useParams } from 'react-router-dom';
import { PageNotFound } from '../../../common';
import { useGetToken } from '../../../common/redux/hooks';
import BPDF from '../../../../components/bpdf';
import axios from 'axios';
import ConfirmarFormulario from './confirmar_formulario';
import BLoading from '../../../../components/bloading';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';
import format from 'date-fns/format';
import { getDateFormated } from '../../../../common/utils';
import { Info } from '@material-ui/icons'

/*
  e.g. URL: /polizas/carta-nombramiento/aprobar?poliza=0334210196
*/
const Confirmar = (props) => {
    const { tipo, propia } = useParams();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const noPoliza = "TEST-124";

    return <ConfirmarView noPoliza={noPoliza} />;
}

const ConfirmarView = (props) => {

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

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(2),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
    }));

    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Confirmación de Póliza: &nbsp; {props.noPoliza}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper className={classes.paper} variant="outlined" square>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Información General
                                </div>
                                <div className="panel-body">
                                    <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                        <tbody>
                                            <tr>
                                                <td width="50%">Tipo</td>
                                                <td width="50%">Auto</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Aseguradora</td>
                                                <td width="50%">Mapfre</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Inicio Vigencia</td>
                                                <td width="50%">12/03/2019</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Fin Vigencia</td>
                                                <td width="50%">12/03/2020</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Forma Pago</td>
                                                <td width="50%">Mensual</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="panel panel-default" style={{ marginBottom: "0px" }}>
                                <div className="panel-heading">
                                    Valor de la Póliza
                                </div>
                                <div className="panel-body">
                                    <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                        <tbody>
                                            <tr>
                                                <td width="50%">Prima Total</td>
                                                <td width="50%"><NumberFormat value={15000} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Prima Neta</td>
                                                <td width="50%">
                                                    <NumberFormat value={12000} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Primer Recibo</td>
                                                <td width="50%"><NumberFormat value={4000} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Recibos Subsecuentes</td>
                                                <td width="50%"><NumberFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Comisión</td>
                                                <td width="50%">10%</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>

                                {/* <br />
                                <div className="text-right">
                                    <Button onClick={() => { }} variant="contained" color="primary" className={"color-principal"}>
                                        &nbsp;&nbsp;Confirmar&nbsp;&nbsp;
                                        </Button>
                                </div> */}
                        </Grid>


                        <Grid item xs={12} sm={6} md={6} lg={9}>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    Datos de Confirmacion
                                </div>
                                <div className="panel-body">
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <TextField
                                                id={"fechaConfirmacion"}
                                                name={"fechaConfirmacion"}
                                                label={"Fecha Confirmación"}
                                                type="date"
                                                defaultValue={getDateFormated()}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Button onClick={() => { }} variant="contained" color="primary" className={"color-principal"} style={{ marginTop: "10px" }}>
                                                &nbsp;&nbsp;Simular Pagos&nbsp;&nbsp;
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>

                            <div className="panel panel-default" style={{ marginBottom: "0px" }}>
                                <div className="panel-heading">
                                    Desglose de Pagos
                                </div>
                                <div className="panel-body">
                                    <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                        <thead>
                                            <tr>
                                                <th>CUOTA</th>
                                                <th>FECHA</th>
                                                <th>VALOR</th>
                                                <th>RECAUDABLE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="noCobro"><td>1</td><td>12/03/2019</td><td>$100</td><td>No</td></tr>
                                            <tr className="noCobro"><td>2</td><td>01/03/2019</td><td>$100</td><td>No</td></tr>
                                            <tr className="noCobro"><td>3</td><td>02/03/2019</td><td>$100</td><td>No</td></tr>
                                            <tr className="noCobro"><td>4</td><td>03/03/2019</td><td>$100</td><td>No</td></tr>
                                            <tr className="noCobro"><td>5</td><td>04/03/2019</td><td>$100</td><td>No</td></tr>
                                            <tr className="noCobro"><td>6</td><td>05/03/2019</td><td>$100</td><td>No</td></tr>
                                            <tr className="siCobro"><td>7</td><td>06/03/2019</td><td>$100</td><td>Si</td></tr>
                                            <tr className="siCobro"><td>8</td><td>07/03/2019</td><td>$100</td><td>Si</td></tr>
                                            <tr className="siCobro"><td>9</td><td>08/03/2019</td><td>$100</td><td>Si</td></tr>
                                            <tr className="siCobro"><td>10</td><td>09/03/2019</td><td>$100</td><td>Si</td></tr>
                                            <tr className="siCobro"><td>11</td><td>10/03/2019</td><td>$100</td><td>Si</td></tr>
                                            <tr className="siCobro"><td>12</td><td>11/03/2019</td><td>$100</td><td>Si</td></tr>
                                        </tbody>

                                        <tfoot>
                                            <tr>
                                            <th colSpan="2">TOTAL RECAUDABLE</th>
                                            <th colSpan="2">$600</th>
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <br />

                                    <Grid container>
                                        <Grid item xs={12} sm={6} md={8} lg={9}>
                                            <div class="bg-muted p-md b-r-sm" style={{display: "inline-flex", alignItems: "center"}}>
                                                <div style={{ width: "24px", marginRight: "16px" }}>
                                                    <Info />
                                                </div>
                                                <div>
                                                    <span>Al confirmar la póliza se generarán las cuotas recaudables y quedarán disponibles para conciliarlas al momento de registrar pagos efectuados por las aseguradoras</span>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid item lg={1}></Grid>

                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            <Button onClick={() => { }} variant="contained" color="primary" className={"color-principal"} style={{ marginTop: "10px" }}>
                                                &nbsp;&nbsp;Confirmar Póliza&nbsp;&nbsp;
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
}

export default Confirmar;