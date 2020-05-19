import React from 'react';
import { nowrapColumn, checkboxRender } from '../../../../common/utils';
import { Select, InputLabel, MenuItem, Checkbox, ListItemText, FormControl, IconButton } from '@material-ui/core';
import { LinkOutlined } from '@material-ui/icons';

export default (listadoTipoPoliza, listadoAseguradoras) => {
    var arrayTipoPoliza = [];
    var arrayAseguradoras = [];

    if( listadoTipoPoliza ) {
        if( listadoTipoPoliza.length > 0 ) {
            arrayTipoPoliza = listadoTipoPoliza;
        }
    }

    if( listadoAseguradoras ) {
        if( listadoAseguradoras.length > 0 ) {
            arrayAseguradoras = listadoAseguradoras;
        }
    }

    return [
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
            name: "nombre",
            label: "Nombre",
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
            name: "tipo",
            label: "Tipo",
            type: "list",
            data: [...arrayTipoPoliza.map(item => { return { text: item.tipo, value: item.id }; })],
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn,
            }
        },
        {
            name: "aseguradora",
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
            name: "fecha",
            label: "Fecha",
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
            name: "noPoliza",
            label: "Póliza",
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
            name: "revisado",
            label: "Revisado",
            type: "string",
            required: true,
            defaultValue: "",
            
            options: {
                display: false,
                filter: false,
                sort: false,
                filterType: 'custom',
                filterOptions: {
                    names: ['Revisado', 'No revisado'],
                    logic: (revisado, filters) => {
                        const show =
                        (filters.indexOf('Revisado') >= 0 && revisado === 'Si') ||
                        (filters.indexOf('No revisado') >= 0 && revisado === 'No');
                        return filters.length ? !show : false;
                    },
                    display: (filterList, onChange, index, column) => {
                        const optionValues = ['Revisado', 'No revisado'];
                        return (
                            <FormControl>
                                <InputLabel htmlFor='select-multiple-chip'>
                                    Revisado
                                </InputLabel>
                                <Select
                                    multiple
                                    value={filterList[index]}
                                    renderValue={selected => selected.join(', ')}
                                    onChange={event => {
                                        filterList[index] = event.target.value;
                                        onChange(filterList[index], index, column);
                                    }}
                                >
                                    {optionValues.map(item => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox
                                                color='primary'
                                                checked={filterList[index].indexOf(item) > -1}
                                            />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    }
                },
                customBodyRender: (value, tableMeta, updateValue) => checkboxRender("revisado", value, tableMeta, updateValue),
            }
        },
        {
            name: "urlPoliza",
            label: "Documento",
            type: "string",
            required: true,
            defaultValue: "",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    if( value === null || value.toString().trim() === "" ) {
                        return null;
                    }

                    return (
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=> window.open(value, "_blank")}>
                            <LinkOutlined />
                        </IconButton>
                    );
                }
            }
        },
        {
            name: "urlCartaNombramiento",
            label: "Carta Nombramiento",
            type: "string",
            required: true,
            defaultValue: "",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    if( value === null || value.toString().trim() === "" ) {
                        return null;
                    }

                    return (
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=> window.open(value, "_blank")}>
                            <LinkOutlined />
                        </IconButton>
                    );
                }
            }
        },
        {
            name: "firmada",
            label: "Firmada",
            type: "string",
            required: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: true,
                filterType: 'custom',
                filterOptions: {
                    names: ['Firmada', 'No firmada'],
                    logic: (firmada, filters) => {
                        const show = (filters.indexOf('Firmada') >= 0 && firmada === 'Si') ||
                            (filters.indexOf('No firmada') >= 0 && firmada === 'No');
                        return filters.length ? !show : false;
                    },
                    display: (filterList, onChange, index, column) => {
                        const optionValues = ['Firmada', 'No firmada'];
                        return (
                            <FormControl>
                                <InputLabel htmlFor='select-multiple-chip'>
                                    Firmada
                                </InputLabel>
                                <Select
                                    multiple
                                    value={filterList[index]}
                                    renderValue={selected => selected.join(', ')}
                                    onChange={event => {
                                        filterList[index] = event.target.value;
                                        onChange(filterList[index], index, column);
                                    }}
                                >
                                    {optionValues.map(item => (
                                        <MenuItem key={item} value={item}>
                                        <Checkbox
                                            color='primary'
                                            checked={filterList[index].indexOf(item) > -1}
                                        />
                                        <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    }
                },
                customBodyRender: (value, tableMeta, updateValue) => checkboxRender("firmada", value, tableMeta, updateValue),
            }
        }
    ]
}