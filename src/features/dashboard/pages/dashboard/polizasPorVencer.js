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

const PolizasPorVencer = ({ tipoPoliza }) => {

    const { auth } = useGetToken();
    const [poliza, setPoliza] = useState("");
    const [selectedTipoPoliza, setSelectedTipoPoliza] = useState(0);
    const [open, setOpen] = useState(false);
    const { polizasPorVencer, dashboardPolizaPorVencer, dashboardPolizaPorVencerPending } = useDashboardPolizaPorVencer();

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
    return (
        <div className="panel panel-default" style={{ marginBottom: "20px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Pólizas por vencer</span>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <FormControl style={{ margin: '0' }}>
                            <Select
                                onChange={(event) => setSelectedTipoPoliza(event.target.value)}
                            >
                                {!tipoPoliza || tipoPoliza.length <= 0 ? null :
                                    tipoPoliza.map(x => <MenuItem key={`menuItem${x.id}`} value={x.id}>{x.tipo}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <Button size="small" onClick={() => dashboardPolizaPorVencer({ tokenFirebase: auth.tokenFirebase, tipoPoliza: selectedTipoPoliza })} color="primary">
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>
                <div className="dashboard-panel-alt">
                    {!polizasPorVencer || polizasPorVencer.lenght <= 0 ?
                        <MuiAlert elevation={6} variant="filled" severity="info" >Seleccione el tipo de póliza</MuiAlert> :
                        <div>
                            <table className="table table-hover " style={{ marginBottom: "0px" }}>
                                <tbody>
                                    {polizasPorVencer.map(p => <tr>
                                        <td width="25%"><Link className="detallePoliza" onClick={() => seleccionarPoliza(p.noPoliza)}>{p.noPoliza}</Link></td>
                                        <td width="25%">{p.tipoPoliza}</td>
                                        <td width="25%">{p.aseguradora}</td>
                                        <td width="25%">{format(new Date(p.fechaFin), 'dd/MM/yyyy')}</td>
                                    </tr>
                                    )}
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

export default PolizasPorVencer;