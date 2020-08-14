import React, { useEffect } from 'react';
import { useIsAuthenticated } from '../common/redux/hooks';
import PageProtected from '../common/PageProtected';
import { useLocation } from 'react-router-dom'
import { useFetchRestricciones } from './redux/fetchRestricciones';

const Protected = (props) => {

  const { isAuthenticated } = useIsAuthenticated();
  const { restricciones } = useFetchRestricciones();
  const location = useLocation();

  console.log({ restricciones, location });

  if(!restricciones) 
    return props.children;

  if (restricciones.length > 0 && restricciones.filter(x => x.ruta === location.pathname).length > 0)
    return <PageProtected />;

  if (isAuthenticated)
    return props.children;

  return <PageProtected />;
}

export default Protected;