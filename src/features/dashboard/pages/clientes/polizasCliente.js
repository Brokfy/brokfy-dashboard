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
        margin: theme.spacing(1),
        
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

const PolizasCliente = () => {
    const classes = useStyles();

    const [selectedPoliza, setSelectedPoliza] = useState('');
    const [polizas, setPolizas] = useState([
        {
            tipoPoliza: 1,
            costo: 123123,
            noPoliza: "noPoliza",
            formaPago: "formaPago",
            proximoPago: "proximoPago",
            fechaInicio: "fechaInicio",
            fechaFin: "fechaFin",
            idAseguradoras: 1,
            username: "username",
            productoId: 1,
            habilitada: "Si",
            noAsegurado: "noAsegurado",
            polizaPropia: "Si",
            polizaPdf: "polizaPdf",
            reciboPdf: "reciboPdf",
            rcUsaCanada: "No",
            costoPrimerRecibo: 123123,
            costoRecibosSubsecuentes: 123123,
            primaNeta: 123123,
            idEstadoPoliza: 1,
        },
        {
            tipoPoliza: 1,
            costo: 321321,
            noPoliza: "noPoliza2",
            formaPago: "formaPago",
            proximoPago: "proximoPago",
            fechaInicio: "fechaInicio",
            fechaFin: "fechaFin",
            idAseguradoras: 1,
            username: "username",
            productoId: 1,
            habilitada: "Si",
            noAsegurado: "noAsegurado",
            polizaPropia: "Si",
            polizaPdf: "polizaPdf",
            reciboPdf: "reciboPdf",
            rcUsaCanada: "No",
            costoPrimerRecibo: 321321,
            costoRecibosSubsecuentes: 321321,
            primaNeta: 321321,
            idEstadoPoliza: 1,
        },
        {
            tipoPoliza: 1,
            costo: 321321,
            noPoliza: "noPoliza3",
            formaPago: "formaPago",
            proximoPago: "proximoPago",
            fechaInicio: "fechaInicio",
            fechaFin: "fechaFin",
            idAseguradoras: 1,
            username: "username",
            productoId: 1,
            habilitada: "No",
            noAsegurado: "noAsegurado",
            polizaPropia: "Si",
            polizaPdf: "polizaPdf",
            reciboPdf: "reciboPdf",
            rcUsaCanada: "No",
            costoPrimerRecibo: 321321,
            costoRecibosSubsecuentes: 321321,
            primaNeta: 321321,
            idEstadoPoliza: 3,
        }
    ])

    return (
        <div className={classes.root}>
            {polizas.map(p => {
                return (
                    <ExpansionPanel key={`expansionPanel${p.noPoliza}`} defaultExpanded={selectedPoliza === p.noPoliza} onClick={() => setSelectedPoliza(selectedPoliza === p.noPoliza ? null : p.noPoliza)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1c-content"
                            id={`panel_${p.noPoliza}`}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs="1">
                                    <Avatar className={classes.greenlarge}>{' '}</Avatar>
                                </Grid>
                                <Grid item xs="11">
                                    <Typography className={classes.heading}>{p.noPoliza}</Typography>
                                </Grid>
                            </Grid>




                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                <tbody>
                                    <tr><td width="30%">Municipio</td><td width="70%">municipio</td></tr>
                                    <tr><td width="30%">CodigoPostal</td><td width="70%">codigoPostal</td></tr>
                                    <tr><td width="30%">Estado</td><td width="70%">estado</td></tr>
                                    <tr><td width="30%">Hijos</td><td width="70%">hijos</td></tr>
                                    <tr><td width="30%">Edad</td><td width="70%">edad</td></tr>
                                    <tr><td width="30%">RegimenVivienda</td><td width="70%">regimenVivienda</td></tr>
                                    <tr><td width="30%">SituacionLaboral</td><td width="70%">situacionLaboral</td></tr>
                                    <tr><td width="30%">Hipoteca</td><td width="70%">hipoteca</td></tr>
                                    <tr><td width="30%">Viaja</td><td width="70%">viaja</td></tr>
                                    <tr><td width="30%">Mascotas</td><td width="70%">mascotas</td></tr>
                                    <tr><td width="30%">EstadoCivil</td><td width="70%">estadoCivil</td></tr>
                                    <tr><td width="30%">Profesion</td><td width="70%">idProfesion</td></tr>
                                </tbody>
                            </table>
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button size="small">Cancel</Button>
                            <Button size="small" color="primary">
                                Save
            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                );
            })}



        </div>
    );
}

export default PolizasCliente;