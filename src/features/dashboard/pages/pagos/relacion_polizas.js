import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Grid, Typography, makeStyles, Paper } from '@material-ui/core';
import { getEstadoPolizaLabel } from '../../../../common/utils';
import TipoPolizaPanel from './tipo_poliza_panel';
import { getDateFormated } from '../../../../common/utils';

const RelacionPolizas = (props) => {
    const {expanded, setExpanded} = props;
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(2),
        },
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        secondaryHeadingWhite: {
            fontSize: theme.typography.pxToRem(20),
            color: 'white',
            margin: theme.spacing(2, 0)
        },
    }));
    const classes = useStyles();

    const SeccionRelacionPolizas = (args) => {
        const AseguradoraSinPolizas = (props) => (
            <Typography>
                {`No existen pólizas pendientes de pagos para la aseguradora seleccionada.`}
            </Typography> 
        );

        if( props.listadoPolizas.length === 0 ) {
            return (
                <Paper elevation={3} className={classes.paper}>
                    <Grid container spacing={3} className="pay-grid-column">
                        <Grid item xs={12} >
                            <AseguradoraSinPolizas />
                        </Grid>
                    </Grid>
                </Paper>
            );
        }

        return (
            <Grid container spacing={3} className="pay-grid-column">
                <Grid item xs={12} >
                    {args.children}
                </Grid>
            </Grid>
        );
    }
    
    return (
        <div className={classes.root}>
            <div class="ibox ">
                <div class="ibox-title">
                    <h5>{`Relación de Pólizas por Pagar`}</h5>
                </div>
                <SeccionRelacionPolizas>
                    {
                        props.dropdownTipoPoliza.map(i => 
                            <TipoPolizaPanel 
                                key={`tipo_poliza_row_${i.id}`} 
                                tipoPoliza={i} 
                                listadoPolizas={ props.listadoPolizas.filter(poliza => poliza.tipoPoliza === i.id) } 
                                expanded={expanded} 
                                setExpanded={setExpanded}
                                polizasConciliadas={props.polizasConciliadas}
                                openDrawer={props.openDrawer}
                            />
                        )
                    }
                </SeccionRelacionPolizas>
            </div>
        </div>
    );
}

RelacionPolizas.defaultProps = {
    dropdownTipoPoliza: [],
    listadoPolizas: [],
    polizasConciliadas: []
}

RelacionPolizas.propTypes = {
    aseguradora: PropTypes.number.isRequired,
    dropdownTipoPoliza: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tipo: PropTypes.string.isRequired
        }).isRequired
    ),
    listadoPolizas: PropTypes.array.isRequired,
    openDrawer: PropTypes.func.isRequired
}

const relacionPolizaEsIgual = (prevRender, nextRender) => {
    return (prevRender.aseguradora === nextRender.aseguradora && 
        prevRender.expanded === nextRender.expanded &&
        prevRender.listadoPolizas.length === nextRender.listadoPolizas.length);
}

export default React.memo(RelacionPolizas, relacionPolizaEsIgual);
// export default React.memo(RelacionPolizas);
// export default RelacionPolizas;