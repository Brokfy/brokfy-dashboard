import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BLoading from '../../../../components/bloading';
import { FormControl, InputLabel, Select, Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';

const PolizasPorVencer = () => {
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    return (
        <div className="panel panel-default" style={{ marginBottom: "20px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Polizas por vencer</span>
                <FormControl style={{ margin: '0' }}>
                    <InputLabel id="demo-simple-select-label">Tipo Poliza</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        onChange={(event) => { }}
                    >
                        <MenuItem value={1}>Auto</MenuItem>
                        <MenuItem value={2}>Moto</MenuItem>
                    </Select>
                </FormControl>
                <br /><br />
                <table className="table table-hover" style={{ marginBottom: "0px" }}>
                    <tbody>
                        <tr><td width="30%">6546124651</td><td width="30%">Auto</td><td>10/10/2020</td></tr>
                        <tr><td width="30%">6546124651</td><td width="30%">Auto</td><td>10/10/2020</td></tr>
                        <tr><td width="30%">6546124651</td><td width="30%">Auto</td><td>10/10/2020</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PolizasPorVencer;