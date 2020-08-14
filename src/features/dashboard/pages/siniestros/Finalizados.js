import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BTable from '../../../../components/btable';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useFetchProductos } from '../../redux/fetchProductos';
import BLoading from '../../../../components/bloading';
import { useHistory } from 'react-router-dom';

import CommentIcon from '@material-ui/icons/Comment';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import TimelineIcon from '@material-ui/icons/Timeline';

import { useFetchSiniestros } from '../../redux/fetchSiniestros';
import getColumnsSiniestros from './siniestros_columnas';
import { getCRUDConfig } from '../../../../common/utils';
import { useFetchDropdownTipoPoliza } from '../../redux/fetchDropdownTipoPoliza';

import SiniestroDrawer from './siniestroDrawer'

const SiniestrosActivos = () => {
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState({
        aseguradoras: false,
        productos: false,
        siniestros: false,
        tipoPolizas: false,
    });
    const [open, setOpen] = React.useState(false);
    const [seleccion, guardarSeleccion] = useState([]);
    const [datosGrid, setDatosGrid] = useState([]);
    const [columns, setColumns] = useState([]);
    const { auth } = useGetToken();

    const [polizaSiniestroDrawer, setPolizaSiniestroDrawer] = useState("");
    const [openSiniestroDrawer, setOpenSiniestroDrawer] = useState(false);

    const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
    const { productos: listadoProducto, fetchProductos, fetchProductosPending } = useFetchProductos();
    const { dropdownTipoPoliza: listadoTipoPoliza, fetchDropdownTipoPoliza, fetchDropdownTipoPolizaPending } = useFetchDropdownTipoPoliza();
    const { siniestros, fetchSiniestros, fetchSiniestrosPending } = useFetchSiniestros();

    const history = useHistory();


    useEffect(() => {
        if (auth.tokenFirebase === "") return;
        if (fetchAseguradorasPending || fetchProductosPending || fetchSiniestrosPending) return;

        if (!datosCargados.aseguradoras) {
            fetchAseguradoras(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                aseguradoras: true,
            });
            return;
        }

        if (!datosCargados.productos) {
            fetchProductos(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                productos: true,
            });
            return;
        }

        if (!datosCargados.tipoPolizas) {
            fetchDropdownTipoPoliza(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                tipoPolizas: true,
            });
            return;
        }

        if (!datosCargados.siniestros) {
            setColumns(getColumnsSiniestros(listadoAseguradora, listadoProducto, listadoTipoPoliza));
            fetchSiniestros({ token: auth.tokenFirebase, activo: 0 });
            setDatosCargados({
                ...datosCargados,
                siniestros: true,
            });
            return;
        }

        setLoading(false);
        setDatosGrid(siniestros);
    }, [auth.tokenFirebase, datosCargados, fetchAseguradoras, fetchProductos, fetchAseguradorasPending, fetchProductosPending, fetchSiniestrosPending, siniestros, fetchSiniestros, listadoAseguradora, listadoProducto, fetchDropdownTipoPoliza, listadoTipoPoliza]);

    const updateSelected = ({ data: [{ index }] }, displayData, setSelectedRows, option, history) => {
        const { data } = displayData[index];
        const noPoliza = data[0];

        setPolizaSiniestroDrawer(noPoliza);
        setOpenSiniestroDrawer(true);
        /* if (option === 1) {
            history.push(`/polizas/todas/confirmaciones/confirmar?poliza=${noPoliza}`);
        } */
    }

    const options = {
        ...getCRUDConfig(
            'Siniestros',
            () => { }, false, null, false,
            () => { }, false, null, false,
            () => { }, false, null, false,
        ),
        buttons: {
            hideCreate: true,
            hideEdit: true,
            hideDelete: true,
            customButtons: [
                {
                    title: "Ver historial",
                    multiple: false,
                    icon: <TimelineIcon />,
                    action: (selectedRows, displayData, setSelectedRows) => updateSelected(selectedRows, displayData, setSelectedRows, 1, history)
                }
            ]
        }
    };

    return (
        <div>
            {loading === true ? <BLoading /> : null}
            {datosCargados && !loading ? <BTable columns={columns} data={datosGrid} options={options} token={auth.tokenFirebase} /> : null}
            <SiniestroDrawer polizaDraw={polizaSiniestroDrawer} estatusPolizaDraw={0} open={openSiniestroDrawer} setOpen={setOpenSiniestroDrawer} />
        </div>
    );
}

export default SiniestrosActivos;