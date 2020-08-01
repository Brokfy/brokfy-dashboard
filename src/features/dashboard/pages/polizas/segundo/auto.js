import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../../../features/common/redux/hooks';
import Grid from '@material-ui/core/Grid';
import { TextField, FormHelperText, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Typography } from "@material-ui/core";
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const SegundoAuto = (props) => {

    const { auth } = useGetToken();
    const [listadoMarcas, setListadoMarcas] = useState([]);
    const [marca, setMarca] = useState('');

    const [listadoModelos, setListadoModelos] = useState([]);
    const [modelo, setModelo] = useState('');

    const [listadoYear, setListadoYear] = useState([]);
    const [year, setYear] = useState('');

    const [placa, setPlaca] = useState('');
    const [clave, setClave] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');

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
        if( listadoMarcas.length === 0 ) {
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const options = {
                url: `https://apipruebas.brokfy.com:4300/api/Marcas`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.tokenFirebase}`,
                    'Content-Type': 'application/json',
                },
                cancelToken: source.token
            };
    
            axios(options)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.status)
                    }
    
                    return response.data;
                })
                .then(setListadoMarcas)
                .catch((error) => { });
        }
    }, [auth, listadoMarcas.length]);

    useEffect(() => {
        if( (!marca || marca === "") && props.datos.marca && props.datos.marca !== "" ) {
            setMarca(props.datos.marca);
            setListadoModelos([]);
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const options = {
                url: `https://apipruebas.brokfy.com:4300/api/Year?Marca=${props.datos.marca}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.tokenFirebase}`,
                    'Content-Type': 'application/json',
                },
                cancelToken: source.token
            };
    
            axios(options)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.status)
                    }
    
                    return response.data;
                })
                .then(setListadoYear)
                .catch((error) => { });
        } else {
            setModelo('');
            setListadoModelos([]);
            setYear('');
        }
    }, [marca, props.datos.marca, auth.tokenFirebase]);

    useEffect(() => {
        if( marca !== props.datos.marca ) return;
        if( (!year || year === "") && props.datos.ano && props.datos.ano !== "" ) {
            setYear(props.datos.ano);
            setListadoModelos([]);
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();
            const options = {
                url: `https://apipruebas.brokfy.com:4300/api/Modelos?Marca=${marca}&Year=${props.datos.ano}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${auth.tokenFirebase}`,
                    'Content-Type': 'application/json',
                },
                cancelToken: source.token
            };
    
            axios(options)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error(response.status)
                    }
    
                    return response.data;
                })
                .then(setListadoModelos)
                .catch((error) => { });
        } else {
            setModelo('');
            setListadoModelos([]);
        }
    }, [year, props.datos.ano, auth.tokenFirebase, marca, props.datos.marca]);

    useEffect(() => {
        if( (!modelo || modelo === "") && props.datos.modelo && props.datos.modelo !== "" ) {
            setModelo(props.datos.modelo);
            const modeloInfo =  listadoModelos.filter(i => i.modelo === props.datos.modelo);
            if( modeloInfo && modeloInfo.length > 0 ) {
                setClave(modeloInfo[0].clave);
            }
        } else {
            if( modelo !== "" ) {
                const modeloInfo =  listadoModelos.filter(i => i.modelo === modelo);
                if( modeloInfo && modeloInfo.length > 0 ) {
                    setClave(modeloInfo[0].clave);
                }
            }
        }
    }, [modelo, listadoModelos, props.datos.modelo]);

    useEffect(() => {
        if( (!placa || placa === "") && props.datos.placa && props.datos.placa !== "" ) {
            setPlaca(props.datos.placa);
        }
    }, [placa, props.datos.placa]);

    useEffect(() => {
        if( (!codigoPostal || codigoPostal === "") && props.datos.codigoPostal && props.datos.codigoPostal !== "" ) {
            setCodigoPostal(props.datos.codigoPostal);
        }
    }, [codigoPostal, props.datos.codigoPostal]);

    const handleChangeMarca = (event) => {
        setMarca(event.target.value);
        setListadoModelos([]);
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const options = {
            url: `https://apipruebas.brokfy.com:4300/api/Year?Marca=${event.target.value}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.tokenFirebase}`,
                'Content-Type': 'application/json',
            },
            cancelToken: source.token
        };

        axios(options)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.status)
                }

                return response.data;
            })
            .then(setListadoYear)
            .catch((error) => { });
    }

    const handleChangeYear = (event) => {
        setYear(event.target.value);
        setListadoModelos([]);
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        const options = {
            url: `https://apipruebas.brokfy.com:4300/api/Modelos?Marca=${marca}&Year=${event.target.value}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${auth.tokenFirebase}`,
                'Content-Type': 'application/json',
            },
            cancelToken: source.token
        };

        axios(options)
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(response.status)
                }

                return response.data;
            })
            .then(setListadoModelos)
            .catch((error) => { });
    }

    const validarTel = (evt) => {
        var theEvent = evt || window.event;
        // Handle paste
        if (theEvent.type === 'paste') {
            key = theEvent.clipboardData.getData('text/plain');
        } else {
        // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }

        var regex = /^\d+$/;
        if( !regex.test(key) ) {
          theEvent.returnValue = false;
          if(theEvent.preventDefault) theEvent.preventDefault();
        }
    }    

    return <div>

        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Datos para Póliza Auto</Typography>
            </Grid>
            {listadoMarcas.length <= 0 ? "Loading" :
                <>
                    <Grid item xs={4} >
                        <FormControl className={classes.formControl} style={{ margin: '0' }} error={marca === ""}>
                            <InputLabel id="marcaLabel">Marca *</InputLabel>
                            <Select
                                labelId="marcaLabel"
                                id="marca"
                                name="marca"
                                value={marca && marca !== "" ? marca : props.datos.marca}
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
                            <InputLabel id="yearLabel">Año *</InputLabel>
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
                            <InputLabel id="modeloLabel">Modelo *</InputLabel>
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
                        <TextField id="placa" name="placa" label="Placa *" error={placa===""} helperText={placa==="" ? "El campo es requerido" : ''} defaultValue={placa} onBlur={event => setPlaca(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4} style={{ display: "none" }}>
                        <TextField id="clave" name="clave" label="Clave" defaultValue={clave} error={clave===""} helperText={clave==="" ? "El campo es requerido" : ''} onBlur={event => setClave(event.target.value)}/>
                    </Grid>
                    <Grid item xs={4} >
                        <TextField 
                            id="codigoPostal" 
                            name="codigoPostal" 
                            label="Código Postal *" 
                            type="tel"
                            onPaste={validarTel}
                            onKeyPress={validarTel}
                            defaultValue={codigoPostal}
                            error={codigoPostal==="" || !/^[0-9]{5}$/g.test(codigoPostal)} 
                            helperText={
                                codigoPostal==="" ? "El campo es requerido" : 
                                !/^[0-9]{5}$/g.test(codigoPostal) ? "Código inválido" : ""
                            } 
                            onBlur={event => setCodigoPostal(event.target.value)}
                        />
                    </Grid>
                </>
            }
        </Grid>

    </div>
}

export default SegundoAuto;