import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BTable from '../../../../components/btable';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useFetchProductos } from '../../redux/fetchProductos';
import BLoading from '../../../../components/bloading';
import { useHistory } from 'react-router-dom';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useFetchPolizasPorConfirmar } from '../../redux/fetchPolizasPorConfirmar';
import getColumnsConfirmaciones from './confirmaciones_columnas';
import { getCRUDConfig } from '../../../../common/utils';

const Confirmaciones = () => {
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState({
      aseguradoras: false,
      productos: false,
      polizasPorConfirmar: false,
    });
    const [open, setOpen] = React.useState(false);
    const [seleccion, guardarSeleccion] = useState([]);
    const [datosGrid, setDatosGrid] = useState([]);
    const [columns, setColumns] = useState([]);
    const { auth } = useGetToken();

    const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
    const { productos: listadoProducto, fetchProductos, fetchProductosPending } = useFetchProductos();
    const { polizasPorConfirmar: listadoPolizasPorConfirmar, fetchPolizasPorConfirmar, fetchPolizasPorConfirmarPending } = useFetchPolizasPorConfirmar();

    const history = useHistory();


    useEffect(() => {
        if (auth.tokenFirebase === "") return; 
        if(fetchAseguradorasPending || fetchProductosPending || fetchPolizasPorConfirmarPending) return;

        if ( !datosCargados.aseguradoras ) {
            fetchAseguradoras(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                aseguradoras: true,
            });
            return;
        }
            
        if ( !datosCargados.productos ) {
            fetchProductos(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                productos: true,
            });
            return;
        }

        if ( !datosCargados.polizasPorConfirmar ) {
            setColumns(getColumnsConfirmaciones(listadoAseguradora, listadoProducto));
            fetchPolizasPorConfirmar(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                polizasPorConfirmar: true,
            });
            return;
        }
        
        setLoading(false);
        setDatosGrid(listadoPolizasPorConfirmar);
    }, [auth.tokenFirebase, datosCargados, fetchAseguradoras, fetchProductos, fetchAseguradorasPending, fetchProductosPending, fetchPolizasPorConfirmarPending, listadoPolizasPorConfirmar, fetchPolizasPorConfirmar, listadoAseguradora, listadoProducto]);

    const updateSelected = ({ data: [{ index }] }, displayData, setSelectedRows, option, history) => {
        const { data } = displayData[index];
        const noPoliza = data[0];

        if (option === 1) {
            history.push(`/polizas/todas/confirmaciones/confirmar?poliza=${noPoliza}`);
        }
    }

    const openDialog = () => {
        setOpen(true);
    };
    
    const closeDialog = () => {
        setOpen(false);
    };
    
    const rechazarPolizas = () => {
        if( seleccion.length > 0 ) {
            // TODO: Rechazar poliza
        }
    }

    const options = {
        ...getCRUDConfig(
            'Confirmaciones', 
            () => {}, false, null, false,
            () => {}, false, null, false,
            () => {}, false, null, false,
        ),
        buttons: {
            hideCreate: true,
            hideEdit: true,
            hideDelete: true,
            customButtons: [
                {
                    title: "Aprobar",
                    multiple: false,
                    icon: <ThumbUpIcon />,
                    action: (selectedRows, displayData, setSelectedRows) => updateSelected(selectedRows, displayData, setSelectedRows, 1, history)
                },
                {
                    title: "Rechazar",
                    multiple: true,
                    icon: <ThumbDownIcon />,
                    action: (selectedRows, displayData, setSelectedRows) => {
                        const arrElementSelected = selectedRows.data.map(item => item.index);
                        const polizasSeleccionadas = arrElementSelected.map(item => displayData[item].data[5]);
                        guardarSeleccion(polizasSeleccionadas);
                        openDialog();
                    }
                }
            ]   
        }
    };

    return (
        <div>
          { loading === true ? <BLoading /> : null }
          { datosCargados && !loading ? <BTable columns={columns} data={datosGrid} options={options} token={auth.tokenFirebase} /> : null }
        </div>
    );
}

export default Confirmaciones;