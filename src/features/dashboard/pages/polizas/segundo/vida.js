import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../../../features/common/redux/hooks';
import Grid from '@material-ui/core/Grid';
import { TextField, FormHelperText, FormControl, InputLabel, Select, MenuItem, InputAdornment, Input } from '@material-ui/core'
import { Typography } from "@material-ui/core";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useFetchDropdownOcupaciones } from '../../../redux/fetchDropdownOcupaciones';
import { listadoSexos, listadoEstadosCiviles } from '../../../../../common/utils';

const SegundoVida = (props) => {

    const { auth } = useGetToken();
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState({
        ocupaciones: false,
    })
    const { dropdownOcupaciones, fetchDropdownOcupaciones, fetchDropdownOcupacionesPending } = useFetchDropdownOcupaciones();

    const [fumador, setFumador] = useState(props.datos.fumador ? props.datos.fumador : '');
    const [estatura, setEstatura] = useState(props.datos.estatura ? props.datos.estatura : '');
    const [peso, setPeso] = useState(props.datos.peso ? props.datos.peso : '');
    const [ingresos, setIngresos] = useState(props.datos.ingresos ? props.datos.ingresos : '');
    const [idOcupacion, setIdOcupacion] = useState(props.datos.idOcupacion ? props.datos.idOcupacion : '');
    const [idEstadoCivil, setIdEstadoCivil] = useState(props.datos.idEstadoCivil ? props.datos.idEstadoCivil : '');
    const [idSexo, setIdSexo] = useState(props.datos.idSexo ? props.datos.idSexo : '');

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
        
        if ( !datosCargados.ocupaciones && !(dropdownOcupaciones && dropdownOcupaciones.length > 0) ) {
            fetchDropdownOcupaciones(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                ocupaciones: true,
            });
            return;
        }

        setLoading(false);
    }, [auth.tokenFirebase, fetchDropdownOcupaciones, fetchDropdownOcupacionesPending, datosCargados, dropdownOcupaciones]);


    return <div>

        <Grid container spacing={3}>
            <Grid item xs={12} style={{ borderBottomStyle: "inset" }}>
                <Typography variant="h6">Detalle de Póliza Vida</Typography>
            </Grid>

            <Grid item xs={4} >
                <FormControl className={classes.formControl} style={{ margin: '0' }} error={idSexo === ""}>
                    <InputLabel id="sexoLabel">Sexo</InputLabel>
                    <Select
                        labelId="sexoLabel"
                        id="idSexo"
                        name="idSexo"
                        value={idSexo}
                        onChange={(event) => setIdSexo(event.target.value)}
                    >
                        {listadoSexos.map((x, i) => <MenuItem key={`mi_${i}_sexo`} value={x.value}>{x.text}</MenuItem>)}
                    </Select>
                    {
                        idSexo === "" ?
                            <FormHelperText>El campo es requerido</FormHelperText> :
                            null
                    }
                </FormControl>
            </Grid>

            <Grid item xs={4} >
                <TextField
                    id={"estatura"}
                    name={"estatura"}
                    label={"Estatura"}
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                    }}
                    defaultValue={estatura}
                    error={estatura === ""}
                    helperText={estatura==="" ? "El campo es requerido" : ''}
                    onBlur={event => setEstatura(event.target.value)}
                />
            </Grid>

            <Grid item xs={4} >
                <TextField
                    id={"peso"}
                    name={"peso"}
                    label={"Peso"}
                    type="number"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                    }}
                    defaultValue={peso}
                    error={peso === ""}
                    helperText={peso==="" ? "El campo es requerido" : ''}
                    onBlur={event => setPeso(event.target.value)}
                />
            </Grid>

            <Grid item xs={4} >
                <FormControl className={classes.formControl} style={{ margin: '0' }} error={idEstadoCivil === ""}>
                    <InputLabel id="estadoCivilLabel">Estado Civil</InputLabel>
                    <Select
                        labelId="estadoCivilLabel"
                        id="idEstadoCivil"
                        name="idEstadoCivil"
                        value={idEstadoCivil}
                        onChange={(event) => setIdEstadoCivil(event.target.value)}
                    >
                        {listadoEstadosCiviles.map((x, i) => <MenuItem key={`mi_${i}_estado_civil`} value={x.value}>{x.text}</MenuItem>)}
                    </Select>
                    {
                        idEstadoCivil === "" ?
                            <FormHelperText>El campo es requerido</FormHelperText> :
                            null
                    }
                </FormControl>
            </Grid>

            <Grid item xs={4} >
                <FormControl className={classes.formControl} style={{ margin: '0' }} error={idOcupacion === ""}>
                    <InputLabel id="ocupacionLabel">Ocupación</InputLabel>
                    <Select
                        labelId="ocupacionLabel"
                        id="idOcupacion"
                        name="idOcupacion"
                        value={idOcupacion}
                        onChange={(event) => setIdOcupacion(event.target.value)}
                    >
                        { dropdownOcupaciones && dropdownOcupaciones.length > 0 ? 
                            dropdownOcupaciones.map((x, i) => <MenuItem key={`mi_${i}_fumador`} value={x.id}>{x.descripcion}</MenuItem>) : 
                            null }
                    </Select>
                    {
                        fumador === "" ?
                            <FormHelperText>El campo es requerido</FormHelperText> :
                            null
                    }
                </FormControl>
            </Grid>

            <Grid item xs={4} >
                <TextField
                    id={"ingresos"}
                    name={"ingresos"}
                    label={"Ingresos (opcional)"}
                    type="number"
                    defaultValue={ingresos}
                    // error={ingresos === ""}
                    // helperText={ingresos ==="" ? "El campo es requerido" : ''}
                    // onBlur={event => setIngresos(event.target.value)}
                />
            </Grid>

            <Grid item xs={4} >
                <FormControl className={classes.formControl} style={{ margin: '0' }} error={fumador === ""}>
                    <InputLabel id="fumadorLabel">Fumador</InputLabel>
                    <Select
                        labelId="fumadorLabel"
                        id="fumador"
                        name="fumador"
                        value={fumador}
                        onChange={(event) => setFumador(event.target.value)}
                    >
                        {[{ valor: 0, texto: "No"}, { valor: 1, texto: "Si"}].map((x, i) => <MenuItem key={`mi_${i}_fumador`} value={x.valor}>{x.texto}</MenuItem>)}
                    </Select>
                    {
                        fumador === "" ?
                            <FormHelperText>El campo es requerido</FormHelperText> :
                            null
                    }
                </FormControl>
            </Grid>
        </Grid>

    </div>
}

export default SegundoVida;