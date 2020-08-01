import format from 'date-fns/format';

export default (data, listadoTipoPoliza, listadoAseguradora, listadoProductos, listadoFormaPago) => {
    return [
        {
            name: "noPoliza",
            label: "* Nro Póliza",
            type: "string",
            required: true,
            defaultValue: data.noPoliza,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "tipo",
            label: "* Tipo Póliza",
            type: "list",
            data: [...listadoTipoPoliza.map(item => { return { text: item.tipo, value: item.id }; })],
            required: true,
            defaultValue: listadoTipoPoliza.filter(i => i.id === parseInt(data.tipo))[0].tipo,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "aseguradora",
            label: "* Aseguradora",
            type: "list",
            data: [...listadoAseguradora.map(item => { return { text: item.nombre, value: item.idAseguradora }; })],
            required: true,
            defaultValue: listadoAseguradora.filter(i => i.idAseguradora === parseInt(data.aseguradora))[0].nombre,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "producto",
            label: "* Producto",
            type: "list",
            data: [...listadoProductos.map(item => { return { text: item.producto, value: item.id }; })],
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "username",
            label: "* Username",
            type: "string",
            required: true,
            defaultValue: data.username,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "noAsegurado",
            label: "Nro Asegurado",
            type: "string",
            required: false,
            defaultValue: data.noAsegurado,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "formaPago",
            label: "* Forma Pago",
            type: "list",
            data: [...listadoFormaPago.map(item => { return { text: item.value, value: item.value }; })],
            required: true,
            defaultValue: data.hasOwnProperty("formaPago") ? 
                (listadoFormaPago.filter(i => i.value === data.formaPago)[0] || {value: ""} ).value : 
                "",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "costo",
            label: "* Prima Total",
            type: "currency",
            required: true,
            defaultValue: data.hasOwnProperty("costo") ? data.costo : 0,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "primaNeta",
            label: "* Prima Neta",
            type: "currency",
            required: true,
            defaultValue: data.hasOwnProperty("primaNeta") ? data.primaNeta : 0,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "costoPrimerRecibo",
            label: "* Primer Recibo",
            type: "currency",
            required: true,
            defaultValue: data.hasOwnProperty("costoPrimerRecibo") ? data.costoPrimerRecibo : 0,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "costoRecibosSubsecuentes",
            label: "* Subsecuentes",
            type: "currency",
            required: true,
            defaultValue: data.hasOwnProperty("costoRecibosSubsecuentes") ? data.costoRecibosSubsecuentes : 0,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "proximoPago",
            label: "* Próximo Pago",
            type: "date",
            required: true,
            defaultValue: data.hasOwnProperty("proximoPago") ? data.proximoPago !== "" ? format(new Date(data.proximoPago), 'dd/MM/yyyy') : "" : "",
            onChange: () => { },
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "fechaInicio",
            label: "* Fecha Inicio",
            type: "date",
            required: true,
            defaultValue: data.hasOwnProperty("fechaInicio") ? data.fechaInicio !== "" ? format(new Date(data.fechaInicio), 'dd/MM/yyyy') : "" : "",
            onChange: () => { },
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "fechaFin",
            label: "* Fecha Fin",
            type: "date",
            required: true,
            defaultValue: data.hasOwnProperty("fechaFin") ? data.fechaFin !== "" ? format(new Date(data.fechaFin), 'dd/MM/yyyy') : format(new Date((new Date()).setDate((new Date().getDate()) + 365)), 'dd/MM/yyyy') : format(new Date((new Date()).setDate((new Date().getDate()) + 365)), 'dd/MM/yyyy'),
            onChange: () => { },
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "habilitada",
            label: "Habilitada",
            type: "bool",
            required: true,
            defaultValue: data.hasOwnProperty("habilitada") ? data.habilitada : true,
            //onChange: () => {},
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "polizaPropia",
            label: "polizaPropia",
            type: "bool",
            required: true,
            defaultValue: false,
            onChange: () => { },
            options: {
                filter: true,
                sort: true,
                display: false
            }
        },
        {
            name: "rcUsaCanada",
            label: "rcUsaCanada",
            type: "bool",
            required: true,
            defaultValue: false,
            onChange: () => { },
            options: {
                filter: true,
                sort: true,
                display: false
            }
        }
    ];
}