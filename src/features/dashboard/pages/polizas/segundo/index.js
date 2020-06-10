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

const SegundoFormulario = ({ tipo, datos }) => {

    switch (tipo) {
        case 1: return <SegundoAuto datos={datos} />;
        case 2: return <SegundoMoto datos={datos}/>;
        case 3: return <SegundoHogar datos={datos}/>;
        case 4: return <SegundoSalud datos={datos}/>;
        case 5: return <SegundoVida datos={datos}/>;
        case 6: return <SegundoGadget datos={datos}/>;
        case 7: return <SegundoMascota datos={datos}/>;
        case 8: return <SegundoViaje datos={datos}/>;
        case 9: return <SegundoRetiro datos={datos}/>;
        case 10: return <SegundoPyme datos={datos}/>;
        default: return <></>;
    }

}

export default SegundoFormulario;