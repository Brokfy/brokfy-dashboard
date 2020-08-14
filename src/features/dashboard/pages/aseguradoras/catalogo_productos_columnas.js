import React from 'react';
import { nowrapColumn, checkboxRender } from '../../../../common/utils';
import { Select, InputLabel, MenuItem, Checkbox, ListItemText, FormControl } from '@material-ui/core';

export default (listadoAseguradora, listadoProductosBrokfy) => {
    var arrayAseguradoras = [];
    var arrayProductosBrokfy = [];

    if( listadoAseguradora ) {
        if( listadoAseguradora.length > 0 ) {
            arrayAseguradoras = listadoAseguradora;
        }
    }

    if( listadoProductosBrokfy ) {
        if( listadoProductosBrokfy.length > 0 ) {
            arrayProductosBrokfy = listadoProductosBrokfy;
        }
    }

    return [
        {
            name: "id",
            label: "id",
            type: "int",
            required: true,
            defaultValue: "",
            options: {
                filter: false,
                sort: false,
                display: false,
                ...nowrapColumn
            }
        },
        {
            name: "aseguradora",
            label: "Aseguradora",
            type: "list",
            data: [...arrayAseguradoras.map(item => { return {text: item.nombre, value: item.idAseguradora}; })],
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
            name: "producto",
            label: "Producto",
            type: "string",
            required: true,
            defaultValue: "",
            visible: true,
            options: {
                filter: true,
                sort: true,
                ...nowrapColumn
            }
        },
        {
            name: "idProductos",
            label: "Producto Brokfy",
            type: "list",
            data: [...arrayProductosBrokfy.map(item => { return {text: item.producto, value: item.id}; })],
            required: true,
            defaultValue: "",
            visible: true,
            options: {
                filter: false,
                sort: false,
                ...nowrapColumn
            }
        },
        {
            name: "xml",
            label: "XML",
            type: "string",
            required: false,
            defaultValue: "",
            visible: true,
            options: {
                filter: true,
                sort: false,
                display: true,
                ...nowrapColumn,
                filterType: 'custom',
                filterOptions: {
                    names: ['Tiene XML', 'No tiene XML'],
                    logic: (xml, filters) => {
                        // xml = xml.replace(/[^\d]/g, '');
                        const show =
                            (filters.indexOf('Tiene XML') >= 0 && xml === "Si") ||
                            (filters.indexOf('No tiene XML') >= 0 && xml === "No");
                        return filters.length ? !show : false;
                    },
                    display: (filterList, onChange, index, column) => {
                        const optionValues = ['Tiene XML', 'No tiene XML'];
                        return (
                            <FormControl>
                                <InputLabel htmlFor='select-multiple-chip'>
                                    XML
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
                customBodyRender: (value, tableMeta, updateValue) =>  checkboxRender("xml", value, tableMeta, updateValue)
            }
        },
        {
            name: "xmlEmision",
            label: "XML Emision",
            type: "string",
            required: false,
            visible: true,
            defaultValue: "",
            options: {
                filter: true,
                sort: false,
                display: true,
                ...nowrapColumn,
                filterType: 'custom',
                filterOptions: {
                    names: ['Tiene XML Emisión', 'No tiene XML Emisión'],
                    logic: (xmlEmision, filters) => {
                        // xmlEmision = xmlEmision.replace(/[^\d]/g, '');
                        const show =
                            (filters.indexOf('Tiene XML Emisión') >= 0 && xmlEmision === "Si") ||
                            (filters.indexOf('No tiene XML Emisión') >= 0 && xmlEmision === "No");
                        return filters.length ? !show : false;
                    },
                    display: (filterList, onChange, index, column) => {
                        const optionValues = ['Tiene XML Emisión', 'No tiene XML Emisión'];
                        return (
                            <FormControl>
                                <InputLabel htmlFor='select-multiple-chip'>
                                    XML Emisión
                                </InputLabel>
                                <Select
                                    multiple
                                    value={filterList[index]}
                                    renderValue={selected => selected.join(', ')}
                                    onChange={event => {
                                        event.preventDefault();
                                        filterList[index] = event.target.value;
                                        onChange(filterList[index], index, column);
                                    }}
                                >
                                    {optionValues.map(item => (
                                        <MenuItem key={item} value={item}>
                                            <Checkbox
                                                color='primary'
                                                checked={filterList[index].indexOf(item) > -1}
                                                onChange={event => event.preventDefault()}
                                            />
                                            <ListItemText primary={item} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        );
                    }
                },
                customBodyRender: (value, tableMeta, updateValue) => checkboxRender("xmlEmision", value, tableMeta, updateValue)
            }
        },
    ];
}