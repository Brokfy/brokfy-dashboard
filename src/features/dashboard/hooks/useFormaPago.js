import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useFormaPago = () => {
  const [formaPago, setFormaPago] = useState('');
  const [options, setOptions] = useState([{ value: "Anual" }, { value: "Semestral" }, { value: "Trimestral" }, { value: "Mensual" }]);
  const classes = useStyles();

  const FormaPagoView = () => (
    <FormControl className={classes.formControl}>
      <InputLabel id="poliza-forma-pago-label">Forma de Pago</InputLabel>
      <Select
        labelId="poliza-forma-pago-label"
        id="poliza-forma-pago"
        name="formaPago"
        value={formaPago}
        onChange={event => setFormaPago(event.target.value)}
      >
        {
          options.map(item => {return <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>})
        }
      </Select>
    </FormControl>
  );

  return [formaPago, FormaPagoView, setFormaPago, options]
}

export default useFormaPago;