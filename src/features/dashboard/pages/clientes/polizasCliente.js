import React, { useState, useEffect } from 'react';
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

    const [selectedPoliza, setSelectedPoliza] = useState('');

    const cancelarPoliza = (noPoliza) => {
        
    }


    return (
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
                        <Divider />
                        <ExpansionPanelActions>
                            <Button size="small" color="primary" onClick={() => cancelarPoliza(p.noPoliza)}>
                                Cancelar Poliza
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                );
            })}



        </div>
    );
}

export default PolizasCliente;