//#region Import
import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchDetallePoliza } from '../../redux/fetchDetallePoliza';
import BLoading from '../../../../components/bloading';
import { getCRUDConfig } from '../../../../common/utils';
import format from 'date-fns/format'
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, TextField, AppBar, Toolbar, Typography, IconButton, Button, Paper, Grid, FormControl, InputLabel, Select, InputAdornment, MenuItem, Icon, Divider } from '@material-ui/core'
import NumberFormat from 'react-number-format';
import { lightBlue } from '@material-ui/core/colors';
import Drawer from '@material-ui/core/Drawer';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { SaveOutlined } from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import DescriptionIcon from '@material-ui/icons/Description';
import { formatMoney } from '../../../../common/utils';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple, blue, red, green } from '@material-ui/core/colors';

//Auto
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
//Moto
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
//Hogar
import HomeWorkIcon from '@material-ui/icons/HomeWork';
//Salud
import HealingIcon from '@material-ui/icons/Healing';
//Vida
import FavoriteIcon from '@material-ui/icons/Favorite';
//Gadgets
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
//Mascotas
import PetsIcon from '@material-ui/icons/Pets';
//Viajes
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
//Retiro
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
//Pyme
import StoreIcon from '@material-ui/icons/Store';
//#endregion

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-prevent-tab-${index}`,
        'aria-controls': `scrollable-prevent-tabpanel-${index}`,
    };
}

//Material Styles
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2),

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    secondaryHeadingWhite: {
        fontSize: theme.typography.pxToRem(20),
        color: 'white',
        margin: theme.spacing(2, 0)
    },
    table: {
        minWidth: 650,
    },
    select: {
        borderColor: 'white',
    },
    whiteColor: {
        color: "white"
    },
    whitePaddingColor: {
        color: "white",
        margin: theme.spacing(2, 0, -1, 0),
    },
    appBar: {
        paddingTop: "1rem"
    },
    filtroAseguradora: {
        color: "white"
    },
    stickyList: {
        backgroundColor: "white",
        borderBottom: "1px solid #c1c1c1"
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[500]),
        backgroundColor: deepPurple[500],
    },
    green: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    red: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
    },

}));




const PolizaDrawer = (props) => {
    const { polizaDraw, open } = props;
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [datosCargados, setDatosCargados] = useState(false);
    const { detallePoliza: detallePoliza, fetchDetallePoliza, fetchDetallePolizaPending } = useFetchDetallePoliza();
    const { auth } = useGetToken();
    const classes = useStyles();

    const [poliza, setPoliza] = useState({
        costo: 12312313,
        noPoliza: 123123123,
        formaPago: "Transferencia",
        tipoPoliza: 1,
        proximoPago: "",
        fechaInicio: "11/05/2020",
        fechaFin: "11/05/2021",
        aseguradoras: "ANA",
        producto: "ASDASD",
        habilitada: "Si",
        noAsegurado: "12312asdasd",
        polizaPropia: "Si",
        rcUsaCanada: "No",
        costoPrimerRecibo: 123123123,
        costoRecibosSubsecuentes: 123123123,
        primaNeta: 123123123,
        estadoPoliza: "ACTIVO",
    });
    const [usuario, setUsuario] = useState({
        nombre: "asasdasd",
        apellidoPaterno: "asdasd",
        apellidoMaterno: "asdasd",
        fechaNacimiento: "10/10/1980",
        sexo: "Hombre",
        email: "asdasda@asdasd.com",
        username: "554654654",
        municipio: "asadasd",
        codigoPostal: "123123123",
        estado: "Activo",
        hijos: 2,
        edad: 39,
        regimenVivienda: "",
        situacionLaboral: "",
        hipoteca: "",
        viaja: "",
        mascotas: "",
        estadoCivil: "",
        idProfesion: "",
    });
    const [auto, set] = useState({
        marca: "FORD",
        modelo: "F150 AT FULL EQUIPO AWD",
        ano: "2020",
        noPoliza: "651651",
        placas: "3241asd",
        clave: "321asd",
        codigoPostal: "321asd",
    })

    const handleDrawerChange = (event, newValue) => {
        setValue(newValue);
    };

    const getIconLabel = (tipo) => {
        switch (tipo) {
            case 1:
                return {
                    label: 'Auto',
                    icon: <DirectionsCarIcon />
                }
                break;

            case 2:
                return {
                    label: 'Moto',
                    icon: <MotorcycleIcon />
                }
                break;

            case 3:
                return {
                    label: 'Hogar',
                    icon: <HomeWorkIcon />
                }
                break;

            case 4:
                return {
                    label: 'Salud',
                    icon: <HealingIcon />
                }
                break;

            case 5:
                return {
                    label: 'Vida',
                    icon: <FavoriteIcon />
                }
                break;

            case 6:
                return {
                    label: 'Gadgets',
                    icon: <PhoneAndroidIcon />
                }
                break;

            case 7:
                return {
                    label: 'Mascotas',
                    icon: <PetsIcon />
                }
                break;

            case 8:
                return {
                    label: 'Viajes',
                    icon: <FlightTakeoffIcon />
                }
                break;

            case 9:
                return {
                    label: 'Retiro',
                    icon: <SupervisedUserCircleIcon />
                }
                break;

            case 10:
                return {
                    label: 'Pyme',
                    icon: <StoreIcon />
                }
                break;

            default:
                break;
        }
    }

    const PagosPendientes = ({ poliza, auto, vida }) => {
        let pagados = 0;
        let pendientes = 0;
        
        detallePoliza.historicoPagos.forEach(item => {
            if(item.pagado === true){
                pagados = pagados +1;
            }
            else {
                pendientes = pendientes +1;
            }
        })
        return (
            <Grid item xs={12}>
                <div className="panel panel-default" style={{marginBottom: "0px"}}>
                    <div className="panel-heading" style={{marginBottom: "10px"}}>
                        Pagos pendientes <b>{detallePoliza.historicoPagos.length-pagados}</b>
                    </div>
                    <div className="row">
                        <div className="col-12">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Vencimiento</th>
                            <th scope="col">Valor</th>
                            <th scope="col">Estado</th>
                            <th scope="col"> #</th>
                            </tr>
                        </thead>

                    {
                        detallePoliza.historicoPagos.map( item => {     
                        return (
                            <tr>
                                <td>
                                    <Typography variant="body1" className="text-muted">
                                        {format(new Date(item.vencimiento), 'dd/MM/yyyy')}
                                    </Typography>
                                </td>

                                <td>
                                    <h4>${item.valor}</h4>
                                </td>

                                <td>
                                    <h4>{item.pagado ? 'Completado' : 'Pendiente'}</h4>
                                </td>

                                <td>
                                    <Avatar className={item.pagado ? classes.green : classes.red}>{' '}</Avatar>
                                </td>

                            </tr>
                            ) 
                        })
                    }
                    </table>
                        </div>
                    </div>
                </div>
            </Grid>
        );

    }

    const TipoPolizaSection = ({ poliza, auto, vida }) => {
        switch (poliza.tipoPoliza) {
            case 1:
                return (
                    <Grid item xs={12}>
                        <div className="panel panel-default" style={{marginBottom: "0px"}}>
                            <div className="panel-heading">
                                Producto Asegurado
                            </div>
                            <div className="panel-body">
                                <table className="table table-hover" style={{marginBottom: "0px"}}>
                                    <tbody>
                                        <tr>
                                            <td width="30%">Año</td>
                                            <td width="70%">{auto.ano}</td>
                                        </tr>
                                        <tr>
                                            <td width="30%">Marca</td>
                                            <td width="70%">{auto.marca}</td>
                                        </tr>
                                        <tr>
                                            <td width="30%">Modelo</td>
                                            <td width="70%">{auto.modelo}</td>
                                        </tr>
                                        <tr>
                                            <td width="30%">Placa</td>
                                            <td width="70%">{auto.placas}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Grid>
                );
                break;

            default:
                break;
        }

    }

    useEffect(() => {
        if (!auth || !auth.tokenFirebase || auth.tokenFirebase === "") return;
        if (fetchDetallePolizaPending) return;
        if (!polizaDraw) return;
        if (open && datosCargados && !loading) return;

        if (!datosCargados && open) {
            setLoading(true);
            fetchDetallePoliza({ noPoliza: polizaDraw, tokenFirebase: auth.tokenFirebase });
            setDatosCargados(true);

            return;
        }

        if (!open)
            setDatosCargados(false);

        setLoading(false);
    }, [auth, fetchDetallePolizaPending, detallePoliza, datosCargados, fetchDetallePoliza, polizaDraw, open, loading]);


    return !detallePoliza || detallePoliza.length <= 0 ? null :
        <Drawer
            anchor='right'
            open={open}
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
        >

            <div className='polizaDrawer'>
                <AppBar position="static">

                    <Tabs value={value} onChange={handleDrawerChange} aria-label="simple tabs example">
                        <Tab icon={<DescriptionIcon />} label="Poliza" {...a11yProps(0)} />
                        <Tab icon={<MonetizationOnIcon />} label="Pagos" {...a11yProps(1)} />
                        <Tab disabled icon={<WhatshotIcon />} label="Siniestros" {...a11yProps(2)} />

                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    {loading ? <>Cargando...</> :
                        <Grid container spacing={3}>
                            {!poliza ? null :
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <div className="panel panel-default" style={{marginBottom: "0px"}}>
                                                <div className="panel-heading">
                                                    Información General
                                                </div>
                                                <div className="panel-body">
                                                    <table className="table table-hover" style={{marginBottom: "0px"}}>
                                                        <tbody>
                                                            <tr>
                                                                <td width="30%">Póliza</td>
                                                                <td width="70%">{polizaDraw}</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Tipo</td>
                                                                <td width="70%">
                                                                    {getIconLabel(detallePoliza.poliza.tipoPoliza).icon} &nbsp;
                                                                    {getIconLabel(detallePoliza.poliza.tipoPoliza).label}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Aseguradora</td>
                                                                <td width="70%">{detallePoliza.poliza.nombreAseguradora}</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Inicio Vigencia</td>
                                                                <td width="70%">{format(new Date(detallePoliza.poliza.fechaInicio), 'dd/MM/yyyy')}</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Fin Vigencia</td>
                                                                <td width="70%">{format(new Date(detallePoliza.poliza.fechaFin), 'dd/MM/yyyy')}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div className="panel panel-default" style={{marginBottom: "0px"}}>
                                                <div className="panel-heading">
                                                    Valor de la Póliza
                                                </div>
                                                <div className="panel-body">
                                                    <table className="table table-hover" style={{marginBottom: "0px"}}>
                                                        <tbody>
                                                            <tr>
                                                                <td width="30%">Prima Total</td>
                                                                <td width="70%"><NumberFormat value={detallePoliza.poliza.primaTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Prima Neta</td>
                                                                <td width="70%">
                                                                    <NumberFormat value={detallePoliza.poliza.primaNeta} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Comisión</td>
                                                                <td width="70%"><NumberFormat value={detallePoliza.poliza.comision} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Cobrado</td>
                                                                <td width="70%"><NumberFormat value={detallePoliza.poliza.pagado} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Grid>

                                        {PagosPendientes(detallePoliza)}

                                        <Grid item xs={12}>
                                            <div className="panel panel-default" style={{marginBottom: "0px"}}>
                                                <div className="panel-heading">
                                                    Estado de la Póliza
                                                </div>
                                                <div className="panel-body">
                                                    <table style={{ width: "100%", marginBottom: "0px" }}>
                                                        <tbody>
                                                            <td width="25%" align="center">
                                                                <Avatar className={
                                                                    detallePoliza.poliza.idEstadoPoliza === 1 ? classes.green :
                                                                        detallePoliza.poliza.idEstadoPoliza === 2 ? classes.red :
                                                                            classes.yellow}>{' '}
                                                                </Avatar>
                                                                <Typography variant="body1" className="text-muted">
                                                                    Estatus
                                                                </Typography>
                                                            </td>
                                                            <td width="25%" align="center">
                                                                <Avatar className={detallePoliza.poliza.habilitada === 'Si' ? classes.green : classes.red}>{' '}</Avatar>
                                                                <Typography variant="body1" className="text-muted">
                                                                    Habilitada
                                                                </Typography>
                                                            </td>
                                                            <td width="25%" align="center">
                                                                <Avatar className={detallePoliza.poliza.polizaPropia == 'Si' ? classes.green : classes.red}>{' '}</Avatar>
                                                                <Typography variant="body1" className="text-muted">
                                                                    Poliza BF
                                                                </Typography>
                                                            </td>
                                                            <td width="25%" align="center">
                                                                <Avatar className={detallePoliza.poliza.rcUsaCanada == 'Si' ? classes.green : classes.red}>{' '}</Avatar>
                                                                <Typography variant="body1" className="text-muted">
                                                                    USA/Canada
                                                                </Typography>
                                                            </td>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Grid>

                                        {TipoPolizaSection(detallePoliza)}

                                        <Grid item xs={12}>
                                            <div className="panel panel-default" style={{marginBottom: "0px"}}>
                                                <div className="panel-heading">
                                                    Información del Cliente
                                                </div>
                                                <div className="panel-body">
                                                    <table className="table table-hover" style={{marginBottom: "0px"}}>
                                                        <tbody>
                                                            <tr>
                                                                <td width="30%">Usuario</td>
                                                                <td width="70%">{detallePoliza.usuario.username}</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Nombre</td>
                                                                <td width="70%">{detallePoliza.usuario.nombre} {detallePoliza.usuario.apellidoPaterno} {detallePoliza.usuario.apellidoMaterno}</td>
                                                            </tr>
                                                            <tr>
                                                                <td width="30%">Email</td>
                                                                <td width="70%">{detallePoliza.usuario.email}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            }
                        </Grid>
                    }
                </TabPanel>

                <TabPanel value={value} index={1}>
                    {!detallePoliza.pagos || detallePoliza.pagos.length <= 0 ? null :
                        <Grid container spacing={3}>

                            <Grid item xs={12}>
                                <div className="panel panel-default" style={{marginBottom: "0px"}}>
                                    <div className="panel-heading">
                                        Histórico de Pagos
                                    </div>
                                    <div className="panel-body">
                                        <table className="table table-hover" style={{marginBottom: "0px"}}>
                                            <thead>
                                                <tr>
                                                    <th width="10%">#</th>
                                                    <th width="40%">Fecha</th>
                                                    <th width="50%" className="text-a-r">Monto</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detallePoliza.pagos.map((row, i) => (
                                                    <tr key={`row_pagos_${i}`}>
                                                        <td>{i + 1}</td>
                                                        <td>{format(new Date(row.fecha), 'dd/MM/yyyy')}</td>
                                                        <td align="right"><NumberFormat value={row.monto} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                <div className="panel panel-default" style={{marginBottom: "0px"}}>
                                    <div className="panel-heading">
                                        Resumen de Pagos
                                    </div>
                                    <div className="panel-body">
                                        <table className="table table-hover" style={{marginBottom: "0px"}}>
                                            <tbody>
                                                <tr>
                                                    <td width="30%">Prima Total</td>
                                                    <td width="70%">${formatMoney(detallePoliza.poliza.primaTotal)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Prima Neta</td>
                                                    <td>${formatMoney(detallePoliza.poliza.primaNeta)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Comisión</td>
                                                    <td>${formatMoney(detallePoliza.poliza.comision)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Cobrado</td>
                                                    <td>${formatMoney(detallePoliza.poliza.pagado)}</td>
                                                </tr>
                                                <tr>
                                                    <td>Por Cobrar</td>
                                                    <td>${formatMoney(detallePoliza.poliza.comision - detallePoliza.poliza.pagado)}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Grid>

                        </Grid>
                    }
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                        </TabPanel>
            </div>

        </Drawer>
}

export default PolizaDrawer;