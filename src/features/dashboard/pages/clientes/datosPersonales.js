import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { teal, indigo } from '@material-ui/core/colors';
import format from 'date-fns/format';

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
        marginTop: "28px",
        width: theme.spacing(7),
        height: theme.spacing(7),
        color: "#FFF",
        backgroundColor: "#6097ef",
        position: "relative",
        bottom: "10px",
    },
    parrafo: {
        marginBottom: "2px",
    },
}));

const DatosPersonales = ({ nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, sexo, email, username, estado }) => {
    const classes = useStyles();

    const calculateAge = (birthday)  => {
        var ageDifMs = Date.now() - birthday;
        var ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    return (
        <div className="panel panel-default" style={{ marginBottom: "0px" }}>
            {/* <div className="panel-heading">
                Datos Personales
            </div> */}
            <br />
            <div className="panel-body">
                <Grid container spacing={3}>
                    <Grid item md={3} lg={2}>
                        <Avatar className={classes.large}>{`${nombre.toUpperCase().charAt(0)}${apellidoPaterno.toUpperCase().charAt(0)}`}</Avatar>
                    </Grid>
                    <Grid item md={9} lg={10}>
                        <span className="titulo-nombre">{`${nombre} ${apellidoPaterno} ${apellidoMaterno}`}</span>
                        <p className={classes.parrafo}>{ calculateAge(new Date(fechaNacimiento)) } años - {sexo}</p>
                        { estado && estado !== "" ? <p className={classes.parrafo}><i className="fa fa-map-marker"></i> {estado}</p> : null }
                        <p className={classes.parrafo}><i className="fa fa-envelope"></i> <a href={`mailto:${email}`}>{email}</a></p>
                        <p className={classes.parrafo}><i className="fa fa-phone"></i> <a href={`tel:${username}`}>{username}</a></p>
                    </Grid>
                </Grid>


            </div>
            <br />
        </div>
    );
}

export default DatosPersonales;