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

const useProductos = (dropdownProductos = [], defaultAseguradora = null) => {
  const [productos, setProductos] = useState('');
  const [aseguradora, setAseguradora] = useState(defaultAseguradora);
  const [options, setOptions] = useState(dropdownProductos);
  const classes = useStyles();
  const { auth } = useGetToken();

  useEffect(() => {
    if( options.length > 0 ) return;

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if( auth && auth.tokenFirebase ) {
      const options = {
        url: `https://localhost:44341/api/Dropdown/productos`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.tokenFirebase}`,
          'Content-Type': 'application/json',
        },
        cancelToken: source.token
      };

      axios(options)
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

  const ProductosView = (props) => (
    <FormControl className={classes.formControl} error={props.error}>
      <InputLabel id="poliza-Productos-label">Productos</InputLabel>
      <Select
        labelId="poliza-Productos-label"
        id="poliza-Productos"
        name="producto"
        value={productos}
        onChange={event => setProductos(event.target.value)}
      >
        {
          options
            .filter(item => ((item.aseguradora === aseguradora && aseguradora !== null) || aseguradora === null))
            .map((item, index) => <MenuItem key={`Productos-${index}`} value={item.id}>{item.producto}</MenuItem>)
        }
      </Select>
      <FormHelperText>{props.errorMessage}</FormHelperText>
    </FormControl>
  );

  return [productos, ProductosView, setProductos, options, setAseguradora]
}

export default useProductos;