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
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={autenticate}>Log in</button>
    </div>
  );
}

export default PageLogin;