import React from 'react';
import { TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import defaultValues from '../../common/defaultValues';

const BInput = ({ name, label, type, required, defaultValue, options }) => {
    switch (type) {
        case "string":
            return <TextField
                id={name}
                label={label}
                defaultValue={!defaultValue ? defaultValues[type] : defaultValue}
            />;
        case "int":
        case "long":
            return <TextField
                id={name}
                label={label}
                type="number"
                defaultValue={!defaultValue ? defaultValues[type] : defaultValue}
            />;
        case "date":
            return <TextField
                id={name}
                label={label}
                type="date"
                defaultValue={!defaultValue ? defaultValues[type] : defaultValue}
            />
        case "bool":
        case "byte":
            return <FormControlLabel
                control={
                    <Checkbox
                        checked={false}
                        onChange={() => alert("aiuda")}
                        name={name}
                        color="primary"
                    />
                }
                label={label}
            />
        default:
            break;
    }
}

    export default BInput;