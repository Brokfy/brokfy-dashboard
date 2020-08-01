import { nowrapColumn, checkboxRender } from '../../../../common/utils';

export default () => {
    return [
        {
            name: "idAseguradora",
            label: "IdAseguradora",
            type: "int",
            required: false,
            defaultValue: "",
            options: {
              filter: false,
              sort: false,
              display: false,
              ...nowrapColumn
            }
          },
          {
            name: "nombre",
            label: "Nombre",
            type: "string",
            required: true,
            defaultValue: "",
            visible: true,
            options: {
              filter: true,
              sort: true,
              sortDirection: 'asc',
              ...nowrapColumn
            }
          },
          {
            name: "telefono",
            label: "Teléfono",
            type: "tel",
            required: true,
            visible: true,
            defaultValue: "",
            options: {
              filter: true,
              sort: true,
              ...nowrapColumn
            }
          },
          {
            name: "enabled",
            label: "Habilitado",
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
              customBodyRender: (value, tableMeta, updateValue) => checkboxRender("enabled", value, tableMeta, updateValue),
            }
          },
          {
            name: "cveCopsis",
            label: "CveCopsis",
            type: "int",
            required: true,
            visible: true,
            defaultValue: "",
            options: {
              filter: true,
              sort: true,
              visible: false,
              ...nowrapColumn,
            }
          }
    ]
}