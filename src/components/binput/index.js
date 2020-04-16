import React from 'react';
import { TextField, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import defaultValues from '../../common/defaultValues';
import { makeStyles } from '@material-ui/core/styles';

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
        setValue(event.target.value);
    };

    console.log(data)

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
            return <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id={name}
                    value={editValue !== null ? editValue : !defaultValue ? defaultValues[type] : defaultValue}
                    onChange={handleChange}
                >
                    {data.map(x => <MenuItem key={`mi${name}`} value={x.value}>{x.text}</MenuItem>)}
                </Select>
            </FormControl>
        default:
            break;
    }
}

export default BInput;