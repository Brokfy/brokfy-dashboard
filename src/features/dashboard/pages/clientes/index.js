import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchListadoUsuario } from '../../redux/fetchListadoUsuario';
import BLoading from '../../../../components/bloading';
import { getCRUDConfig } from '../../../../common/utils';
import { Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button } from '@material-ui/core';
import { NumberFormatCustom } from '../../../../common/utils';

import DatosPersonales from './datosPersonales';
import PerfilAsegurado from './perfilAsegurado';
import PolizasCliente from './polizasCliente';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';

const Clientes = () => {
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState(false);
    const [datosGrid, setDatosGrid] = useState([]);
    const [inputBuscarCliente, setInputBuscarCliente] = useState('');
    const { auth } = useGetToken();
    const [columns, setColumns] = useState([
        { name: "nombre", label: "Nombre", type: "string", options: { filter: false, sort: true, display: true } },
        { name: "apellidoPaterno", label: "ApellidoPaterno", type: "string", options: { filter: true, sort: true, display: true } },
        { name: "apellidoMaterno", label: "ApellidoMaterno", type: "string", options: { filter: true, sort: true, display: true } },
        { name: "fechaNacimiento", label: "FechaNacimiento", type: "string", options: { filter: false, sort: false, display: false } },
        { name: "sexo", label: "Sexo", type: "string", options: { filter: false, sort: false, display: false } },
        { name: "email", label: "Email", type: "string", options: { filter: false, sort: false, display: false } },
        { name: "username", label: "Username", type: "string", options: { filter: true, sort: true, display: true } },
    ])

    const { listadoUsuarios, fetchListadoUsuario, fetchListadoUsuarioPending } = useFetchListadoUsuario();

    useEffect(() => {
        if (auth.tokenFirebase === "") return;
        if (fetchListadoUsuarioPending) return;

        if (!datosCargados) {
            fetchListadoUsuario(auth.tokenFirebase);
            setDatosCargados(true);
            return;
        }

        setLoading(false);
        setDatosGrid(listadoUsuarios);
    }, [auth.tokenFirebase, fetchListadoUsuarioPending, listadoUsuarios, datosCargados, fetchListadoUsuario]);

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

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(value);
    };

    const buscarClientes = (e) => {
        e.preventDefault();
        console.log(inputBuscarCliente);
    }

    return (
        <div>
            {loading === true ? <BLoading /> : null}
            {datosCargados && !loading ?
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={3} >
                            <div className="panel panel-default" style={{ marginBottom: "20px" }}>
                                <div className="panel-heading">
                                    Lista de Usuarios
                                    </div>
                                <div className="panel-body">

                                    <Paper component="form" >
                                        <IconButton onClick={(e) => buscarClientes(e)} color="primary" className={classes.iconButton} aria-label="directions">
                                            <SearchIcon />
                                        </IconButton>
                                        <InputBase
                                            className={classes.input}
                                            placeholder="Buscar clientes"
                                            inputProps={{ 'aria-label': 'Buscar clientes' }}
                                            onChange={(event) => setInputBuscarCliente(event.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    buscarClientes(e);
                                                }
                                            }}
                                        />

                                    </Paper>


                                    <List className={classes.root}>
                                        {listadoUsuarios.map((us) => {
                                            const labelId = `checkbox-list-label-${us.username}`;
                                            return (
                                                <ListItem key={us.username} role={undefined} dense button onClick={handleToggle(us.username)}>
                                                    <ListItemIcon>
                                                        <Checkbox
                                                            edge="start"
                                                            checked={checked.indexOf(us.username) !== -1}
                                                            tabIndex={-1}
                                                            disableRipple
                                                            inputProps={{ 'aria-labelledby': labelId }}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText primary={` ${us.nombre} ${us.apellidoPaterno ? us.apellidoPaterno : ""} ${us.apellidoMaterno ? us.apellidoMaterno : ""}`} secondary={us.username} />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={9} >
                            <Grid container spacing={3}>

                                <Grid item xs={5} >
                                    <Grid container spacing={3}>

                                        <Grid item xs={12}>
                                            <DatosPersonales />
                                        </Grid>

                                        <Grid item xs={12}>
                                            <PerfilAsegurado />
                                        </Grid>

                                    </Grid>
                                </Grid>

                                <Grid item xs={7}>
                                    <PolizasCliente />
                                </Grid>


                            </Grid>

                        </Grid>
                    </Grid>
                </div>
                : null}
        </div >
    );
}

export default Clientes;