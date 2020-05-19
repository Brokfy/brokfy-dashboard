import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { 
    ExpansionPanel, ExpansionPanelSummary, Typography, makeStyles, ExpansionPanelDetails, 
    TableContainer, Table, TableHead, TableRow, TableCell, Button, TextField,TableBody 
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NumberFormat from 'react-number-format';
import { NumberFormatCustom } from '../../../../common/utils';
import { useChangePoliza } from '../../redux/changePoliza';

const TipoPolizaPanel = ({ tipoPoliza: { id, tipo }, listadoPolizas, expanded, setExpanded, openDrawer }) => {
    const { changePoliza } = useChangePoliza();

    const useStyles = makeStyles((theme) => ({
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        table: {
            minWidth: 650,
        },
    }));
    const classes = useStyles();

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : '');
    };

    if( listadoPolizas.length === 0 ) {
        return null;
    }

    const listadoPolizaAlter = [
        {
            noPoliza: "TEST-124",
            vencimiento: "03/06/2020",
            comision: 100,
            montoPagado: 0,
            montoPago: 0,
        },
        {
            noPoliza: "TEST-124",
            vencimiento: "03/07/2020",
            comision: 100,
            montoPagado: 0,
            montoPago: 0,
        },
        {
            noPoliza: "TEST-124",
            vencimiento: "03/08/2020",
            comision: 100,
            montoPagado: 0,
            montoPago: 0,
        },
        {
            noPoliza: "TEST-124",
            vencimiento: "03/09/2020",
            comision: 100,
            montoPagado: 0,
            montoPago: 0,
        },
        {
            noPoliza: "TEST-124",
            vencimiento: "03/10/2020",
            comision: 100,
            montoPagado: 0,
            montoPago: 0,
        },
        {
            noPoliza: "TEST-124",
            vencimiento: "03/11/2020",
            comision: 100,
            montoPagado: 0,
            montoPago: 0,
        },
        // {
        //     noPoliza: "TEST-124",
        //     vencimiento: "03/12/2020",
        //     comision: 100,
        //     montoPagado: 0,
        //     montoPago: 0,
        // },
    ]



    return (
        <ExpansionPanel expanded={expanded === tipo} onChange={handleChange(tipo)}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography className={classes.heading}>{ tipo }</Typography>
                <Typography className={classes.secondaryHeading}>({ listadoPolizaAlter.length } registros)</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <TableContainer className={"mh-500"}>
                    <Table className={classes.table} aria-label="a dense table" size='small'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Póliza</TableCell>
                                <TableCell>Vencimiento</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell align="right">Pagado</TableCell>
                                <TableCell align="right">Saldo</TableCell>
                                <TableCell align="right">Pago</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listadoPolizaAlter.map((row, i) => (
                                <TableRow key={`row_poliza_${i}`}>
                                    <TableCell>
                                        <Button color='primary'  className={"btn-link"} onClick={ () => openDrawer(row.noPoliza) }>
                                            {row.noPoliza}
                                        </Button>
                                    </TableCell>
                                    <TableCell>{row.vencimiento}</TableCell>

                                    <TableCell align="right">
                                        <NumberFormat value={row.comision} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </TableCell>

                                    <TableCell align="right">
                                        <NumberFormat value={row.montoPagado} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </TableCell>

                                    <TableCell align="right">
                                        <NumberFormat value={row.comision - row.montoPagado} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </TableCell>

                                    <TableCell align="right">
                                        <TextField
                                            defaultValue={row.montoPago}
                                            name="montoPago"
                                            id="montoPago"
                                            InputProps={{
                                                inputComponent: NumberFormatCustom,
                                                autoComplete: "off",
                                            }}
                                            onBlur={(event) => {
                                                changePoliza({ poliza: row.noPoliza, valor: parseFloat(event.target.value.replace("$", "").replace(",",""))});
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );
}

TipoPolizaPanel.propTypes = {
    tipoPoliza: PropTypes.shape({
        id: PropTypes.number.isRequired,
        tipo: PropTypes.string.isRequired
    }).isRequired,
    listadoPolizas: PropTypes.any,
    expanded: PropTypes.string.isRequired,
    setExpanded: PropTypes.func.isRequired,
    openDrawer: PropTypes.func.isRequired
}

export default TipoPolizaPanel;