import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../../../features/common/redux/hooks';
import Grid from '@material-ui/core/Grid';
import { TextField, FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Typography } from "@material-ui/core";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useFetchDropdownOcupaciones } from '../../../redux/fetchDropdownOcupaciones';

const SegundoVida = (props) => {

    const { auth } = useGetToken();
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState({
        ocupaciones: false,
    })
    const { dropdownOcupaciones, fetchDropdownOcupaciones, fetchDropdownOcupacionesPending } = useFetchDropdownOcupaciones();

    const [fumador, setFumador] = useState('');
    const [estatura, setEstatura] = useState('');
    const [peso, setPeso] = useState('');
    const [ingresos, setIngresos] = useState('');
    const [idOcupacion, setIdOcupacion] = useState('');
    const [idEstadoCivil, setIdEstadoCivil] = useState('');
    const [idSexo, setIdSexo] = useState('');

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: theme.spacing(120),
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4),
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        if ( !auth.tokenFirebase || auth.tokenFirebase === "" ) return;
        if ( fetchDropdownOcupacionesPending ) return;

        if ( !datosCargados.ocupaciones ) {
            fetchDropdownOcupaciones(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                ocupaciones: true,
            });
            return;
        }

        setLoading(false);
    }, [auth.tokenFirebase, datosCargados, fetchDropdownOcupaciones, fetchDropdownOcupacionesPending]);


    return <div>

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Datos para Póliza Vida</Typography>
            </Grid>
            {/* {listadoMarcas.length <= 0 ? "Loading" :
                <>
                    <Grid item xs={4} >
                        <FormControl className={classes.formControl} style={{ margin: '0' }} error={marca === ""}>
                            <InputLabel id="marcaLabel">Marca</InputLabel>
                            <Select
                                labelId="marcaLabel"
                                id="marca"
                                name="marca"
                                value={marca}
                                onChange={(event) => handleChangeMarca(event)}
                            >
                                {listadoMarcas.map((x, i) => <MenuItem key={`mi_${i}_marcas`} value={x.marca}>{x.marca}</MenuItem>)}
                            </Select>
                            {
                                marca === "" ?
                                    <FormHelperText>El campo es requerido</FormHelperText> :
                                    null
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} >
                        <FormControl className={classes.formControl} style={{ margin: '0' }} error={year===""} >
                            <InputLabel id="yearLabel">Año</InputLabel>
                            <Select
                                labelId="yearLabel"
                                id="ano"
                                name="ano"
                                value={year}
                                onChange={(event) => handleChangeYear(event)}
                                disabled={marca === ''}
                            >
                                {listadoYear.length <= 0 || marca === '' ? null : listadoYear.map((x, i) => <MenuItem key={`mi_${i}_year`} value={x.year}>{x.year}</MenuItem>)}
                            </Select>
                            {
                                year === "" ?
                                    <FormHelperText>El campo es requerido</FormHelperText> :
                                    null
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} >
                        <FormControl className={classes.formControl} style={{ margin: '0' }} error={modelo===""} >
                            <InputLabel id="modeloLabel">Modelo</InputLabel>
                            <Select
                                labelId="modeloLabel"
                                id="modelo"
                                name="modelo"
                                value={modelo}
                                onChange={(event) => setModelo(event.target.value)}
                                disabled={marca === '' || year === ''}
                            >
                                {listadoModelos.length <= 0 || marca === '' || year === '' ? null : listadoModelos.map((x, i) => <MenuItem key={`mi_${i}_modelo`} value={x.modelo}>{x.modelo}</MenuItem>)}
                            </Select>
                            {
                                modelo === "" ?
                                    <FormHelperText>El campo es requerido</FormHelperText> :
                                    null
                            }
                        </FormControl>
                    </Grid>
                    <Grid item xs={4} >
                        <TextField id="placa" name="placa" label="Placa" error={placa===""} helperText={placa==="" ? "El campo es requerido" : ''} onBlur={event => setPlaca(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4} >
                        <TextField id="clave" name="clave" label="Clave" error={clave===""} helperText={clave==="" ? "El campo es requerido" : ''} onBlur={event => setClave(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4} >
                        <TextField id="codigoPostal" name="codigoPostal" label="Código Postal" error={codigoPostal===""} helperText={codigoPostal==="" ? "El campo es requerido" : ''} onBlur={event => setCodigoPostal(event.target.value)}/>
                    </Grid>
                </>
            } */}
        </Grid>

    </div>
}

export default SegundoVida;