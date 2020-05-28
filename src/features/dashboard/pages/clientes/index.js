import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchListadoUsuario } from '../../redux/fetchListadoUsuario';
import { useFetchDetalleUsuario } from '../../redux/fetchDetalleUsuario';
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
    const [inputBuscarCliente, setInputBuscarCliente] = useState('');
    const { auth } = useGetToken();
    const [listaLocal, setListaLocal] = useState([]);

    const { listadoUsuarios, fetchListadoUsuario, fetchListadoUsuarioPending } = useFetchListadoUsuario();
    const { detalleUsuario, fetchDetalleUsuario, fetchDetalleUsuarioPending } = useFetchDetalleUsuario();

    useEffect(() => {
        if (auth.tokenFirebase === "") return;
        if (fetchListadoUsuarioPending) return;

        if (!datosCargados) {
            fetchListadoUsuario(auth.tokenFirebase);
            setDatosCargados(true);
            return;
        }

        if (listadoUsuarios.length > 0)
            setListaLocal(listadoUsuarios);

        setLoading(false);
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
        console.log(value)
        fetchDetalleUsuario({ username: value, tokenFirebase: auth.tokenFirebase });
    };

    const buscarClientes = (e) => {
        let busqueda = e.target.value;
        setListaLocal(listadoUsuarios.filter(us =>
            us.nombre.toUpperCase().includes(busqueda.toUpperCase())
            || us.apellidoPaterno.toUpperCase().includes(busqueda.toUpperCase())
            || us.apellidoMaterno.toUpperCase().includes(busqueda.toUpperCase())
            || us.username.toUpperCase().includes(busqueda.toUpperCase())))
    }

    //console.log(detalleUsuario)

    return (
        <div>
            {loading === true ? <BLoading /> : null}
            {datosCargados && !loading ?
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={3} >
                            <div className="panel panel-default" style={{ marginBottom: "20px" }}>
                                <div className="panel-body">

                                    <Paper component="form" >
                                        <IconButton onClick={(e) => buscarClientes(e)} color="primary" className={classes.iconButton} aria-label="directions">
                                            <SearchIcon />
                                        </IconButton>
                                        <InputBase
                                            className={classes.input}
                                            placeholder="Buscar clientes"
                                            inputProps={{ 'aria-label': 'Buscar clientes' }}
                                            onChange={(event) => buscarClientes(event)}
                                            /* onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    buscarClientes(e);
                                                }
                                            }} */
                                            onKeyPress={(event) => buscarClientes(event)}
                                        />

                                    </Paper>


                                    <List className={classes.root}>
                                        {listaLocal.length <= 0 ? <>No hay datos para mostrar</> :
                                            listaLocal.map((us) => {
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
                            { !detalleUsuario ? "Seleccione un usuario" :
                                <Grid container spacing={3}>

                                    <Grid item xs={5} >
                                        <Grid container spacing={3}>

                                            <Grid item xs={12}>
                                                <DatosPersonales {...detalleUsuario.datosPersonales} />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <PerfilAsegurado {...detalleUsuario.perfilAsegurado} />
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                    <Grid item xs={7}>
                                        <PolizasCliente polizas={detalleUsuario.polizas} />
                                    </Grid>


                                </Grid>
                            }
                        </Grid>
                    </Grid>
                </div>
                : null}
        </div >
    );
}

export default Clientes;