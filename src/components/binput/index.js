import React from 'react';
import { TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import defaultValues from '../../common/defaultValues';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

const BInput = ({ name, label, type, required, defaultValue, options, editValue, data }) => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();
    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        if( data ) {
            setValue(data.filter( i => i.value === event.target.value )[0].text);
        } else {
            setValue(event.target.value);
        }
    };

    switch (type) {
        case "string":
            return <TextField
                id={name}
                label={label}
                defaultValue={editValue !== null ? editValue : !defaultValue ? defaultValues[type] : defaultValue}
            />;
        case "int":
        case "long":
            return <TextField
                id={name}
                label={label}
                type="number"
                defaultValue={editValue !== null ? editValue : !defaultValue ? defaultValues[type] : defaultValue}
            />;
        case "date":
            return <TextField
                id={name}
                label={label}
                type="date"
                defaultValue={editValue !== null ? editValue : !defaultValue ? defaultValues[type] : defaultValue}
            />
        case "bool":
        case "byte":
            return <FormControlLabel
                control={
                    <Checkbox
                        checked={editValue !== null ? editValue : false}
                        onChange={() => alert("aiuda")}
                        name={name}
                        color="primary"
                    />
                }
                label={label}
            />
        case "list":
            return <FormControl className={classes.formControl} style={{ margin: '0'}}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={name}
                    value={
                        editValue !== null ? 
                            data.filter( i => i.text === ( value !== '' ? value : editValue ) )[0].value : 
                            !defaultValue ? 
                                defaultValues[type] : 
                                defaultValue
                    }
                    onChange={handleChange}
                >
                    {data.map((x,i) => <MenuItem key={`mi_${i}_${name}`} value={x.value}>{x.text}</MenuItem>)}
                </Select>
            </FormControl>
        default:
            break;
    }
}

BInput.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['string', 'date', 'int', 'long', 'byte', 'list']).isRequired,
    required: PropTypes.bool,
    defaultValue: PropTypes.string,
    options: PropTypes.shape({
        filter: PropTypes.bool,
        sort: PropTypes.bool,
    }),
    data: requiredIf(
        PropTypes.arrayOf(
            PropTypes.shape({
                text: PropTypes.string.isRequired, 
                value: PropTypes.number.isRequired
            })
        ),
        props => props.type === 'list'
    ),
}

export default BInput;