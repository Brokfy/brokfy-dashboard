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
                <span className="titulo-panel">Descargas</span>
                <br /><br />
                <Grid container spacing={3}>
                    <Grid item xs="4">
                        <Button color={"primary"}>Instructivo 1</Button>
                    </Grid>

                    <Grid item xs="4">
                        <Button color={"primary"}>Instructivo 2</Button>
                    </Grid>

                    <Grid item xs="4">
                        <Button color={"primary"}>Instructivo 3</Button>
                    </Grid>

                    <Grid item xs="4">
                        <Button color={"primary"}>Instructivo 4</Button>
                    </Grid>

                    <Grid item xs="4">
                        <Button color={"primary"}>Instructivo 5</Button>
                    </Grid>

                </Grid>
            </div>
        </div>
    );
}

export default Descargas;