import React from 'react';
import ReporteFacturacionTotal from './detalle/reporte_facturacion_total';
import ReporteComisionesRecibidas from './detalle/reporte_comisiones_recibidas';

const ReporteContenido = ({nombreReporte, data}) => {

    const DetalleReporte = () => {
        switch (nombreReporte) {
            case "FacturacionTotal": return <ReporteFacturacionTotal data={data} />;
            case "Comisiones": return <ReporteComisionesRecibidas data={data} />;
            default: return <></>;
        }
    }

    return (
        <div className="ibox-content m-b-sm border-bottom">
            <div className="p-xs">
                <DetalleReporte />
            </div>
        </div>
    );
}

export default ReporteContenido;