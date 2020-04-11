import React from 'react';
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { useLogin } from './redux/hooks';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';


const PageLogin = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { login } = useLogin();

  const { from } = location.state || { from: { pathname: props.location || "/" } };
  const autenticate = () => {
    login();
    history.replace(from);
  };

  return (
    // <div>
    //   <p>You must log in to view the page at {from.pathname}</p>
    //   <button onClick={autenticate}>Log in</button>
    // </div>
    <div class="login">
      <div class="top">
        <div class="title">Control de Acceso</div>
      </div>
      <div class="body">
        <form autoComplete="off">
        <FormControl>
          <InputLabel htmlFor="user">Usuario</InputLabel>
          <Input id="user" />
        </FormControl>

        <FormControl>
          <InputLabel htmlFor="password">Contraseña</InputLabel>
          <Input id="password" type="password" />
        </FormControl>
          {/* <TextField id="user" type="text" name="email" label="Usuario" />
          <TextField id="password" type="password" name="email" label="Contraseña" /> */}
        </form>
        <br/><br/>
        <Button classes="btn-login" variant="contained" href="#contained-buttons" onClick={autenticate} fullWidth="true">
          Log in
        </Button>
      </div>
    </div>
  );
}

export default PageLogin;