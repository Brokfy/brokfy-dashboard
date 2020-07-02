import React, { useState } from 'react';
import { TextField, FormHelperText, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import defaultValues from '../../common/defaultValues';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { NumberFormatCustom, getDateFormated } from '../../common/utils';

const BInput = ({ name, label, type, required, defaultValue, options, editValue, data, onChange, error, errorMessage }) => {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const [checkIt, setCheckIt] = useState(false);

    const setInputDate = () => {
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = year + "-" + month + "-" + day;
        
        return today;
    }

    const getDate = (fecha) => {
        var ano, mes, dia;
        try {
            if( fecha.toString().length > 0 ) {
                ano = fecha.substr(6,4);
                mes = fecha.substr(3,2);
                dia = fecha.substr(0,2);
                return getDateFormated(`${ano}-${mes}-${dia} 00:00:00.00`);
            }
        } catch {
            return fecha;
        }
    }

    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        if (data) {
            setValue(data.filter(i => i.value === event.target.value)[0].text);
        } else {
            setValue(event.target.value);
        }
    };

    var editObjectValue = editValue;
    if( typeof editValue === 'object' && editValue !== null ) {
        if( editValue.props && editValue.props.control && editValue.props.control.props ) {
            if( editValue.props.control.props.data ) {
                editObjectValue = editValue.props.control.props.data;
            } else {
                editObjectValue = "";
            }
        }
    }

    switch (type) {
        case "string":
            return <TextField
                id={name}
                name={name}
                label={label}
                defaultValue={editObjectValue !== null ? editObjectValue : !defaultValue ? defaultValues[type] : defaultValue}
                disabled={options.display === false || options.disabled }
                error={error === true}
                helperText={error === true ? errorMessage : ''}
            />;
        case "int":
        case "long":
            return <TextField
                id={name}
                name={name}
                label={label}
                type="number"
                defaultValue={editObjectValue !== null ? editObjectValue : !defaultValue ? defaultValues[type] : defaultValue}
                disabled={options.display === false || options.disabled}
                error={error === true}
                helperText={error === true ? errorMessage : ''}
            />;
        case "currency":
            return <TextField
                id={name}
                name={name}
                label={label}
                defaultValue={editObjectValue !== null ? editObjectValue : !defaultValue ? defaultValues[type] : defaultValue}
                InputProps={{
                    min: 0, 
                    inputComponent: NumberFormatCustom,
                    autoComplete: 'off',
                    form: {
                        autoComplete: 'off',
                    },
                }}
                disabled={options.display === false || options.disabled}
                error={error === true}
                helperText={error === true ? errorMessage : ''}
            />;
        case "date":
            /* return <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    id="fechaFinInput"
                    name={name}
                    format="dd/MM/yyyy"
                    label={label}
                    views={["year", "month", "date"]}
                    value={editObjectValue !== null ? editObjectValue : !defaultValue ? defaultValues[type] : defaultValue}
                    onChange={onChange}
                    disabled={options.display === false || options.disabled}
                    error={error === true}
                    helperText={error === true ? errorMessage : ''}
                />
            </MuiPickersUtilsProvider> */
            // return <TextField
            //     id={name}
            //     name={name}
            //     label={label}
            //     type="date"
            //     defaultValue={editValue !== null ? getDate(editValue) : setInputDate()}
            //     disabled={options.display === false || options.disabled}
            //     error={error === true}
            //     helperText={error === true ? errorMessage : ''}
            // />;
            return <TextField
                id={name}
                name={name}
                label={label}
                type="date"
                defaultValue={editValue !== null ? getDate(editValue) : setInputDate()}
                disabled={options.display === false || options.disabled}
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
                error={error === true}
                helperText={error === true ? errorMessage : ''}
            />;
        case "bool":
        case "byte":
            return <FormControlLabel
                control={
                    <Checkbox
                        name={name}
                        id={name}
                        color="primary"
                        defaultChecked={editValue !== null ? editValue : checkIt}
                        onChange={() => setCheckIt(!checkIt)}
                    />
                }
                label={label}
                disabled={options.display === false || options.disabled}
                error={`${error === true}`}
            />
        case "list":
            var valor = data.filter(i => i.text === (value !== '' ? value : editObjectValue))[0];
            return <FormControl className={classes.formControl} style={{ margin: '0' }} error={error === true}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={name}
                    name={name}
                    value={
                        editObjectValue !== null && valor ?
                            valor.value :
                            !defaultValue ?
                                defaultValues[type] :
                                defaultValue
                    }
                    onChange={(event) => {
                        event.preventDefault();
                        handleChange(event);
                    }}
                    disabled={options.display === false || options.disabled}
                >
                    {data.map((x, i) => <MenuItem key={`mi_${i}_${name}`} value={x.value}>{x.text}</MenuItem>)}
                </Select>
                {
                    error === true ?
                        <FormHelperText>{errorMessage}</FormHelperText> :
                        null
                }
            </FormControl>
        default:
            break;
    }
}

BInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['string', 'date', 'int', 'long', 'byte', 'bool', 'list', 'currency']).isRequired,
    required: PropTypes.bool,
    defaultValue: PropTypes.any,
    options: PropTypes.shape({
        filter: PropTypes.bool,
        sort: PropTypes.bool,
    }),
    data: requiredIf(
        PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.any.isRequired,
                value: PropTypes.any.isRequired
            })
        ),
        props => props.type === 'list'
    ),
    error: PropTypes.bool,
    errorMessage: PropTypes.string
}

export default BInput;