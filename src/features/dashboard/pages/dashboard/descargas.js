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
                    <div className="col-lg-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Tópico #1
                            </div>
                            <div className="panel-body panel-body-alt">
                                <span><i className="fa fa-book"></i></span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Tópico #2
                            </div>
                            <div className="panel-body panel-body-alt">
                                <span><i className="fa fa-book"></i></span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Tópico #3
                            </div>
                            <div className="panel-body panel-body-alt">
                                <span><i className="fa fa-book"></i></span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                Tópico #4
                            </div>
                            <div className="panel-body panel-body-alt">
                                <span><i className="fa fa-book"></i></span>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan.</p>
                            </div>
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