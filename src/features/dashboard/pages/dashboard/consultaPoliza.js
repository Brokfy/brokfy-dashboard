import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useDashboardConsultaPoliza } from '../../redux/dashboardConsultaPoliza';
import PolizaDrawer from '../polizas/polizaDrawer';
import BLoading from '../../../../components/bloading';
import { FormControl, Link, Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';
import format from 'date-fns/format';
import MuiAlert from '@material-ui/lab/Alert';


const ConsultaPoliza = () => {

    const [poliza, setPoliza] = useState("");
    const { auth } = useGetToken();
    const { consultaPoliza, dashboardConsultaPoliza, dashboardConsultaPolizaPending } = useDashboardConsultaPoliza();
    const [busco, setBusco] = useState(false);

    const [open, setOpen] = useState(false);

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



    const buscarPoliza = (e) => {
        e.preventDefault();
        dashboardConsultaPoliza({ tokenFirebase: auth.tokenFirebase, noPoliza: poliza });
    }

    const buscarPolizaNo = () => {
        setBusco(true);
        dashboardConsultaPoliza({ tokenFirebase: auth.tokenFirebase, noPoliza: poliza });
    }


    return (
        <div className="panel panel-default" style={{ marginBottom: "20px" }}>
            <div className="panel-body panel-body-alt-2">
                <span className="titulo-panel">Consulta Poliza</span>
                <Grid container spacing={1}>
                    <Grid item lg={10} md={8}>
                        <InputBase
                            className="rbt-input"
                            placeholder="Buscar poliza"
                            inputProps={{ 'aria-label': 'Buscar poliza' }}
                            onChange={(e) => setPoliza(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" ? buscarPoliza(e) : null}
                        />
                    </Grid>
                    <Grid item lg={2} md={4}>
                        <Button onClick={() => buscarPolizaNo()} color="primary">
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>

                <div className="dashboard-panel">
                    {busco ? null :
                        <MuiAlert className="alert-pad" elevation={6} variant="filled" severity="info" >Escriba el número de póliza y presione Enter</MuiAlert>}
                    {!consultaPoliza ? null :
                        <div>
                            <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                <tbody>
                                    <tr>
                                        <td width="15%">Póliza</td><td width="40%" ><Link className="detallePoliza" onClick={() => setOpen(true)}>{consultaPoliza.noPoliza}</Link></td>
                                        <td width="15%">Brokfy</td><td width="20%">{consultaPoliza.polizaPropia == "Si" ? "Si" : "No"}</td>
                                    </tr>
                                    <tr>
                                        <td width="15%">Periodo</td><td width="40%">{`${format(new Date(consultaPoliza.fechaInicio), 'dd/MM/yyyy')} - ${format(new Date(consultaPoliza.fechaFin), 'dd/MM/yyyy')}`}</td>
                                        <td width="15%">Tipo</td><td width="20%">{consultaPoliza.tipoPoliza}</td>
                                    </tr>
                                    <tr>
                                        <td width="15%">Cliente</td><td width="40%">{consultaPoliza.cliente}</td>
                                        <td width="15%">Estado</td><td width="20%">{consultaPoliza.estadoPoliza}</td>
                                    </tr>
                                    <tr>
                                        <td width="15%">Aseguradora</td><td width="85%">{consultaPoliza.aseguradora}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <PolizaDrawer polizaDraw={poliza} open={open} setOpen={setOpen} />
                        </div>

                    }
                </div>
            </div>

        </div>
    );
}

export default ConsultaPoliza;