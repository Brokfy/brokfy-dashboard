import { nowrapColumn, nowrapColumnAlignRight, checkboxRender, listEstadoPoliza } from '../../../../common/utils';

export default (listadoAseguradoras, listadoProductos) => {
    var arrayAseguradoras = [];
    var arrayProductos = [];

    if( listadoAseguradoras ) {
        if( listadoAseguradoras.length > 0 ) {
            arrayAseguradoras = listadoAseguradoras;
        }
    }

    if( listadoProductos ) {
        if( listadoProductos.length > 0 ) {
            arrayProductos = listadoProductos;
        }
    }

    return [
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
                ...nowrapColumn,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
            }
        },
        {
            name: "idAseguradoras",
            label: "Aseguradora",
            type: "list",
            data: [...arrayAseguradoras.map(item => { return { text: item.nombre, value: item.idAseguradora }; })],
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn,
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
                ...nowrapColumnAlignRight,
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
                ...nowrapColumnAlignRight,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
            }
        },
        {
            name: "productoId",
            label: "Producto",
            type: "list",
            data: [...arrayProductos.map(item => { return { text: item.producto, value: item.id }; })],
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn,
            }
        },
        {
            name: "habilitada",
            label: "Habilitada",
            type: "list",
            data: [{text: "Si", value: "Si"},{text: "No", value: "No"}],
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
                ...nowrapColumn,
            }
        },
        {
            name: "polizaPropia",
            label: "Póliza Propia",
            type: "list",
            data: [{text: "Si", value: "Si"},{text: "No", value: "No"}],
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
            data: [{text: "Si", value: "Si"},{text: "No", value: "No"}],
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
            label: "Primer Recibo",
            type: "currency",
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                ...nowrapColumnAlignRight,
            }
        },
        {
            name: "costoRecibosSubsecuentes",
            label: "Recibos Subsecuentes",
            type: "currency",
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                ...nowrapColumnAlignRight,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
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
                ...nowrapColumn,
            }
        }
    ]
}