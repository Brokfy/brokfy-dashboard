import React, { Fragment } from 'react';
import format from 'date-fns/format'
import NumberFormat from 'react-number-format';

const ReporteHistoricoComisiones = ({data}) => {
    return data && data.length > 0 ?
        data.map((item,index) => {
            if( item.tipoRegistro === 1 ) {
                return (
                    <Fragment key={`report_row_${index}`}>
                        <br/>
                        <div style={{ marginTop: "4px" }}></div>
                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0.4rem" }}>
                            <tbody>
                                <tr>
                                <td width="110" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Aseguradora</b> </td>
                                    <td style={{ border: "none", padding: "0px 8px" }}>{item.aseguradora}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="footable table table-stripped footable-loaded default" style={{ marginBottom: "0" }}>
                            <thead>
                                <tr>
                                    <th className={"table-header-group"} width="250">Fecha Cambio<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Auto<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Moto<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Hogar<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Salud<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Vida<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Gadget<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Mascota<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Viaje<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Registro<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100" style={{ textAlign: "right" }}>Pyme<span className="footable-sort-indicator"></span></th>
                                </tr>
                            </thead>
                        </table>
                    </Fragment>
                );
            }

            if( item.tipoRegistro === 3 ) {
                return (
                    <table key={`report_row_${index}`} className="footable table table-stripped footable-loaded default" style={{ marginBottom: "0" }}>
                        <tbody>
                            <tr>
                                <td className={"table-row"} width="200">{format(new Date(item.fechaCambio), 'dd/MM/yyyy HH:mm:ss')}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.auto.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.moto.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.hogar.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.salud.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.vida.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.gadget.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.mascota.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.viaje.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.retiro.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.pyme.toFixed(2)} displayType={'text'} thousandSeparator={false} suffix={'%'} />}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            }
        }
    ) : null
}

export default ReporteHistoricoComisiones;