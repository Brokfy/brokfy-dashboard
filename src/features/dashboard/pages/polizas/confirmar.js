import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PageNotFound } from '../../../common';
import { useGetToken } from '../../../common/redux/hooks';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import NumberFormat from 'react-number-format';
import { useFetchDropdownAseguradora } from '../../redux/fetchDropdownAseguradora';
import { useFetchPolizaPorConfirmar } from '../../redux/fetchPolizaPorConfirmar';
import { useFetchDropdownTipoPoliza } from '../../redux/fetchDropdownTipoPoliza';
import format from 'date-fns/format'
import BLoading from '../../../../components/bloading';
import { TextField, Button } from '@material-ui/core';
import { getDateFormated, generarCuotas } from '../../../../common/utils';
import { Info } from '@material-ui/icons';
import { useFetchValorComision } from '../../redux/fetchValorComision';

const Confirmar = (props) => {
    const { tipo, propia } = useParams();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const noPoliza = query.get("poliza");

    /*
        Se debe llevar a la página de NOT FOUND si lo que se va a aprobar
        no es una carta de nombramiento o si no se suministra un número
        de poliza
    */
    if (noPoliza == null || noPoliza.trim() === "" || propia !== 'todas' || tipo !== 'confirmaciones') {
        return <PageNotFound />
    }

    return <ConfirmarView noPoliza={noPoliza} />;
}

