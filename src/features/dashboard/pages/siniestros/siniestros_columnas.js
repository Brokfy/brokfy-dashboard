import { nowrapColumn, nowrapColumnAlignRight, checkboxRender, listFormasPago, listEstadoPoliza } from '../../../../common/utils';

export default (listadoAseguradoras, listadoProductos, listadoTipoPoliza) => {
    var arrayAseguradoras = [];
    var arrayProductos = [];
    var arrayTipoPoliza = [];

    if (listadoAseguradoras) {
        if (listadoAseguradoras.length > 0) {
            arrayAseguradoras = listadoAseguradoras;
        }
    }

    if (listadoProductos) {
        if (listadoProductos.length > 0) {
            arrayProductos = listadoProductos;
        }
    }

    if (listadoTipoPoliza) {
        if (listadoTipoPoliza.length > 0) {
            arrayTipoPoliza = listadoTipoPoliza;
        }
    }

    return [
        {
            name: "noPoliza",
            label: "No Poliza",
            type: "string",
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                
            }
        },
        {
            name: "tipoPoliza",
            label: "Tipo Poliza",
            type: "string",
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                
            }
        },
        {
            name: "aseguradora",
            label: "Aseguradora",
            type: "string",
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                
            }
        },
        {
            name: "username",
            label: "Usuario",
            type: "string",
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                
            }
        },
        {
            name: "fechaSiniestro",
            label: "Fecha Siniestro",
            type: "string",
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                
            }
        },
        {
            name: "estatusSiniestro",
            label: "Estatus Siniestro",
            type: "string",
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                
            }
        },
    ]
}