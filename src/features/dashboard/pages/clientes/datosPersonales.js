import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { teal, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    cTeal: {
        color: theme.palette.getContrastText(teal[500]),
        backgroundColor: teal[500],
    },
    cIndigo: {
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
    },
    large: {
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: theme.palette.getContrastText(indigo[500]),
        backgroundColor: indigo[500],
    },
}));

const DatosPersonales = () => {
    const classes = useStyles();

    return (
        <div className="panel panel-default" style={{ marginBottom: "0px" }}>
            {/* <div className="panel-heading">
                Datos Personales
            </div> */}
            <br />
            <div className="panel-body">
                <Grid container spacing={3}>
                    <Grid item xs="2">
                        <Avatar className={classes.large}>VG</Avatar>
                    </Grid>
                    <Grid item xs="10">
                        <span className="titulo-nombre">Vianney Gutierrez Gonzalez</span>
                        <br />
                        Fecha Nacimiento: 17/08/1986 <br />
                        Sexo: Femenino <br />
                        Email: sachiel17@gmail.com <br />
                        Telefono: 990564966
                    </Grid>
                </Grid>


            </div>
            <br />
        </div>
    );
}

export default DatosPersonales;