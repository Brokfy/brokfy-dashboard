import { nowrapColumn } from '../../../../common/utils';

export default (listadoAseguradoras) => {
    var arrayAseguradoras = [];

    if( listadoAseguradoras ) {
        if( listadoAseguradoras.length > 0 ) {
            arrayAseguradoras = [...listadoAseguradoras.map(item => { return {text: item.nombre, value: item.idAseguradora}; })];
        }
    }

    return [
        {
            name: "id_aseguradora",
            label: "Aseguradora",
            type: "list",
            data: arrayAseguradoras,
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                sortDirection: 'asc',
                disabled: true,
                ...nowrapColumn
            }
        },
        {
            name: "auto",
            label: "Auto",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "moto",
            label: "Moto",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "hogar",
            label: "Hogar",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "salud",
            label: "Salud",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "vida",
            label: "Vida",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "gadget",
            label: "Gadget",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "mascota",
            label: "Mascota",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "viaje",
            label: "Viaje",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "retiro",
            label: "Retiro",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "pyme",
            label: "Pyme",
            type: "long",
            required: true,
            defaultValue: "0.00",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
    ]
}