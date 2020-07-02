import React, { useState, useEffect, useCallback } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useDashboardMisClientes } from '../../redux/dashboardMisClientes';
import PolizaDrawer from '../polizas/polizaDrawer';
import BLoading from '../../../../components/bloading';
import { Link, Paper, InputBase, Divider, InputAdornment, Grid, TextField, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';
import { Typeahead } from 'react-bootstrap-typeahead';
import options from './data';
import MuiAlert from '@material-ui/lab/Alert';

function filterBy(option, state) {
    const { nombre, username } = option;
    const optionText = `${nombre}(${username})`;
    if (state.selected.length) {
        return true;
    }
    return optionText.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
}

const MisClientes = ({ clientes }) => {

    const [selectedClient, setSelectedCliente] = useState("");
    const { polizasCliente, dashboardMisClientes, dashboardMisClientesPending } = useDashboardMisClientes();
    const { auth } = useGetToken();
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

    return (
        <div className="panel panel-default">
            <div className="panel-body panel-body-alt-2">
                <span className="titulo-panel">Mis Clientes</span>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Typeahead
                            labelKey={"nombre"}
                            key={"username"}
                            filterBy={filterBy}
                            id="toggle-example"
                            options={clientes}
                            onChange={(e) => e.length <= 0 || e.length > 1 ? null : setSelectedCliente(e[0].username)}
                            placeholder="Buscar cliente">
                        </Typeahead>
                    </Grid>
                    <Grid item xs={2}>
                        <Button color="primary" onClick={buscarPolizas} disabled={selectedClient === ""}>
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>
                <div className="dashboard-panel">
                    {busco ? null : <MuiAlert className="alert-pad" elevation={6} variant="filled" severity="info" >Escriba los datos del cliente</MuiAlert>}
                    {!polizasCliente || polizasCliente.length <= 0 || !busco ? null :
                        <table className="table table-bordered" style={{marginBottom: 0}}>
                            <thead>
                                <tr>
                                    <th>Póliza</th>
                                    <th>Tipo</th>
                                    <th>Aseguradora</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    polizasCliente.map((p, i) => <tr key={`misClientes_${i.toString()}`}>
                                        <td><Link className="detallePoliza" onClick={() => seleccionarPoliza(p.noPoliza)}>{p.noPoliza}</Link></td>
                                        <td>{p.tipoPoliza}</td>
                                        <td>{p.aseguradora}</td>
                                        <td>{p.estadoPoliza}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    }
                    <PolizaDrawer polizaDraw={poliza} open={open} setOpen={setOpen} />
                </div>
            </div>
        </div>
    )
}

export default MisClientes;