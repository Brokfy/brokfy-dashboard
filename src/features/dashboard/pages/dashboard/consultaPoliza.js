import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useDashboardConsultaPoliza } from '../../redux/dashboardConsultaPoliza';
import BLoading from '../../../../components/bloading';
import { Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';
import format from 'date-fns/format'

const ConsultaPoliza = () => {

    const [poliza, setPoliza] = useState("");
    const { auth } = useGetToken();

    const useStyles = makeStyles((theme) => ({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        secondaryHeadingWhite: {
            fontSize: theme.typography.pxToRem(20),
            color: 'white',
            margin: theme.spacing(2, 0)
        },
        input: {
            marginLeft: theme.spacing(1),
        },
        iconButton: {
            padding: 5,
        },
    }));
    const classes = useStyles();
    const { consultaPoliza, dashboardConsultaPoliza, dashboardConsultaPolizaPending } = useDashboardConsultaPoliza();


    const buscarPoliza = (e) => {
        e.preventDefault();
        dashboardConsultaPoliza({ tokenFirebase: auth.tokenFirebase, noPoliza: poliza });
    }

    const buscarPolizaNo = () => {
        dashboardConsultaPoliza({ tokenFirebase: auth.tokenFirebase, noPoliza: poliza });
    }


    console.log(consultaPoliza)

    return (
        <div className="panel panel-default" style={{ marginBottom: "20px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Consulta Poliza</span>
                <br /><br />
                <Paper component="form" >
                    <IconButton onClick={() => buscarPolizaNo()} color="primary" className={classes.iconButton} aria-label="directions">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Buscar poliza"
                        inputProps={{ 'aria-label': 'Buscar poliza' }}
                        onChange={(e) => setPoliza(e.target.value)}
                        onKeyPress={(e) => e.key == "Enter" ? buscarPoliza(e) : null}
                    />

                </Paper>
                <br />
                {consultaPoliza !== '' && consultaPoliza !== null ?
                    <Grid container spacing={3}>
                        <Grid item xs={7}>
                            <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                <tbody>
                                    <tr><td width="30%">Periodo</td><td width="70%">{`${format(new Date(consultaPoliza.fechaInicio), 'dd/MM/yyyy')} - ${format(new Date(consultaPoliza.fechaFin), 'dd/MM/yyyy')}`}</td></tr>
                                    <tr><td width="30%">Cliente</td><td width="70%">{consultaPoliza.cliente}</td></tr>
                                    <tr><td width="30%">Aseguradora</td><td width="70%">{consultaPoliza.aseguradora}</td></tr>
                                </tbody>
                            </table>
                        </Grid>
                        <Grid item xs={5}>
                            <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                <tbody>
                                    <tr><td width="30%">Brokfy</td><td width="70%">{consultaPoliza.polizaPropia == "Si" ? "Si" : "No"}</td></tr>
                                    <tr><td width="30%">Tipo</td><td width="70%">{consultaPoliza.tipoPoliza}</td></tr>
                                    <tr><td width="30%">Estado</td><td width="70%">{consultaPoliza.estadoPoliza}</td></tr>
                                </tbody>
                            </table>
                        </Grid>
                    </Grid>
                    : null
                }
            </div>
        </div>
    );
}

export default ConsultaPoliza;