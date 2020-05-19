import React, { useState } from 'react';
import { Toolbar, AppBar, Grid, Typography, Paper, FormControl, InputLabel, Select, TextField, MenuItem, makeStyles, Button } from '@material-ui/core';
import { NumberFormatCustom } from '../../../../common/utils';

const DatosPago = ({ listadoAseguradora = [], datosPago, setDatosPago, modoEdicion, setModoEdicion }) => {
    const [formData, setFormData] = useState(datosPago);
    const [relacionarPolizasEnabled, setRelacionarPolizasEnabled] = useState(false);

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
        buttonColor: {
            background: modoEdicion ? "#6097ef !important" : "#c9af79 !important",
        }
    }));
    const classes = useStyles();

    const actualizarFormData = (event) => {
        const nuevoEstado = { ...formData, [event.target.name]: event.target.value };
        setFormData(nuevoEstado);
        if( Object.keys(nuevoEstado).map(i => nuevoEstado[i]).filter(i => i.toString()).length === Object.keys(nuevoEstado).length ) {
            setRelacionarPolizasEnabled(true);
        }
    };

    const relacionarPolizas = () => {
        if( modoEdicion ) {
            setDatosPago(formData);
            setModoEdicion(false);
        } else {
            setModoEdicion(true);
        }
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <Typography className={classes.secondaryHeadingWhite}>
                                {`Registro de Pago Recibido`}
                            </Typography>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={4} md={3} lg={2}>
                        <FormControl className={classes.formControl} style={{ margin: '0' }}>
                            <InputLabel id="aseguradoraLabel">Aseguradora</InputLabel>
                            <Select
                                id="aseguradora"
                                name="aseguradora"
                                value={formData.aseguradora}
                                onChange={actualizarFormData}
                                disabled={!modoEdicion}
                            >
                                {!listadoAseguradora || listadoAseguradora.length <= 0 ? null : listadoAseguradora.map((x, i) => <MenuItem key={`mi_${i}_aseguradora`} value={x.idAseguradora}>{x.nombre}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} sm={4} md={3} lg={2} >
                        <TextField
                            id="fechaPago"
                            label="Fecha Pago"
                            type="date"
                            defaultValue={formData.fechaPago}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={actualizarFormData}
                            disabled={!modoEdicion}
                        />
                    </Grid>

                    <Grid item xs={6} sm={4} md={3} lg={2}>
                        <TextField
                            label="Monto Pagado"
                            defaultValue={formData.montoPago}
                            name="montoPago"
                            id="montoPago"
                            InputProps={{
                                min: 0, 
                                // style: { textAlign: 'right' },
                                inputComponent: NumberFormatCustom,
                                autoComplete: 'off',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            onChange={actualizarFormData}
                            disabled={!modoEdicion}
                        />
                    </Grid>

                    <Grid item xs={6} sm={4} md={3} lg={2} >
                        <FormControl className={classes.formControl} style={{ margin: '0' }} >
                            <InputLabel id="formaPagoLabel">Forma Pago</InputLabel>
                            <Select
                                labelId="formaPagoLabel"
                                id="formaPago"
                                name="formaPago"
                                value={formData.formaPago}
                                onChange={actualizarFormData}
                                disabled={!modoEdicion}
                            >
                                <MenuItem value={1}>Transferencia Bancaria</MenuItem>
                                <MenuItem value={2}>Deposito Bancario</MenuItem>
                                <MenuItem value={3}>Punto de Venta Electronico</MenuItem>
                                <MenuItem value={4}>Efectivo</MenuItem>
                                <MenuItem value={5}>Otro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6} sm={4} md={3} lg={2} >
                        <TextField
                            id="referencia"
                            label="Referencia"
                            type="referencia"
                            name="referenciaPago"
                            defaultValue={formData.referenciaPago}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                autoComplete: 'off',
                                form: {
                                    autoComplete: 'off',
                                },
                            }}
                            onChange={actualizarFormData}
                            disabled={!modoEdicion}
                        />
                    </Grid>

                    <Grid item xs={6} sm={4} md={3} lg={2} style={{paddingTop: "25px"}}>
                        <Button fullWidth={true} onClick={relacionarPolizas} disabled={!relacionarPolizasEnabled} className={classes.buttonColor}>
                            { modoEdicion ? "relacionar pólizas" : "editar pago" }
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}

export default DatosPago;