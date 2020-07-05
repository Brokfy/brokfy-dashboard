import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import BLoading from '../../../components/bloading';
import { useGetToken } from '../../common/redux/hooks';
import { useFetchListadoUsuario } from '../redux/fetchListadoUsuario';
import { useFetchMenu } from '../redux/fetchMenu';
import { useFetchRestriccionesEdicion } from '../redux/fetchRestriccionesEdicion';
import { useUpdateRestricciones } from '../redux/updateRestricciones';

import { Paper, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Collapse, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';

const Permisos = () => {

    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState(false);
    const [checked, setChecked] = useState([0]);
    const { auth } = useGetToken();
    const [idMenuActual, setIdMenuActual] = useState(0);
    const [listaLocal, setListaLocal] = useState([]);
    const { listadoUsuarios, fetchListadoUsuario, fetchListadoUsuarioPending } = useFetchListadoUsuario();
    const { menu, fetchMenu, fetchMenuPending } = useFetchMenu();
    const { restriccionesEdicion, fetchRestriccionesEdicion, fetchRestriccionesEdicionPending } = useFetchRestriccionesEdicion();
    const { updateRestricciones, updateRestriccionesPending, updateRestriccionesError, updateRestriccionesNotify } = useUpdateRestricciones();

    useEffect(() => {
        if (auth.tokenFirebase === "") return;
        if (fetchListadoUsuarioPending) return;
        if (fetchMenuPending) return;

        if (!datosCargados) {
            fetchListadoUsuario(auth.tokenFirebase);
            fetchMenu(auth.tokenFirebase);
            setDatosCargados(true);
            return;
        }

        if (listadoUsuarios && listadoUsuarios.length > 0 && menu)
            setListaLocal(listadoUsuarios);

        setLoading(false);
    }, [auth.tokenFirebase, fetchListadoUsuarioPending, listadoUsuarios, datosCargados, fetchListadoUsuario, menu, fetchMenu, fetchMenuPending]);

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
        nested: {
            paddingLeft: theme.spacing(6),
        },
    }));
    const classes = useStyles();


    const actualizarRestriccion = (idMenu) => {
        setIdMenuActual(idMenu);
        updateRestricciones({ idMenu: idMenu, username: checked, token: auth.tokenFirebase })
    }


    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(value);
        fetchRestriccionesEdicion({ dato: value, campo: "username", token: auth.tokenFirebase });
    };

    const buscarClientes = (e) => {
        let busqueda = e.target.value;
        setListaLocal(listadoUsuarios.filter(us =>
            us.nombre.toUpperCase().includes(busqueda.toUpperCase())
            || us.apellidoPaterno.toUpperCase().includes(busqueda.toUpperCase())
            || us.apellidoMaterno.toUpperCase().includes(busqueda.toUpperCase())
            || us.username.toUpperCase().includes(busqueda.toUpperCase())))
    }

    return (
        <div>
            {loading === true ? <BLoading /> : null}
            {datosCargados && !loading ?
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={5} >
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
                                            onKeyPress={(event) => buscarClientes(event)}
                                        />

                                    </Paper>

                                    <div className="lista-poliza">
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
                            </div>
                        </Grid>
                        <Grid item xs={7} >
                            {fetchMenuPending ? <BLoading display={true} /> :
                                <div>
                                    <div className="panel panel-default" style={{ marginBottom: "0px" }}>
                                        <div className="panel-body">
                                            <span className="titulo-panel">
                                                {!restriccionesEdicion ? "Seleccione un usuario." : "Presione la opcion que desee habilitar o deshabilitar."}
                                            </span>

                                            <div className="lista-poliza">

                                                <List
                                                    component="nav"
                                                    aria-labelledby="nested-list-subheader"
                                                    className={classes.root}
                                                >
                                                    {!restriccionesEdicion ? null
                                                        : menu.map(m => {
                                                            return (
                                                                <>
                                                                    <ListItem button onClick={() => actualizarRestriccion(m.idMenu)}>
                                                                        <ListItemText primary={m.nombre} />
                                                                        <ListItemIcon>
                                                                            {updateRestriccionesPending && idMenuActual === m.idMenu ? <HourglassEmptyIcon /> :
                                                                                restriccionesEdicion.filter(x => x.idMenu === m.idMenu).length <= 0 ?
                                                                                    <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                                                                        </ListItemIcon>
                                                                    </ListItem>
                                                                    {m.inverseIdMenuPadreNavigation.length <= 0 ? null :
                                                                        m.inverseIdMenuPadreNavigation.map(h =>
                                                                            <Collapse in={true} key={`hijo_${h.idMenu}`}>
                                                                                <List component="div" disablePadding>
                                                                                    <ListItem button className={classes.nested} onClick={() => actualizarRestriccion(h.idMenu)}>
                                                                                        <ListItemText primary={h.nombre} />
                                                                                        <ListItemIcon>
                                                                                            {updateRestriccionesPending && idMenuActual === h.idMenu ? <HourglassEmptyIcon /> :
                                                                                                restriccionesEdicion.filter(x => x.idMenu === h.idMenu).length <= 0 ?
                                                                                                    <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                                                                                        </ListItemIcon>
                                                                                    </ListItem>
                                                                                </List>
                                                                            </Collapse>)
                                                                    }
                                                                </>
                                                            );
                                                        })
                                                    }
                                                </List>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                        </Grid>
                    </Grid>
                </div>
                : null}

            <br /><br />
        </div>
    );

}

export default Permisos;