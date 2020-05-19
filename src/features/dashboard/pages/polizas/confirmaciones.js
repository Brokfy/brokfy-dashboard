import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BTable from '../../../../components/btable';
import { useFetchPolizasAuto } from '../../redux/fetchPolizasAuto';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useFetchProductos } from '../../redux/fetchProductos';
import BLoading from '../../../../components/bloading';
import { useUpdatePolizasAuto } from '../../redux/updatePolizasAuto';
import { useDeletePolizasAuto } from '../../redux/deletePolizasAuto';
import { useInsertPolizasAuto } from '../../redux/insertPolizasAuto';
import { useParams, useHistory } from 'react-router-dom';
import format from 'date-fns/format'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { TextField, FormHelperText, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { nowrapColumn, checkboxRender, getEstadoPolizaLabel, listEstadoPoliza } from '../../../../common/utils';

const Confirmaciones = () => {
    const [columns, setColumns] = useState([]);
    const { auth } = useGetToken();

    const { polizasAuto: listadoPolizasAuto, fetchPolizasAuto } = useFetchPolizasAuto();
    const { updatePolizasAuto, updatePolizasAutoPending, updatePolizasAutoError, updatePolizasAutoNotify } = useUpdatePolizasAuto();
    const { deletePolizasAuto, deletePolizasAutoPending, deletePolizasAutoError, deletePolizasAutoNotify } = useDeletePolizasAuto();
    const { insertPolizasAuto, insertPolizasAutoPending, insertPolizasAutoError, insertPolizasAutoNotify } = useInsertPolizasAuto();
    const { aseguradoras: listadoAseguradora, fetchAseguradoras } = useFetchAseguradoras();


    const { productos: listadoProductos, fetchProductos } = useFetchProductos();

    const history = useHistory();
    let { propia, tipo } = useParams();


    useEffect(() => {
        if (auth.tokenFirebase !== "") {


            fetchAseguradoras(auth.tokenFirebase);
            fetchProductos(auth.tokenFirebase);
            fetchPolizasAuto({ propia: propia === "brokfy" ? "Si" : "No", tokenFirebase: auth.tokenFirebase });
        }
    }, [auth.tokenFirebase, fetchPolizasAuto, fetchAseguradoras, fetchProductos, propia]);

    useEffect(() => {
        if (listadoAseguradora && listadoAseguradora.length > 0 && listadoProductos && listadoProductos.length > 0 && listadoPolizasAuto && listadoPolizasAuto.length > 0) {
            setColumns([
                {
                    name: "noPoliza",
                    label: "Póliza",
                    type: "string",
                    required: true,
                    visible: false,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        visible: false,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "formaPago",
                    label: "Forma Pago",
                    type: "list",
                    data: [
                        { text: "Anual", value: "Anual" },
                        { text: "Semestral", value: "Semestral" },
                        { text: "Trimestral", value: "Trimestral" },
                        { text: "Mensual", value: "Mensual" }
                    ],
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "proximoPago",
                    label: "Próximo Pago",
                    type: "date",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "fechaInicio",
                    label: "Fecha Inicio",
                    type: "date",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "fechaFin",
                    label: "Fecha Fin",
                    type: "date",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "idAseguradoras",
                    label: "Aseguradora",
                    type: "list",
                    data: [...listadoAseguradora.map(item => { return { text: item.nombre, value: item.idAseguradora }; })],
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "costo",
                    label: "Prima Total",
                    type: "currency",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                    }
                },
                {
                    name: "primaNeta",
                    label: "Prima Neta",
                    type: "currency",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                    }
                },
                {
                    name: "idEstadoPoliza",
                    label: "Estado",
                    type: "list",
                    data: [...listEstadoPoliza],
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },

                {
                    name: "username",
                    label: "Usuario",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "productoId",
                    label: "Producto",
                    type: "list",
                    data: [...listadoProductos.map(item => { return { text: item.producto, value: item.id }; })],
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "habilitada",
                    label: "Habilitada",
                    type: "list",
                    data: [{ text: "Si", value: "Si" }, { text: "No", value: "No" }],
                    required: true,
                    visible: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        visible: false,
                        ...nowrapColumn,
                        customBodyRender: (value, tableMeta, updateValue) => checkboxRender("habilitada", value, tableMeta, updateValue),
                    },
                },
                {
                    name: "noAsegurado",
                    label: "Nro Asegurado",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "polizaPropia",
                    label: "Póliza Propia",
                    type: "list",
                    data: [{ text: "Si", value: "Si" }, { text: "No", value: "No" }],
                    required: false,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        display: false,
                        ...nowrapColumn,
                        customBodyRender: (value, tableMeta, updateValue) => checkboxRender("polizaPropia", value, tableMeta, updateValue),
                    },
                },
                {
                    name: "polizaPdf",
                    label: "Póliza PDF",
                    type: "string",
                    required: false,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        display: false,
                    }
                },
                {
                    name: "reciboPdf",
                    label: "Recibo PDF",
                    type: "string",
                    required: false,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        display: false,
                    }
                },
                {
                    name: "rcUsaCanada",
                    label: "rcUsaCanada",
                    type: "list",
                    data: [{ text: "Si", value: "Si" }, { text: "No", value: "No" }],
                    required: false,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        display: false,
                        ...nowrapColumn,
                        customBodyRender: (value, tableMeta, updateValue) => checkboxRender("rcUsaCanada", value, tableMeta, updateValue),
                    },
                },
                {
                    name: "costoPrimerRecibo",
                    label: "Costo Primer Recibo",
                    type: "currency",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                    }
                },
                {
                    name: "costoRecibosSubsecuentes",
                    label: "Costo Recibos Subsecuentes",
                    type: "currency",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap', textAlign: 'right' } }),
                    }
                },
                {
                    name: "marca",
                    label: "Marca",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "modelo",
                    label: "Modelo",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "ano",
                    label: "Año",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "placas",
                    label: "Placa",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "clave",
                    label: "Clave",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
                {
                    name: "codigoPostal",
                    label: "Código Postal",
                    type: "string",
                    required: true,
                    defaultValue: "",
                    options: {
                        filter: true,
                        sort: true,
                        setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                        setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
                    }
                },
            ]);
        }
    }, [auth, listadoAseguradora, listadoProductos, listadoPolizasAuto]);

    const updateSelected = ({ data: [{ index }] }, displayData, setSelectedRows, option, history) => {
        const { data } = displayData[index];
        const noPoliza = data[5];

        if (option === 1) {
            history.push(`/polizas/todas/aprobaciones/confirmar?poliza=${noPoliza}`);
        }
    }

    const options = {
        module: "PolizaAuto",
        buttons: {
            hideCreate: true,
            hideEdit: false,
            hideDelete: false,
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
                    }
                }
            ]
        },
        actions: {
            PUT: {
                action: updatePolizasAuto,
                pending: updatePolizasAutoPending,
                error: updatePolizasAutoError,
                display: updatePolizasAutoNotify === true &&
                    (updatePolizasAutoPending === false ?
                        (updatePolizasAutoError !== null ?
                            updatePolizasAutoError :
                            "Registro actualizado exitosamente")
                        : "") !== "",
                message: ""
            },
            POST: {
                action: insertPolizasAuto,
                pending: insertPolizasAutoPending,
                error: insertPolizasAutoError,
                display: insertPolizasAutoNotify === true && (insertPolizasAutoPending === false ?
                    (insertPolizasAutoError !== null ?
                        insertPolizasAutoError :
                        "Registro ingresado exitosamente")
                    : "") !== "",
                message: insertPolizasAutoPending === false ?
                    (insertPolizasAutoError !== null ?
                        insertPolizasAutoError :
                        "Registro ingresado exitosamente")
                    : ""
            },
            DELETE: {
                action: deletePolizasAuto,
                pending: deletePolizasAutoPending,
                error: deletePolizasAutoError,
                display: deletePolizasAutoNotify === true && (deletePolizasAutoPending === false ?
                    (deletePolizasAutoError !== null ?
                        deletePolizasAutoError :
                        "Registro eliminado exitosamente")
                    : "") !== "",
                message: deletePolizasAutoPending === false ?
                    (deletePolizasAutoError !== null ?
                        deletePolizasAutoError :
                        "Registro eliminado exitosamente")
                    : ""
            }
        }
    };

    if (columns.length > 0) {
        return (
            <BTable columns={columns} data={listadoPolizasAuto} options={options} isLoading={false} refreshData={fetchPolizasAuto} token={auth.tokenFirebase} />
        );
    } else {
        return <BLoading display={true} />;
    }
}

export default Confirmaciones;