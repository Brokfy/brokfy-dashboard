import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, AppBar, Toolbar, Grid, Typography, Paper, Button } from '@material-ui/core';
import { formatMoney } from '../../../../common/utils';
import { insertPagos, useInsertPagos } from '../../redux/insertPagos';
import BSnackbars from '../../../../components/bsnackbar';

const ResumenPago = (props) => {
    const { insertPagos, insertPagosPending, insertPagosNotify, insertPagosError } = useInsertPagos();
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        secondaryHeadingWhite: {
            fontSize: theme.typography.pxToRem(20),
            color: 'white',
            margin: theme.spacing(2, 0)
        },
    }));
    const classes = useStyles();
    const [procesando, setProcesando] = useState(false);
    const [procesado, setProcesado] = useState(false);
    const procesarPago = () => {
        const { polizas, datosPago, auth } = props;
        insertPagos({
            data: {
                idAseguradora: datosPago.aseguradora,
                monto: datosPago.montoPago,
                fecha: datosPago.fechaPago,
                metodoPago: datosPago.formaPago,
                referencia: datosPago.referenciaPago,
                pagosDetalle: polizas.map(x => {
                    return {
                        idPolizaComision: x.idPolizaComision,
                        monto: x.montoPago,
                    };
                }).filter(item => item.monto > 0)
            },
            token: auth.tokenFirebase
        });
    }

    useEffect(() => {
        if (!procesando && insertPagosPending) {
            setProcesando(true);
            return;
        }

        if( procesando && insertPagosNotify && !insertPagosError ) {
            setProcesado(true);
            return;
        }

        if( procesando && procesado ) {
            props.reset();
        }
    }, [insertPagosError, insertPagosNotify, insertPagosPending, procesado, procesando, props]);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Typography className={classes.secondaryHeadingWhite}>
                                {`Resumen del Pago`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} className={classes.paper}>
                <table className="table invoice-total">
                    <tbody>
                        <tr>
                            <td><strong>Pago Recibido :</strong></td>
                            <td>${formatMoney(props.montoPago)}</td>
                        </tr>
                        <tr>
                            <td><strong>Monto Conciliado :</strong></td>
                            <td>${formatMoney(props.montoConciliado)}</td>
                        </tr>
                        <tr>
                            <td><strong>Monto No Conciliado :</strong></td>
                            <td>${formatMoney(props.montoNoConciliado)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="text-right">
                    <Button onClick={procesarPago} variant="contained" color="primary" className={"color-principal"} disabled={props.montoNoConciliado !== 0 || procesando || insertPagosPending}>
                        {procesando || insertPagosPending ? <i className="fa fa-refresh fa-spin"></i> : null}
                        &nbsp;&nbsp;Registrar Pago&nbsp;&nbsp;
                    </Button>
                </div>
            </Paper>
            <BSnackbars
                severity={ insertPagosError !== null ? "error" : "success" }
                display={ insertPagosNotify === true }
                message={ insertPagosError !== null ? "Hubo un error al registrar el pago" : "Se registró el pago exitosamente" }
                dismiss={ () => insertPagos({ dismiss: true })  }
            />
        </div>
    );
}

ResumenPago.defaultProps = {
    montoPago: 0.00,
    montoConciliado: 0.00,
    montoNoConciliado: 0.00,
}


ResumenPago.propTypes = {
    montoPago: PropTypes.number.isRequired,
    montoConciliado: PropTypes.number.isRequired,
    montoNoConciliado: PropTypes.number.isRequired,
}

export default ResumenPago;