import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { insertPagos, useInsertPagos } from '../../redux/insertPagos';
import BLoading from '../../../../components/bloading';
import { useGetToken } from '../../../common/redux/hooks';
import { makeStyles } from '@material-ui/core/styles';
import PolizaDrawer from '../polizas/polizaDrawer';
import { useFetchPolizas } from '../../redux/fetchPolizas';
import RelacionPolizas from './relacion_polizas';
import DatosPago from './datos_pago';
import { getDateFormated } from '../../../../common/utils';
import { useFetchDropdownTipoPoliza } from '../../redux/fetchDropdownTipoPoliza';
import ResumenPago from './resumen_pago';

const RegistrarPago = () => {
    const hoy = getDateFormated();
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState({
        aseguradoras: false,
        tipoPolizas: false
    });
    const { polizas: listadoPolizas, fetchPolizas, fetchPolizasPending } = useFetchPolizas();
    const { auth } = useGetToken();
    const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
    const [datosPago, setDatosPago] = useState({
        aseguradora: '',
        fechaPago: hoy,
        montoPago: '',
        formaPago: '',
        referenciaPago: '',
    });
    const [modoEdicion, setModoEdicion] = useState(true);
    const { dropdownTipoPoliza, fetchDropdownTipoPoliza, fetchDropdownTipoPolizaPending } = useFetchDropdownTipoPoliza();
    const [montoConciliado, setMontoConciliado] = useState(0);
    const [montoNoConciliado, setMontoNoConciliado] = useState(0);
    const [expanded, setExpanded] = useState('');
    const polizas = useSelector(state => state.dashboard.polizas);
    const [open, setOpen] = useState(false);
    const [polizaDraw, setPolizaDraw] = useState('');

    const reset = () => {
        setLoading(true);

        setDatosPago({
            aseguradora: '',
            fechaPago: hoy,
            montoPago: '',
            formaPago: '',
            referenciaPago: '',
        });

        setMontoConciliado(0);
        setMontoNoConciliado(0);
        setExpanded('');
        setModoEdicion(true);
        setOpen(false);
        setPolizaDraw('');
        
        fetchPolizas({reset: true});
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
            marginBottom: theme.spacing(2),
        },
    }));
    const classes = useStyles();

    

    useEffect(() => {
        if (auth.tokenFirebase === "") return;
        if (fetchAseguradorasPending) return;

        if (!datosCargados.tipoPolizas) {
            setLoading(true);
            fetchDropdownTipoPoliza(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                tipoPolizas: true,
            });
            return;
        }

        if (!datosCargados.aseguradoras) {
            setLoading(true);
            fetchAseguradoras(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                aseguradoras: true,
            });
            return;
        }

        setLoading(false);
    }, [auth.tokenFirebase, fetchAseguradorasPending, listadoAseguradora, datosCargados, fetchAseguradoras, fetchDropdownTipoPoliza, polizas, listadoPolizas]);

    useEffect(() => {
        if (auth.tokenFirebase === "") return;
        if (datosPago.aseguradora === "") return;

        fetchPolizas({
            aseguradora: datosPago.aseguradora,
            token: auth.tokenFirebase
        });

    }, [auth.tokenFirebase, datosPago.aseguradora, fetchPolizas]);

    useEffect(() => {
        const totalMontoConciliado = polizas && polizas.length ?
            polizas.reduce((a, b) => a + b.montoPago, 0) : 0;
        setMontoConciliado(totalMontoConciliado);
        setMontoNoConciliado(datosPago.montoPago - totalMontoConciliado);
    }, [polizas, datosPago.montoPago]);

    const openDrawer = (noPoliza) => {
        setPolizaDraw(noPoliza);
        setOpen(true);
    }

    

    return (
        <React.Fragment>
            <div className={classes.root}>
                {loading === true ? <BLoading /> : null}
                {
                    datosCargados && listadoAseguradora && !loading ?
                        <DatosPago
                            listadoAseguradora={listadoAseguradora}
                            datosPago={datosPago}
                            setDatosPago={setDatosPago}
                            modoEdicion={modoEdicion}
                            setModoEdicion={setModoEdicion}
                        /> :
                        null
                }
            </div >

            {fetchPolizasPending === true ? <BLoading /> : null}
            {fetchPolizasPending === false && loading === false && fetchPolizasPending === false && datosPago.aseguradora !== "" && modoEdicion === false ?
                <RelacionPolizas key={`relacion_polizas_aseguradora_${datosPago.aseguradora}`}
                    aseguradora={datosPago.aseguradora}
                    dropdownTipoPoliza={dropdownTipoPoliza}
                    listadoPolizas={polizas}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    openDrawer={openDrawer}
                /> : null
            }

            {fetchPolizasPending === false && loading === false && fetchPolizasPending === false && datosPago.aseguradora !== "" && modoEdicion === false && listadoPolizas && listadoPolizas.length > 0 ?
                <ResumenPago
                    montoPago={datosPago.montoPago === "" ? 0 : datosPago.montoPago}
                    montoConciliado={montoConciliado}
                    montoNoConciliado={montoNoConciliado}
                    polizas={polizas}
                    datosPago={datosPago}
                    auth={auth}
                    reset={reset}
                /> : null
            }

            <PolizaDrawer polizaDraw={polizaDraw} open={open} setOpen={setOpen} />


        </React.Fragment>
    );

}

export default RegistrarPago;