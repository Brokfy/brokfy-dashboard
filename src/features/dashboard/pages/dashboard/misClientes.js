import React, { useState, useEffect, useCallback } from 'react';
import { useDashboardMisClientes } from '../../redux/dashboardMisClientes';
import PolizaDrawer from '../polizas/polizaDrawer';
import { Link, Grid, makeStyles, Button, } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Typeahead } from 'react-bootstrap-typeahead';
import TableClients from './tableClient';

import MuiAlert from '@material-ui/lab/Alert';

function filterBy(option, state) {
    const { nombre, username } = option;
    const optionText = `${nombre}(${username})`;
    if (state.selected.length) {
        return true;
    }
    return optionText.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
}

const MisClientes = ({ clientes, auth }) => {
    const [selectedClient, setSelectedCliente] = useState("");
    const { polizasCliente, dashboardMisClientes, dashboardMisClientesPending } = useDashboardMisClientes();
  
    const [poliza, setPoliza] = useState("");
    const [selectedTipoPoliza, setSelectedTipoPoliza] = useState(0);
    const [open, setOpen] = useState(false);
    const [busco, setBusco] = useState(false);

    const seleccionarPoliza = (noPoliza) => {
        setPoliza(noPoliza);
        setOpen(true);
    }

    const buscarPolizas = () => {
        setBusco(true);
        if (selectedClient !== '')
            dashboardMisClientes({ username: selectedClient, tokenFirebase: auth.tokenFirebase });
    }

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

    const NoHayRegistros = () => {
        return (
            <div className="ibox-content ibox-heading" style={{ textAlign: "center" }}>
                <h3>No se encontraron pólizas para el cliente seleccionado</h3>
            </div>
        );
    }

    console.log('EJECUCION ====== RELOAD o DRAW');

    return (
        <div className="panel panel-default">
            <div className="panel-body panel-body-alt-2">
                <span className="titulo-panel">Mis Clientes</span>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        { 
                            clientes ? 
                                <Typeahead
                                    labelKey={"nombre"}
                                    key={"username"}
                                    filterBy={filterBy}
                                    id="toggle-example"
                                    options={clientes}
                                    onChange={(e) => e.length <= 0 || e.length > 1 ? null : setSelectedCliente(e[0].username)}
                                    placeholder="Buscar cliente">
                                </Typeahead> :
                                null
                        }
                    </Grid>
                    <Grid item xs={2}>
                        <Button color="primary" onClick={buscarPolizas} disabled={selectedClient === ""}>
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>
                
            </div>
        </div>
    )
}

export default React.memo(MisClientes);

