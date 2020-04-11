import React from 'react';
import { useIsAuthenticated } from '../common/redux/hooks';
import { PageLogin } from '../common';
import { useLocation } from 'react-router-dom';

const Protected = (props) => {
  const { isAuthenticated } = useIsAuthenticated();
  const location = useLocation();

  if ( isAuthenticated ) return props.children;

  return <PageLogin location={location.pathname}/>;
}

export default Protected;