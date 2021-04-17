import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Select, FormHelperText } from '@material-ui/core';
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

const useAseguradora = (dropdownAseguradoras = [], defaultAseguradora = null) => {
  const [aseguradora, setAseguradora] = useState('');
  const [idAseguradora, setIdAseguradora] = useState(defaultAseguradora);
  const [options, setOptions] = useState(dropdownAseguradoras);
  const classes = useStyles();
  const { auth } = useGetToken();

  useEffect(() => {
    if( options.length > 0 ) return;
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if( auth && auth.tokenFirebase ) {
      const options = {
        url: `https://apipruebas.brokfy.com:4300/api/Dropdown/aseguradoras`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.tokenFirebase}`,
          'Content-Type': 'application/json',
        },
        cancelToken: source.token
      };

      axios(options)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error(response.status)
          }

          return response.data;
        })
        .then(([{ data }]) => setOptions(data))
        .catch((error) => {});
    }

    return () => {
      source.cancel();
    }
  }, [auth, options.length]);

  const getIdAseguradora = (nombreAseguradora) => {
    if (options.length > 0 && idAseguradora === '')
      //console.log(options)
      setIdAseguradora(options.filter(x => x.nombre.toUpperCase() === nombreAseguradora.toUpperCase())[0].idAseguradora);
  }

  const AseguradoraView = (props) => (
    <FormControl className={classes.formControl} error={props.error}>
      <InputLabel id="poliza-aseguradora-label">* Aseguradora</InputLabel>
      <Select
        labelId="poliza-aseguradora-label"
        id="poliza-aseguradora"
        name="aseguradora"
        value={idAseguradora}
        onChange={event => {
          if( props.onChange && typeof props.onChange === 'function' ) {
            props.onChange();
          }
          event.preventDefault();
          setIdAseguradora(event.target.value);
        }}
      >
        {
          options.map((item, index) => <MenuItem key={`aseguradora-${index}`} value={item.idAseguradora}>{item.nombre}</MenuItem>)
        }
      </Select>
      <FormHelperText>{props.errorMessage}</FormHelperText>
    </FormControl>
  );

  return [aseguradora, AseguradoraView, getIdAseguradora, options, idAseguradora]
}

export default useAseguradora;