const ConfirmarView = (props) => {
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState({
      aseguradoras: false,
      tipoPolizas: false,
      polizaPorConfirmar: false,
      valorComision: false,
    });
    const { auth } = useGetToken();
    const { dropdownAseguradoras: listadoAseguradora, fetchDropdownAseguradora, fetchDropdownAseguradoraPending } = useFetchDropdownAseguradora();
    const { dropdownTipoPoliza: listadoTipoPoliza, fetchDropdownTipoPoliza, fetchDropdownTipoPolizaPending } = useFetchDropdownTipoPoliza();
    const { polizaPorConfirmar, fetchPolizaPorConfirmar, fetchPolizaPorConfirmarPending } = useFetchPolizaPorConfirmar();
    const { valorComision, fetchValorComision, fetchValorComisionPending } = useFetchValorComision();
    const [ aseguradora, setAseguradora ] = useState(null);
    const [ tipoPoliza, setTipoPoliza ] = useState(null);
    const [ comision, setComision ] = useState(null);
    const [ comisionIndicada, setComisionIndicada ] = useState(null);
    const [ showDeglosePagos, setShowDeglosePagos ] = useState(false);
    const [ fechaConfirmacion, setFechaConfirmacion ] = useState(getDateFormated());
    const [ cuotasData, setCuotasData ] = useState([]);
    const [ totalRecaudable, setTotalRecaudable ] = useState(0);

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

    useEffect(() => {
        if ( auth.tokenFirebase === "" ) return;
        if( fetchDropdownAseguradoraPending || fetchPolizaPorConfirmarPending || fetchDropdownTipoPolizaPending || fetchValorComisionPending ) return;
    
        if ( !datosCargados.aseguradoras ) {
          fetchDropdownAseguradora(auth.tokenFirebase);
          setDatosCargados({
            ...datosCargados,
            aseguradoras: true,
          });
          return;
        }

        if ( !datosCargados.polizaPorConfirmar ) {
            fetchPolizaPorConfirmar({ token: auth.tokenFirebase, no_poliza: props.noPoliza });
            setDatosCargados({
              ...datosCargados,
              polizaPorConfirmar: true,
            });
            return;
        }

        if ( !datosCargados.tipoPolizas ) {
            fetchDropdownTipoPoliza(auth.tokenFirebase);
            setDatosCargados({
              ...datosCargados,
              tipoPolizas: true,
            });
            return;
        }

        if( listadoAseguradora && listadoAseguradora.length > 0 && aseguradora === null && polizaPorConfirmar ) {
            const aseguradoraData = listadoAseguradora.filter(item => item.idAseguradora === polizaPorConfirmar.idAseguradoras)[0];
            if( aseguradoraData ) {
                setAseguradora(aseguradoraData.nombre);
            }
            return;
        }

        if( listadoTipoPoliza && listadoTipoPoliza.length > 0 && tipoPoliza === null && polizaPorConfirmar ) {
            const tipoPolizaData = listadoTipoPoliza.filter(item => item.id === polizaPorConfirmar.tipoPoliza)[0];
            if( tipoPolizaData ) {
                setTipoPoliza(tipoPolizaData.tipo);
            }
            return;
        }

        if( !datosCargados.valorComision ) {
            fetchValorComision({ 
                token: auth.tokenFirebase, 
                idAseguradora: polizaPorConfirmar.idAseguradoras,
                idTipoPoliza: polizaPorConfirmar.tipoPoliza,
                fecha: polizaPorConfirmar.fechaInicio,
            });
            setDatosCargados({
                ...datosCargados,
                valorComision: true,
            });
            return;
        }

        if( valorComision && comision === null ) {
            setComision(valorComision);
            return;
        }

        setLoading(false);
      }, [
          auth.tokenFirebase, fetchDropdownAseguradoraPending, fetchDropdownAseguradora, datosCargados, 
          aseguradora, listadoAseguradora, fetchPolizaPorConfirmarPending, fetchPolizaPorConfirmar, polizaPorConfirmar,
          props.noPoliza, fetchDropdownTipoPolizaPending, fetchDropdownTipoPoliza, listadoTipoPoliza, tipoPoliza,
          fetchValorComisionPending, fetchValorComision, comision, valorComision
        ]);

    useEffect(() => {
        if( showDeglosePagos ) {
            // const cuotas = generarCuotas( polizaPorConfirmar.formaPago, polizaPorConfirmar.fechaInicio, polizaPorConfirmar.fechaFin ).map((fecha, index) => {
            const cuotas = generarCuotas( "Mensual", polizaPorConfirmar.fechaInicio, polizaPorConfirmar.fechaFin ).map((fecha, index) => {
                return {
                    cuota: index + 1,
                    fecha,
                    valor: parseFloat(polizaPorConfirmar.costoRecibosSubsecuentes) * parseFloat(comision || comisionIndicada)/100,
                    recaudable: format(new Date(fecha), 'yyyy-MM-dd') < format(new Date(fechaConfirmacion), 'yyyy-MM-dd') ? "No" : "Si",
                };
            });
            setCuotasData(cuotas);
            setTotalRecaudable(cuotas.reduce((a,b) => a + (b.recaudable === "Si" ? b.valor : 0), 0));
        }
    }, [showDeglosePagos, polizaPorConfirmar, comision, fechaConfirmacion, comisionIndicada]);

    const confirmarPoliza = () => {
        // TODO: POST para generar las cuotas y cambiar el estado a ACTIVA en la poliza
        const cuotasAGenerar = cuotasData.filter(item => item.recaudable === "Si").map(({fecha, valor}) => {  return { fecha, valor }; });
        console.log(cuotasAGenerar);

        // TODO: Volver a la pantalla de confirmaciones
    }

    if( loading ) {
        return <BLoading />;
    }

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
                                                <td width="50%">{ tipoPoliza }</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Aseguradora</td>
                                                <td width="50%">{ aseguradora }</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Inicio Vigencia</td>
                                                <td width="50%">{ format(new Date(polizaPorConfirmar.fechaInicio), 'dd/MM/yyyy') }</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Fin Vigencia</td>
                                                <td width="50%">{ format(new Date(polizaPorConfirmar.fechaFin), 'dd/MM/yyyy') }</td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Forma Pago</td>
                                                <td width="50%">{ polizaPorConfirmar.formaPago }</td>
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
                                                <td width="50%"><NumberFormat value={polizaPorConfirmar.costo} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Prima Neta</td>
                                                <td width="50%">
                                                    <NumberFormat value={polizaPorConfirmar.primaNeta} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Primer Recibo</td>
                                                <td width="50%"><NumberFormat value={polizaPorConfirmar.costoPrimerRecibo} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Recibos Subsecuentes</td>
                                                <td width="50%"><NumberFormat value={polizaPorConfirmar.costoRecibosSubsecuentes} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            </tr>
                                            <tr>
                                                <td width="50%">Comisión</td>
                                                <td width="50%">{ comision !== null ? `${comision}%` : "" }</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
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
                                                onBlur={event => setFechaConfirmacion(event.target.value)}
                                            />
                                        </Grid>

                                        { comision === null ? 
                                            <Grid item xs={12} sm={6} md={4} lg={2}>
                                                <TextField
                                                        id={"comisionIndicada"}
                                                        name={"comisionIndicada"}
                                                        label={"Comisión"}
                                                        type="number"
                                                        inputProps={{
                                                            min: 0, 
                                                            max: 100,
                                                            step: 1,
                                                            autoComplete: 'off',
                                                            form: {
                                                                autoComplete: 'off',
                                                            },
                                                        }}
                                                        onBlur={event => {
                                                            try {
                                                                const valorNumerico = parseFloat(event.target.value);
                                                                if( valorNumerico < 0 ) {
                                                                    event.target.value = 0;
                                                                } else if( valorNumerico > 100 ) {
                                                                    event.target.value = 100;
                                                                }
                                                            } catch {
                                                                event.target.value = 0;
                                                            }
                                                            setComisionIndicada(event.target.value);
                                                        }}
                                                />
                                            </Grid> : null }

                                        <Grid item xs={12} sm={6} md={4} lg={2}>
                                            { !showDeglosePagos ? 
                                                <Button onClick={() => { setShowDeglosePagos(!showDeglosePagos); }} variant="contained" color="primary" className={"color-principal"} style={{ marginTop: "10px" }}>
                                                    &nbsp;&nbsp;Simular Pagos&nbsp;&nbsp;
                                                </Button> : null }
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>

                            { showDeglosePagos ? 
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
                                                {
                                                    cuotasData
                                                        .map(cuota => <tr key={`cuota_${cuota.cuota}`} className={ cuota.recaudable === "No" ? "noCobro" : "" }>
                                                            <td>{cuota.cuota}</td>
                                                            <td>{cuota.fecha}</td>
                                                            <td>{<NumberFormat value={cuota.valor} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                                                            <td>{cuota.recaudable}</td>
                                                        </tr>)
                                                }
                                            </tbody>

                                            <tfoot>
                                                <tr>
                                                <th colSpan="2">TOTAL RECAUDABLE</th>
                                                <th colSpan="2">{<NumberFormat value={totalRecaudable} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</th>
                                                </tr>
                                            </tfoot>
                                        </table>

                                        <br />

                                        <Grid container>
                                            <Grid item xs={12} sm={6} md={8} lg={9}>
                                                <div className="bg-muted p-md b-r-sm" style={{display: "inline-flex", alignItems: "center"}}>
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
                                                <Button onClick={confirmarPoliza} variant="contained" color="primary" className={"color-principal"} style={{ marginTop: "10px" }}>
                                                    &nbsp;&nbsp;Confirmar Póliza&nbsp;&nbsp;
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div> :
                                null
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </div>
    );
}

export default Confirmar;