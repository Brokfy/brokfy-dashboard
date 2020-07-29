//#region Import
import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchSiniestroTimeline } from '../../redux/fetchSiniestroTimeline';
import { useFetchEstadosSiniestro } from '../../redux/fetchEstadosSiniestro';
import { useUpdateEstadosSiniestro } from '../../redux/updateEstadosSiniestro';
import BLoading from '../../../../components/bloading';
import { getCRUDConfig } from '../../../../common/utils';
import format from 'date-fns/format';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import es from 'date-fns/locale/es'
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Select, FormControl, TextField, AppBar, Typography, Button, Grid, MenuItem } from '@material-ui/core';
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
import TimelineIcon from '@material-ui/icons/Timeline';
import DescriptionIcon from '@material-ui/icons/Description';
import { formatMoney } from '../../../../common/utils';

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

// //Material Styles
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
    }
}));




const SiniestroDrawer = (props) => {
    const { polizaDraw, open } = props;
    const [loading, setLoading] = useState(true);
    const [ultimoEstado, setUltimoEstado] = useState();
    const [value, setValue] = useState(0);
    const [datosCargados, setDatosCargados] = useState(false);
    const [cambioEstatus, setCambioEstatus] = useState(false);
    const [cambioComentario, setCambioComentario] = useState("");
    const { siniestroTimeline, fetchSiniestroTimeline, fetchSiniestroTimelinePending } = useFetchSiniestroTimeline();
    const { estadoSiniestro, fetchEstadosSiniestro, fetchEstadosSiniestroPending } = useFetchEstadosSiniestro();
    const { updateEstadosSiniestro, updateEstadosSiniestroPending, updateEstadosSiniestroError } = useUpdateEstadosSiniestro();

    const { auth } = useGetToken();
    const classes = useStyles();

    const handleDrawerChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (auth.tokenFirebase === "") return;
        if (fetchEstadosSiniestroPending) return;
        if (fetchSiniestroTimelinePending) return;
        if (!polizaDraw) return;
        if (open && datosCargados && !loading) return;

        if (!datosCargados && open) {
            setLoading(true);
            fetchEstadosSiniestro(auth.tokenFirebase);
            fetchSiniestroTimeline({ idPolizaSiniestro: polizaDraw, tokenFirebase: auth.tokenFirebase });
            setDatosCargados(true);
            return;
        }

        if (siniestroTimeline.length > 0 && estadoSiniestro.length > 0) {
            setCambioEstatus(siniestroTimeline[0].idEstadoSiniestro);
        }

        if (!open)
            setDatosCargados(false);

        setLoading(false);
    }, [auth.tokenFirebase, fetchSiniestroTimelinePending, siniestroTimeline, datosCargados, estadoSiniestro, fetchSiniestroTimeline, fetchEstadosSiniestro, polizaDraw, open, loading, fetchEstadosSiniestroPending]);


    console.log(siniestroTimeline);

    return !siniestroTimeline || siniestroTimeline.length <= 0 ? null :
        <Drawer
            anchor='right'
            open={open}
            onClose={() => props.setOpen(false)}
            onOpen={() => props.setOpen(true)}
        >
            <div className='polizaDrawer'>
                <AppBar position="static">
                    <Tabs value={value} onChange={handleDrawerChange} aria-label="simple tabs example">
                        <Tab icon={<DescriptionIcon />} label="Estatus" {...a11yProps(0)} />
                        <Tab icon={<TimelineIcon />} label="Historia" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <div className="panel panel-default" style={{ marginBottom: "0px" }}>
                        <div className="panel-heading">
                            Estatus Actual
                                </div>
                        <div className="panel-body">
                            {siniestroTimeline[0] == null || !estadoSiniestro ? null : estadoSiniestro.filter(x => x.idEstadoSiniestro === siniestroTimeline[0].idEstadoSiniestro)[0].nombre}
                        </div>
                    </div>
                    <br />
                    <div className="panel panel-default" style={{ marginBottom: "0px" }}>
                        <div className="panel-heading">
                            Cambiar Estatus
                                </div>
                        <div className="panel-body">
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={cambioEstatus}
                                    onChange={(e) => setCambioEstatus(e.target.value)}
                                >
                                    {!estadoSiniestro || estadoSiniestro.length <= 0 ? null
                                        : estadoSiniestro.map(x => <MenuItem value={x.idEstadoSiniestro}>{x.nombre}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <br /><br />
                            <TextField
                                id="standard-multiline-static"
                                label="Comentario"
                                multiline
                                rows={4}
                                defaultValue={cambioComentario}
                                onChange={(e) => setCambioComentario(e.target.value)}
                            />
                            <br /><br />
                            <Button onClick={() => updateEstadosSiniestro({ data: { idPolizaSiniestro: siniestroTimeline[0].idPolizaSiniestro, fecha: new Date(), idEstadoSiniestro: cambioEstatus, comentario: cambioComentario, username: auth.username }, token: auth.tokenFirebase })} disabled={updateEstadosSiniestroPending} color="primary">
                                {updateEstadosSiniestroPending ? "Cargando..." : "Guardar"}
                            </Button>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="ibox-content inspinia-timeline">
                        {!estadoSiniestro || !siniestroTimeline || siniestroTimeline.length <= 0 ? null :
                            siniestroTimeline.map(s => {
                                return (
                                    <div className="timeline-item">
                                        <div className="row">
                                            <div className="col-3 date">
                                                <i className="fa fa-clock-o"></i>
                                                {format(new Date(s.fecha), 'dd/MM/yyyy')}
                                                <br />
                                                <small className="text-navy">Hace {formatDistanceToNow(new Date(s.fecha), { locale: es })}</small>
                                            </div>
                                            <div className="col-7 content no-top-border">
                                                <p className="m-b-xs"><strong>{estadoSiniestro.filter(x => x.idEstadoSiniestro === s.idEstadoSiniestro)[0].nombre}</strong></p>
                                                <p>{s.comentario}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })

                        }

                    </div>
                </TabPanel>
            </div>

        </Drawer>
}

export default SiniestroDrawer;