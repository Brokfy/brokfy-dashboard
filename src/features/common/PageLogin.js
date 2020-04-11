import React from 'react';
import {
  useHistory,
  useLocation,
} from "react-router-dom";
import { useLogin } from './redux/hooks';

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
        <div class="title">Sign In</div>
      </div>
      <div class="body">
        <form>
          <div class="login-tooltip">Usuario</div>
          <input class="email" type="text" name="email"/>

          <div class="login-tooltip">Contraseña</div>
          <input class="email" type="password" name="email"/>
        </form>
        <a href="https://codepen.io/thechrisbravata/debug/NqPaQZ"><div class="next">next</div></a>
      </div>
    </div>
  );
}

export default PageLogin;