import React, { Fragment } from 'react';
import format from 'date-fns/format'
import NumberFormat from 'react-number-format';

const ReportePolizasBrokfyVsOtras = ({data}) => {
    var group1Count = 0;
    var group2Count = 0;
    return data && data.length > 0 ?
        data.map((item,index) => {
            group1Count++;
            group2Count = 0;
            if( item.tipoRegistro === 1 ) {
                return (
                    <Fragment key={`report_row_${index}`}>
                        <br/>
                        <div style={{ marginTop: group1Count === 1 ? "0px" : "20px" }}></div>
                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0.4rem" }}>
                            <tbody>
                                <tr>
                                    <td className="rpt-group-1-title" width="110" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Aseguradora: {item.aseguradora}</b> </td>
                                </tr>
                            </tbody>
                        </table>

                        <table className="footable table table-stripped footable-loaded default" style={{ marginBottom: "0" }}>
                            <thead>
                                <tr>
                                    <th className={"table-header-group"} width="200" >Tipo Póliza<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="200" style={{ textAlign: "right" }}>Prima Total<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="200" style={{ textAlign: "right" }}>Comisiones Generadas<span className="footable-sort-indicator"></span></th>
                                    <th className={"table-header-group"} width="200" style={{ textAlign: "right" }}>Cantidad Pólizas<span className="footable-sort-indicator"></span></th>
                                </tr>
                            </thead>
                        </table>
                    </Fragment>
                );
            }

            if( item.tipoRegistro === 3 ) {
                group2Count++;
                return (
                    <table key={`report_row_${index}`} className="footable table table-stripped footable-loaded default" style={{ marginBottom: "0" }}>
                        <tbody>
                            <tr>
                                <td className={"table-row"} width="200">{item.tipoPoliza}</td>
                                <td className={"table-row"} width="200" align="right">{<NumberFormat value={item.primaTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                                <td className={"table-row"} width="200" align="right">{<NumberFormat value={item.comisionesGeneradas.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                                <td className={"table-row"} width="200" align="right">{<NumberFormat value={item.totalizador} displayType={'text'} thousandSeparator={true} suffix={' uds'} />}</td>
                            </tr>
                        </tbody>
                    </table>
                );
            }

            if( item.tipoRegistro === 5 ) {
                return (
                    <table key={`report_row_${index}`} className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                        <tbody>
                            <tr>
                                <td width="200" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Total Aseguradora</b> &nbsp; {item.aseguradora}</td>
                                <td width="200" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.primaTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={"$"} />}</b></td>
                                <td width="200" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.comisionesGeneradas.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={"$"} />}</b></td>
                                <td width="200" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.totalizador} displayType={'text'} thousandSeparator={false} suffix={" uds"} />}</b></td>
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
                                    <td width="200" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Total General</b></td>
                                    <td width="200" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.primaTotal.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={"$"} />}</b></td>
                                    <td width="200" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.comisionesGeneradas.toFixed(2)} displayType={'text'} thousandSeparator={true} prefix={"$"} />}</b></td>
                                    <td width="200" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.totalizador} displayType={'text'} thousandSeparator={false} suffix={" uds"} />}</b></td>
                                </tr>
                            </tbody>
                        </table>
                    </Fragment>
                );
            }
        }
    ) : null
}

export default ReportePolizasBrokfyVsOtras;