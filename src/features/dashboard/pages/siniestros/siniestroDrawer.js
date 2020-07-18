//#region Import
import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchDetallePoliza } from '../../redux/fetchDetallePoliza';
import BLoading from '../../../../components/bloading';
import { getCRUDConfig } from '../../../../common/utils';
import format from 'date-fns/format'
import { makeStyles } from '@material-ui/core/styles';
import { InputLabel, Select, FormControl, TextField, AppBar, Typography, Button, Grid, MenuItem } from '@material-ui/core'
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
    }
}));




const SiniestroDrawer = (props) => {
    const { polizaDraw, open } = props;
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [datosCargados, setDatosCargados] = useState(false);
    const { detallePoliza: detallePoliza, fetchDetallePoliza, fetchDetallePolizaPending } = useFetchDetallePoliza();
    const { auth } = useGetToken();
    const classes = useStyles();

    const handleDrawerChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (auth.tokenFirebase === "") return;
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
    }, [auth.tokenFirebase, fetchDetallePolizaPending, detallePoliza, datosCargados, fetchDetallePoliza, polizaDraw, open, loading]);


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
                        <Tab icon={<DescriptionIcon />} label="Estatus" {...a11yProps(0)} />
                        <Tab icon={<TimelineIcon />} label="Historia" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="panel panel-default" style={{ marginBottom: "0px" }}>
                                <div className="panel-heading">
                                    Estatus Actual
                                </div>
                                <div className="panel-body">
                                    En proceso
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <div className="panel panel-default" style={{ marginBottom: "0px" }}>
                                <div className="panel-heading">
                                    Cambiar Estatus
                                </div>
                                <div className="panel-body">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            value={2}
                                        >
                                            <MenuItem value={1}>Iniciado</MenuItem>
                                            <MenuItem value={2}>En Proceso</MenuItem>
                                            <MenuItem value={3}>Cancelado</MenuItem>
                                            <MenuItem value={4}>Finalizado</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <br /><br />
                                    <TextField
                                        id="standard-multiline-static"
                                        label="Comentario"
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                    />
                                    <br /><br />
                                    <Button color="primary">Guardar</Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <div className="ibox-content inspinia-timeline">

                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-briefcase"></i>
            6:00 am
            <br />
                                    <small className="text-navy">2 hour ago</small>
                                </div>
                                <div className="col-7 content no-top-border">
                                    <p className="m-b-xs"><strong>Meeting</strong></p>

                                    <p>Conference on the sales results for the previous year. Monica please examine sales trends in marketing and products. Below please find the current status of the
                sale.</p>


                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-file-text"></i>
            7:00 am
            <br />
                                    <small className="text-navy">3 hour ago</small>
                                </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Send documents to Mike</strong></p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-coffee"></i>
            8:00 am
            <br />
                                </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Coffee Break</strong></p>
                                    <p>
                                        Go to shop and find some products.
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.
            </p>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-phone"></i>
            11:00 am
            <br />
                                    <small className="text-navy">21 hour ago</small>
                                </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Phone with Jeronimo</strong></p>
                                    <p>
                                        Lorem Ipsum has been the industry's standard dummy text ever since.
            </p>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-user-md"></i>
            09:00 pm
            <br />
                                    <small>21 hour ago</small>
                                </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Go to the doctor dr Smith</strong></p>
                                    <p>
                                        Find some issue and go to doctor.
            </p>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-user-md"></i>
            11:10 pm
        </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Chat with Sandra</strong></p>
                                    <p>
                                        Lorem Ipsum has been the industry's standard dummy text ever since.
            </p>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-comments"></i>
            12:50 pm
            <br />
                                    <small className="text-navy">48 hour ago</small>
                                </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Chat with Monica and Sandra</strong></p>
                                    <p>
                                        Web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-phone"></i>
            08:50 pm
            <br />
                                    <small className="text-navy">68 hour ago</small>
                                </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Phone to James</strong></p>
                                    <p>
                                        Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
                                </div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="row">
                                <div className="col-3 date">
                                    <i className="fa fa-file-text"></i>
            7:00 am
            <br />
                                    <small className="text-navy">3 hour ago</small>
                                </div>
                                <div className="col-7 content">
                                    <p className="m-b-xs"><strong>Send documents to Mike</strong></p>
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </TabPanel>
            </div>

        </Drawer>
}

export default SiniestroDrawer;