import React from 'react';
import SegundoAuto from './auto';
import SegundoMoto from './moto';
import SegundoHogar from './hogar';
import SegundoSalud from './salud';
import SegundoVida from './vida';
import SegundoGadget from './gadget';
import SegundoMascota from './mascota';
import SegundoViaje from './viaje';
import SegundoRetiro from './retiro';
import SegundoPyme from './pyme';

const SegundoFormulario = ({ tipo }) => {

    switch (tipo) {
        case 1: return <SegundoAuto />;
        case 2: return <SegundoMoto />;
        case 3: return <SegundoHogar />;
        case 4: return <SegundoSalud />;
        case 5: return <SegundoVida />;
        case 6: return <SegundoGadget />;
        case 7: return <SegundoMascota />;
        case 8: return <SegundoViaje />;
        case 9: return <SegundoRetiro />;
        case 10: return <SegundoPyme />;
        default: return <></>;
    }

}

export default SegundoFormulario;