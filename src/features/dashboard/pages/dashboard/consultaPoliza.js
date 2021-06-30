import React, { useState } from 'react';
import { useDashboardConsultaPoliza } from '../../redux/dashboardConsultaPoliza';
import { InputBase,  Grid, makeStyles, Button,} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ConsultaPolizaTable from './consultaPolizaTable';
import MuiAlert from '@material-ui/lab/Alert';


const ConsultaPoliza = ({auth}) => {

    const [poliza, setPoliza] = useState("");
    const { consultaPoliza, dashboardConsultaPoliza, dashboardConsultaPolizaPending } = useDashboardConsultaPoliza();
    const [busco, setBusco] = useState(false);


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
        <div className="panel panel-default">
            <div className="panel-body panel-body-alt-2">
                <span className="titulo-panel">Consulta por Póliza</span>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <InputBase
                            className="rbt-input"
                            placeholder="Buscar póliza"
                            inputProps={{ 'aria-label': 'Buscar póliza' }}
                            onChange={(e) => setPoliza(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" ? buscarPoliza(e) : null}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => buscarPolizaNo()} color="primary" disabled={poliza === ""}>
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>

                <div className="dashboard-panel">
                    {busco ? null :
                        <MuiAlert className="alert-pad" elevation={6} variant="filled" severity="info" >Escriba el número de póliza y presione Enter</MuiAlert>}
                    <ConsultaPolizaTable busco = {busco} consultaPoliza = {consultaPoliza} poliza = {poliza} />
                </div>
            </div>

        </div>
    );
}

export default ConsultaPoliza;