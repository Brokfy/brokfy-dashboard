import React from 'react';
import {
  useLocation,
} from "react-router-dom";

const PageProtected = (props) => {
  const location = useLocation();
  const { from } = location.state || { from: { pathname: props.location || "/" } };
  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
    </div>
  );
}

export default PageProtected;