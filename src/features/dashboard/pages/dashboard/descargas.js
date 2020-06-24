import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BLoading from '../../../../components/bloading';
import { Paper, InputBase, Divider, InputAdornment, Grid, TextField, MenuItem, makeStyles, Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import MenuIcon from '@material-ui/icons/Menu';
import { NumberFormatCustom } from '../../../../common/utils';

const Descargas = () => {
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

    return (
        <div className="panel panel-default" style={{ marginBottom: "20px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Descargas Instructivos</span>
                <br /><br />

                <div className="row">
                    <div className="col-lg-12">
                        <div className="dashboard-panel-alt">
                            <div className="panel-body-alt">
                                <div className="descarga">
                                    <div className="enlace-descarga"><span><i className="fa fa-book"></i></span></div>
                                    <div className="enlace-descarga-info">
                                        <h4>Tópico #1</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                    <hr className="MuiDivider-root-min" />
                                </div>

                                <div className="descarga">
                                    <div className="enlace-descarga"><span><i className="fa fa-book"></i></span></div>
                                    <div className="enlace-descarga-info">
                                        <h4>Tópico #2</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                    <hr className="MuiDivider-root-min" />
                                </div>

                                <div className="descarga">
                                    <div className="enlace-descarga"><span><i className="fa fa-book"></i></span></div>
                                    <div className="enlace-descarga-info">
                                        <h4>Tópico #3</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                    <hr className="MuiDivider-root-min" />
                                </div>

                                <div className="descarga">
                                    <div className="enlace-descarga"><span><i className="fa fa-book"></i></span></div>
                                    <div className="enlace-descarga-info">
                                        <h4>Tópico #4</h4>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                    <hr className="MuiDivider-root-min" />
                                </div>
                            </div>

                            {/* <table className="table table-bordered" style={{marginBottom: 0}}>
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tópico #1</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>
                                    <tr>
                                        <td>Tópico #2</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>
                                    <tr>
                                        <td>Tópico #3</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>
                                    <tr>
                                        <td>Tópico #4</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>                                
                                    <tr>
                                        <td>Tópico #4</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>  
                                    <tr>
                                        <td>Tópico #4</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>  
                                    <tr>
                                        <td>Tópico #4</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>  
                                    <tr>
                                        <td>Tópico #4</td>
                                        <td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></td>
                                    </tr>  
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>

                {/* <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Button color={"primary"}>Instructivo 1</Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Button color={"primary"}>Instructivo 2</Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Button color={"primary"}>Instructivo 3</Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Button color={"primary"}>Instructivo 4</Button>
                    </Grid>

                    <Grid item xs={4}>
                        <Button color={"primary"}>Instructivo 5</Button>
                    </Grid>

                </Grid> */}
            </div>
        </div>
    );
}

export default Descargas;