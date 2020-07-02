import React, { Fragment } from 'react';
import format from 'date-fns/format'
import NumberFormat from 'react-number-format';

const ReportePolizasPorVencer = ({data}) => {
    var group1Count = 0;
    var group2Count = 0;
    return data && data.length > 0 ?
        data.map((item,index) => {
            if( item.tipoRegistro === 1 ) {
                group1Count++;
                group2Count = 0;
                return (
                    <Fragment key={`report_row_${index}`}>
                        <br/>
                        <div style={{ marginTop: group1Count === 1 ? "0px" : "20px" }}></div>
                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                            <tbody>
                                <tr>
                                    <td className="rpt-group-1-title" width="110" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Aseguradora: {item.aseguradora}</b> </td>
                                </tr>
                            </tbody>
                        </table>
                    </Fragment>
                );
            }

            if( item.tipoRegistro === 2 ) {
                group2Count++;
                return (
                    <Fragment key={`report_row_${index}`}>
                        <div style={{ marginTop: group2Count === 1 ? "4px" : "20px" }}></div>
                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0.4rem" }}>
                            <tbody>
                                <tr>
                                    <td width="110" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Tipo Póliza</b> </td>
                                    <td style={{ border: "none", padding: "0px 8px" }}>{item.tipoPoliza}</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="footable table table-stripped footable-loaded default" style={{ marginBottom: "0" }}>
                            <thead>
                                <tr>
                                    <th className={"table-header-group"} width="150" >Número Póliza<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="100">Usuario<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="520">Nombre<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="120">Vencimiento<span className="footable-sort-indicator"></span></th>
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
                                <td className={"table-row"} width="150">{item.numeroPoliza}</td>
                                <td className={"table-row"} width="100">{item.usuario}</td>
                                <td className={"table-row"} width="520">{item.nombreUsuario}</td>
                                <td className={"table-row"} width="120">{format(new Date(item.fechaFin), 'dd/MM/yyyy')}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            }

            if( item.tipoRegistro === 4 ) {
                return (
                    <Fragment key={`report_row_${index}`}>
                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                            <tbody>
                                <tr>
                                    <td width="770" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Total Tipo Póliza</b> &nbsp; {item.tipoPoliza}</td>
                                    <td width="120" align="left" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.totalizador} displayType={'text'} thousandSeparator={false} suffix={" uds"} />}</b></td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ marginTop: "4px" }}></div>
                    </Fragment>
                );
            }

            if( item.tipoRegistro === 5 ) {
                return (
                    <table key={`report_row_${index}`} className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                        <tbody>
                            <tr>
                                <td width="770" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Total Aseguradora</b> &nbsp; {item.aseguradora}</td>
                                <td width="120" align="left" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.totalizador} displayType={'text'} thousandSeparator={false} suffix={" uds"} />}</b></td>
                            </tr>
                        </tbody>
                    </table>
                );
            }

            if( item.tipoRegistro === 6 ) {
                return (
                    <Fragment key={`report_row_${index}`}>
                        <div style={{ marginTop: "4px" }}></div>
                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                            <tbody>
                                <tr>
                                    <td width="770" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Total General</b></td>
                                    <td width="120" align="left" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.totalizador} displayType={'text'} thousandSeparator={false} suffix={" uds"} />}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </Fragment>
                );
            }
        }
    ) : null
}

export default ReportePolizasPorVencer;