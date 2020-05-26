import React from 'react';
import { useParams } from 'react-router-dom';
import CartaNombramiento from './carta_nombramiento';
import PolizasAutos from './polizas_autos';
import Aprobaciones from './aprobaciones';
import Confirmaciones from './confirmaciones';
import PolizasVida from './polizas_vida';
import PolizasMoto from './polizas_moto';

const Polizas = () => {
  let { propia, tipo } = useParams();

  const Redirect = (value) => {

    switch (value) {
      case 'carta-nombramiento':
        if (propia === "brokfy")
          return <CartaNombramiento />;
        break;
      case 'aprobaciones':
        if (propia === "todas")
          return <Aprobaciones />;
        break;
      case 'confirmaciones':
        if (propia === "todas")
          return <Confirmaciones />
        break;
      case 'auto':
        return <PolizasAutos />;
      case 'vida':
        return <PolizasVida />;
      case 'moto':
        return <PolizasMoto />;
      default:
        return null;
    }
  }

  return Redirect(tipo);
}

export default Polizas;