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

const useCascadaMarcaModelo = () => {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [options, setOptions] = useState([]);
  const classes = useStyles();
  const { auth } = useGetToken();

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    if (auth && auth.tokenFirebase) {
      const config = {
        url: `https://localhost:44341/api/Dropdown/cascadaMarcaModelo`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${auth.tokenFirebase}`,
          'Content-Type': 'application/json',
        },
        cancelToken: source.token
      };

      axios(config)
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

  const setInitialValue = (tipo) => {
    if (options.length > 0 && marca === '')
      //console.log(options)
      setMarca(tipo);
  }

  const useCascadaMarcaView = () => {
    return <FormControl className={classes.formControl}>
      <InputLabel id="poliza-Marca-label">Marca</InputLabel>
      <Select
        labelId="poliza-Marca-label"
        id="poliza-Marca"
        name="tipo"
        type="text"
        value={marca}
        onChange={event => setMarca(event.target.value)}
      >
        {
          options.map((item, index) => <MenuItem key={`Marca-${index}`} value={item.marcas}>{item.marcas}</MenuItem>)
        }
      </Select>
    </FormControl>
  }

  const useCascadaModeloView = () => {
    return <FormControl className={classes.formControl}>
      <InputLabel id="poliza-Modelo-label">Modelo</InputLabel>
      <Select
        labelId="poliza-Modelo-label"
        id="poliza-Modelo"
        name="tipo"
        type="text"
        value={modelo}
        onChange={event => setModelo(event.target.value)}
      >
        {
          options.filter(x => x.marcas == marca).map((item, index) => <MenuItem key={`Modelo-${index}`} value={item.nomModelo}>{item.nomModelo}</MenuItem>)
        }
      </Select>
    </FormControl>
  }

  return [marca, useCascadaMarcaView, useCascadaModeloView, setInitialValue, options]
}



export default useCascadaMarcaModelo;