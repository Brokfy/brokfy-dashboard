import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { PageNotFound } from '../../../common';
import { useGetToken } from '../../../common/redux/hooks';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { green, red } from '@material-ui/core/colors';
import { useCancelarPoliza } from '../../redux/cancelarPoliza';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    details: {
        alignItems: 'center',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    cgreen: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    cred: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    redlarge: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },
    greenlarge: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
}));

const PolizasCliente = ({ polizas }) => {
    const classes = useStyles();
    const { auth } = useGetToken();
    const [selectedPoliza, setSelectedPoliza] = useState('');
    const [confirmando, setConfirmando] = useState(false);
    const [confirmado, setConfirmado] = useState(false);
    const history = useHistory();
    const { cancelarPoliza, cancelarPolizaPending, cancelarPolizaError, cancelarPolizaNotify } = useCancelarPoliza();

    useEffect(() => {
        if (confirmando && cancelarPolizaNotify && !cancelarPolizaError) {
            setConfirmado(true);
            return;
        }

        if (confirmando && confirmado) {
            setSelectedPoliza('');
            history.push(`/clientes`);
        }
    }, [confirmando, cancelarPolizaNotify, cancelarPolizaError, confirmado, history])

    const hacerConfirmacionPoliza = (noPoliza) => {

        cancelarPoliza({ token: auth.tokenFirebase, noPoliza: noPoliza });
        setConfirmando(true);
    }


    return (
        <div className="panel panel-default" style={{ marginBottom: "0px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Lista de Polizas</span>
                <br /><br />
                <div className={classes.root}>
                    {polizas.length <= 0 ? <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body1">El cliente seleccionado no posee polizas registradas</Typography>
                        </Grid>
                    </Grid> : null}
                    {polizas.map(p => {
                        return (
                            <ExpansionPanel key={`expansionPanel${p.noPoliza}`} defaultExpanded={selectedPoliza === p.noPoliza} onClick={() => setSelectedPoliza(selectedPoliza === p.noPoliza ? null : p.noPoliza)}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1c-content"
                                    id={`panel_${p.noPoliza}`}
                                >
                                    <Grid container spacing={3}>
                                        <Grid item xs={1}>
                                            <Avatar className={p.estadoPoliza == "ACTIVA" ? classes.greenlarge : classes.redlarge}>{' '}</Avatar>
                                        </Grid>
                                        <Grid item xs={11}>
                                            <Typography className={classes.heading}>{p.noPoliza}</Typography>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes.details}>
                                    <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                        <tbody>
                                            <tr><td>Tipo</td><td>{p.tipoPoliza}</td></tr>
                                            <tr><td>FormaPago</td><td>{p.formaPago}</td></tr>
                                            <tr><td>FechaInicio</td><td>{p.fechaInicio}</td></tr>
                                            <tr><td>FechaFin</td><td>{p.fechaFin}</td></tr>
                                            <tr><td>Aseguradora</td><td>{p.aseguradora}</td></tr>
                                            <tr><td>Producto</td><td>{p.producto}</td></tr>
                                            <tr><td>PolizaPropia</td><td>{p.polizaPropia}</td></tr>
                                        </tbody>
                                    </table>

                                </ExpansionPanelDetails>
                                <ExpansionPanelActions>
                                    <Divider />
                                    <Button size="small" color="secondary" onClick={() => hacerConfirmacionPoliza(p.noPoliza)}>
                                        Cancelar Poliza
                            </Button>
                                </ExpansionPanelActions>

                            </ExpansionPanel>
                        );
                    })}



                </div>

            </div>
        </div>
    );
}

export default PolizasCliente;