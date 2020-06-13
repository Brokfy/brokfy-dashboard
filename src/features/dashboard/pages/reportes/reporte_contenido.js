import React from 'react';
import ReporteFacturacionTotal from './detalle/reporte_facturacion_total';
import ReporteComisionesRecibidas from './detalle/reporte_comisiones_recibidas';
import ReporteComisionesPendientes from './detalle/reporte_comisiones_pendientes';

const ReporteContenido = ({nombreReporte, data}) => {
    
    const DetalleReporte = () => {
        switch (nombreReporte) {
            case "FacturacionTotal": return <ReporteFacturacionTotal data={data} />;
            case "Comisiones": return <ReporteComisionesRecibidas data={data} />;
            case "ComisionesPendientes": return <ReporteComisionesPendientes data={data} />;
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