import React, { useState } from 'react';
// import { useHistory, useLocation } from "react-router-dom";
import { 
  // useLogin, 
  useGetToken, useIsAuthenticated 
} from './redux/hooks';

import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import ErrorMessage from '../../components/error-message/error_message';


const PageLogin = (props) => {
  const [datos, guardarDatos] = useState({
    username: '',
    password: '',
  });

  const [ error, guardarError ] = useState({
    username: {
      error: false,
      message: 'El campo es requerido',
    },
    password: {
      error: false,
      message: 'El campo es requerido',
    },
  });

  const { username, password } = datos;

  // const history = useHistory();
  // const location = useLocation();
  // const { login } = useLogin();
  const { isAuthenticated } = useIsAuthenticated();
  const { getToken, getTokenPending, getTokenError } = useGetToken();


  // const { from } = location.state || { from: { pathname: props.location || "/" } };
  const autenticate = e => {
    e.preventDefault();

    if( username.trim() === "" || password.trim() === "" ) {
      guardarError({
        username: {
          error: username.trim() === "",
          message: 'El campo es requerido',
        },
        password: {
          error: password.trim() === "",
          message: 'El campo es requerido',
        },
      });
      return;
    }

    guardarError({
      username: {
        ...error.username,
        error: false,
      },
      password: {
        ...error.password,
        error: false,
      },
    });

    getToken({
      username,
      password,
      grant_type: "password"
    });

    // login();
    // history.replace(from);
  };

  const actualizarFormulario = e => {
    guardarDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className="login">
      <div className="top" style={{ 
        backgroundColor: 
          getTokenError && getTokenError !== '' 
            ? "#d12f4d" 
            : getTokenPending 
              // ? "rgb(94, 87, 89)"
              ? "#4F5B70"
              : isAuthenticated 
                ? "#179a63"
                : null 
      }}>
        <div className="title">Control de Acceso</div>
        { 
          getTokenError && getTokenError !== '' ?
            <ErrorMessage mensaje={getTokenError} classes="detail" /> : 
            null
        }
      </div>
      <div className="body">
        <form autoComplete="off" onSubmit={autenticate}>
          <FormControl className="mb-20">
            <InputLabel htmlFor="username">Usuario</InputLabel>
            <Input id="username" name="username" type="text" value={username} onChange={actualizarFormulario} error={error.username.error} />
            { error.username.error ? <FormHelperText className="error-field-required">{error.username.message}</FormHelperText> : null }
          </FormControl>

          <FormControl className="mb-20">
            <InputLabel htmlFor="password">Contraseña</InputLabel>
            <Input id="password" name="password" type="password" value={password} onChange={actualizarFormulario} error={error.password.error} />
            { error.password.error ? <FormHelperText className="error-field-required">{error.password.message}</FormHelperText> : null }
          </FormControl>
            
          { !error.username.error ? <br/> : null }
          { !error.password.error ? <br/> : null }
          <Button className="btn-login" variant="contained" type="submit" fullWidth={true} disabled={getTokenPending || isAuthenticated }>
            { 
              !getTokenPending || isAuthenticated ? "Iniciar" : "Iniciando..." }
          </Button>
        </form>
      </div>
    </div>
  );
}

export default PageLogin;