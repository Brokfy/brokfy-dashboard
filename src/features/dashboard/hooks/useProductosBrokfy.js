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

const useProductosBrokfy = () => {
  const [productosBrokfy, setProductosBrokfy] = useState('');
  const [idProductoBrokfy, setIdProductoBrokfy] = useState('');
  const [options, setOptions] = useState([]);
  const classes = useStyles();
  const { auth } = useGetToken();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    
    if( auth && auth.tokenFirebase ) {
      const options = {
        url: `https://3.136.94.107:4300/api/Dropdown/productos_brokfy`,
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
        .catch((error) => { });
    }

    return () => {
      source.cancel();
    }
  }, [auth]);

  const getIdProductoBrokfy = (nombreProductoBrokfy) => {
    if (options.length > 0 && nombreProductoBrokfy === '')
      setIdProductoBrokfy(options.filter(x => x.producto.toUpperCase() === nombreProductoBrokfy.toUpperCase())[0].id);
  }

  const ProductoBrokfyView = () => (
    <FormControl className={classes.formControl}>
      <InputLabel id="productos-brokfy-label">Productos Brokfy</InputLabel>
      <Select
        labelId="productos-brokfy-label"
        id="productoBrokfy"
        name="productoBrokfy"
        value={idProductoBrokfy}
        onChange={event => setIdProductoBrokfy(event.target.value)}
      >
        {
          options.map((item, index) => <MenuItem key={`producto-brokfy-${index}`} value={item.id}>{item.producto}</MenuItem>)
        }
      </Select>
    </FormControl>
  );

  return [productosBrokfy, ProductoBrokfyView, getIdProductoBrokfy, options]
}

export default useProductosBrokfy;