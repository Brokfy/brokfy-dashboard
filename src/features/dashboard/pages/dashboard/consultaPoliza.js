import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BLoading from '../../../../components/bloading';
import { Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';

const ConsultaPoliza = () => {
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

    return (
        <div className="panel panel-default" style={{ marginBottom: "20px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Consulta Poliza</span>
                <br /><br />
                <Paper component="form" >
                    <IconButton onClick={(e) => { }} color="primary" className={classes.iconButton} aria-label="directions">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Buscar poliza"
                        inputProps={{ 'aria-label': 'Buscar poliza' }}
                        onChange={() => { }}
                        onKeyPress={(event) => { }}
                    />

                </Paper>
                <br />
                <Grid container spacing={3}>
                    <Grid item xs="7">
                        <table className="table table-hover" style={{ marginBottom: "0px" }}>
                            <tbody>
                                <tr><td width="30%">Periodo</td><td width="70%">10/10/2019 - 10/10/2020</td></tr>
                                <tr><td width="30%">Cliente</td><td width="70%">Juan Nepomuseno Leon</td></tr>
                                <tr><td width="30%">Aseguradora</td><td width="70%">Mapfre</td></tr>
                            </tbody>
                        </table>
                    </Grid>
                    <Grid item xs="5">
                        <table className="table table-hover" style={{ marginBottom: "0px" }}>
                            <tbody>
                                <tr><td width="30%">Brokfy</td><td width="70%">Si</td></tr>
                                <tr><td width="30%">Tipo</td><td width="70%">Auto</td></tr>
                                <tr><td width="30%">Estado</td><td width="70%">ACTIVA</td></tr>
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default ConsultaPoliza;