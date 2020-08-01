import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useDashboardPolizaPorVencer } from '../../redux/dashboardPolizaPorVencer';
import PolizaDrawer from '../polizas/polizaDrawer';
import BLoading from '../../../../components/bloading';
import { Link, FormControl, InputLabel, Select, Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';
import format from 'date-fns/format';
import MuiAlert from '@material-ui/lab/Alert';
import { FolderOutlined } from '@material-ui/icons';

const PolizasPorVencer = ({ tipoPoliza }) => {

    const { auth } = useGetToken();
    const [poliza, setPoliza] = useState("");
    const [selectedTipoPoliza, setSelectedTipoPoliza] = useState(0);
    const [open, setOpen] = useState(false);
    const { polizasPorVencer, dashboardPolizaPorVencer, dashboardPolizaPorVencerPending } = useDashboardPolizaPorVencer();
    const [busco, setBusco] = useState(false);

    const seleccionarPoliza = (noPoliza) => {
        setPoliza(noPoliza);
        setOpen(true);
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    const NoHayRegistros = () => {
        return (
            <div className="ibox-content ibox-heading" style={{ textAlign: "center" }}>
                <h3>No se encontraron pólizas por vencer</h3>
                <small style={{fontSize: "inherit"}}>
                    El período consultado es el comprendido entre el <b>{format(new Date(), 'dd/MM/yyyy')}</b> al <b>{format(new Date((new Date()).setDate((new Date().getDate()) + 7)), 'dd/MM/yyyy')}</b>.
                </small>
            </div>
        );
    }

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
                            {!busco ? null :
                                ( !polizasPorVencer || polizasPorVencer.length <= 0 ) ? <NoHayRegistros /> :
                                <table className="table table-bordered" style={{marginBottom: 0}}>
                                    <thead>
                                        <tr>
                                            <th>Póliza</th>
                                            <th>Tipo</th>
                                            <th>Aseguradora</th>
                                            <th>Vencimiento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            polizasPorVencer.map((p, i) => <tr key={`misClientes_${i.toString()}`}>
                                                <td><Link className="detallePoliza" onClick={() => seleccionarPoliza(p.noPoliza)}>{p.noPoliza}</Link></td>
                                                <td>{p.tipoPoliza}</td>
                                                <td>{p.aseguradora}</td>
                                                <td>{format(new Date(p.fechaFin), 'dd/MM/yyyy')}</td>
                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            }
                            <PolizaDrawer polizaDraw={poliza} open={open} setOpen={setOpen} />
                        </div>
                </div>
            </div>
        </div>
    );
}

export default PolizasPorVencer;