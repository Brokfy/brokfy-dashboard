import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BLoading from '../../../../components/bloading';
import { Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';

const MisClientes = () => {
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
                <span className="titulo-panel">Mis Clientes</span>
                <br /><br />
                <Paper component="form" >
                    <IconButton onClick={(e) => { }} color="primary" className={classes.iconButton} aria-label="directions">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        className={classes.input}
                        placeholder="Buscar cliente"
                        inputProps={{ 'aria-label': 'Buscar cliente' }}
                        onChange={() => { }}
                        onKeyPress={(event) => { }}
                    />

                </Paper>
                <br />
                <table className="table table-hover" style={{ marginBottom: "0px" }}>
                    <tbody>
                        <tr><td width="30%">Andres Zuniga</td><td width="30%">35465461561 (Auto)</td></tr>
                        <tr><td width="30%">Andres Zuniga</td><td width="30%">35465461561 (Auto)</td></tr>
                        <tr><td width="30%">Andres Zuniga</td><td width="30%">35465461561 (Auto)</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MisClientes;