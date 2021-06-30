import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useGetDashboardInit } from '../../redux/getDashboardInit';
import BLoading from '../../../../components/bloading';
import { Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';

import ConsultaPoliza from './consultaPoliza';
import PolizasPorVencer from './polizasPorVencer';
import MisClientes from './misClientes';
import Descargas from './descargas';
import Grafico from './grafico';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const [datosCargados, setDatosCargados] = useState(true);

    const { auth } = useGetToken();
    const { dashboardInit, getDashboardInit, getDashboardInitPending } = useGetDashboardInit();

    const [tipoPoliza, setTipoPoliza] = useState();
    const [clientes, setClientes] = useState();

    useEffect(() => {
        if (!auth || !auth.tokenFirebase)
            return;

        getDashboardInit({ tokenFirebase: auth.tokenFirebase });
    }, [getDashboardInit, auth]);

    useEffect(() => {
        if (dashboardInit) {
            setTipoPoliza(dashboardInit.tipoPoliza);
            setClientes(dashboardInit.clientes);
        }
    }, [dashboardInit]);

    return (
        <div>
            {loading === true ? <BLoading /> : null}
            {!datosCargados && loading ? null :
                <div className={"inicioDashboard"}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} lg={6} xl={4}>
                            <ConsultaPoliza />
                        </Grid>

                        <Grid item xs={12} lg={6} xl={4}>
                            <PolizasPorVencer tipoPoliza={tipoPoliza} />
                        </Grid>

                        <Grid item xs={12} lg={6} xl={4}>
                            <MisClientes clientes={clientes} auth={auth} />
                        </Grid>

                        <Grid item xs={12} lg={6} xl={4}>
                            <Descargas />
                        </Grid>

                        <Grid item xs={12} lg={6} xl={4}>
                            {!dashboardInit ? "Cargando..." :
                                <Grafico grafico={dashboardInit.grafico} />
                            }
                        </Grid>
                    </Grid>
                    {/* <Divider orientation={"horizontal"} /> */}
                    {/* <br />
                    <Grid container spacing={3}>



                    </Grid> */}
                </div>}
        </div >
    );
}

export default Dashboard;