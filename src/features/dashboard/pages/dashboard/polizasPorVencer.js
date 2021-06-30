import React, { useState, useEffect } from 'react';
import { useDashboardPolizaPorVencer } from '../../redux/dashboardPolizaPorVencer';
import { Link, FormControl, InputLabel, Select, Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MuiAlert from '@material-ui/lab/Alert';
import PolizasPorVencerTable from './polizasPorVencerTable';

const PolizasPorVencer = ({ tipoPoliza, auth }) => {

  
    const [selectedTipoPoliza, setSelectedTipoPoliza] = useState(0);

    const { polizasPorVencer, dashboardPolizaPorVencer, dashboardPolizaPorVencerPending } = useDashboardPolizaPorVencer();
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
        <div className="panel panel-default">
            <div className="panel-body panel-body-alt-2">
                <span className="titulo-panel">Pólizas por Vencer</span>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <FormControl style={{ margin: '0' }}>
                            <Select
                                onChange={(event) => setSelectedTipoPoliza(event.target.value)}
                            >
                                {!tipoPoliza || tipoPoliza.length <= 0 ? null :
                                    tipoPoliza.map(x => 
                                    <MenuItem key={`menuItem${x.id}`} value={x.id}>{x.tipo}</MenuItem>
                                    )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Button size="small" onClick={() => {
                            dashboardPolizaPorVencer({ tokenFirebase: auth.tokenFirebase, tipoPoliza: selectedTipoPoliza });
                            setBusco(true);
                        }} color="primary" disabled={selectedTipoPoliza===0}>
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>
                <div className="dashboard-panel-alt">
                        {busco ? null : <MuiAlert className="alert-pad" elevation={6} variant="filled" severity="info" >Seleccione el tipo de póliza</MuiAlert>}
                        <div>
                            <PolizasPorVencerTable busco={busco} polizasPorVencer={polizasPorVencer} />
                        </div>
                </div>
            </div>
        </div>
    );
}

export default PolizasPorVencer;