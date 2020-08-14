import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import { useGetToken } from '../../common/redux/hooks';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const useTipoPoliza = (dropdownTipoPoliza = []) => {
  const [tipoPoliza, setTipoPoliza] = useState('');
  const [options, setOptions] = useState(dropdownTipoPoliza);
  const classes = useStyles();
  const { auth } = useGetToken();

  useEffect(() => {
    if(options.length > 0) return;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if( auth && auth.tokenFirebase ) {
      const config = {
        url: `https://localhost:44341/api/Dropdown/tipo_poliza`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.tokenFirebase}`,
          'Content-Type': 'application/json',
        },
        cancelToken: source.token
      };

      axios(config)
        .then((response) => {
          if(response.status!==200)
          {
            throw new Error(response.status)
          }

          return response.data;
        })
        .then( ([{data}]) => setOptions(data) )
        .catch((error) => {});
    }

    return () => {
      source.cancel();
    }
  }, [auth, options.length]);

  const setInitialValue = (tipo) => {
    if (options.length > 0 && tipoPoliza === '')
      //console.log(options)
      setTipoPoliza(tipo);
  }

  const TipoPolizaView = (props) => (
    <FormControl className={classes.formControl}>
      <InputLabel id="poliza-TipoPoliza-label">Tipo Poliza</InputLabel>
      <Select
        labelId="poliza-TipoPoliza-label"
        id="poliza-TipoPoliza"
        name="tipo"
        type="text"
        value={tipoPoliza}
        onChange={event => {
          if( props.onChange && typeof props.onChange === 'function' ) {
            props.onChange();
          }
          setTipoPoliza(event.target.value);
        }}
      >
        {
          options.map((item, index) => <MenuItem key={`TipoPoliza-${index}`} value={item.id}>{item.tipo}</MenuItem>)
        }
      </Select>
    </FormControl>
  );

  return [tipoPoliza, TipoPolizaView, setInitialValue, options]
}

export default useTipoPoliza;