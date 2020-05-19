import React from 'react';
import { Grid, Typography } from '@material-ui/core';

const SegundoGadget = (props) => {
    return <div>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h6">Datos para Póliza Gadget</Typography>
            </Grid>

            <Grid item xs={12}>
                <Typography variant="body1">No implementado</Typography>
            </Grid>
        </Grid>
    </div>
}

export default SegundoGadget;