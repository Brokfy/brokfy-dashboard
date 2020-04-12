import React from 'react';
import { useIsAuthenticated } from '../common/redux/hooks';
import PageProtected from '../common/PageProtected';

const Protected = (props) => {
  const { isAuthenticated } = useIsAuthenticated();

  if ( isAuthenticated ) return props.children;

  return <PageProtected />;
}

export default Protected;