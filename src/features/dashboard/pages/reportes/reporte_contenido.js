import React from 'react';
import format from 'date-fns/format'
import NumberFormat from 'react-number-format';

const ReporteContenido = ({data}) => {
    return (
        <div className="ibox-content m-b-sm border-bottom">
            <div className="p-xs">
                {  
                    data && data.length > 0 ?
                        data.map((item,index) => {
                            // <tr key={`report_row_${index}`} className="gradeX footable-even" >
                            //     <td className="footable-visible footable-first-column"><span className="footable-toggle"></span>Trident</td>
                            //     <td className="footable-visible">Internet
                            //         Explorer 4.0
                            //     </td>
                            //     <td className="footable-visible">Win 95+</td>
                            //     <td className="center footable-visible">4</td>
                            //     <td className="center footable-visible footable-last-column">X</td>
                            // </tr>

                            if( item.tipoRegistro === 1 ) {
                                return (
                                    <>
                                        <br/>
                                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                                            <tbody>
                                                <tr>
                                                    <td width="110" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Aseguradora</b> </td>
                                                    <td style={{ border: "none", padding: "0px 8px" }}>{item.aseguradora}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </>
                                );
                            }

                            if( item.tipoRegistro === 2 ) {
                                return (
                                    <>
                                        <div style={{ marginTop: "4px" }}></div>
                                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0.4rem" }}>
                                            <tbody>
                                                <tr>
                                                    <td width="110" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Tipo Póliza</b> </td>
                                                    <td style={{ border: "none", padding: "0px 8px" }}>{item.tipoPoliza}</td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        <table class="footable table table-stripped footable-loaded default" style={{ marginBottom: "0" }}>
                                            <thead>
                                                <tr>
                                                    <th className={"table-header-group"} width="150" >Número Póliza<span className="footable-sort-indicator"></span></th>
                                                    <th className={"table-header-group"} width="100">Usuario<span className="footable-sort-indicator"></span></th>
                                                    <th className={"table-header-group"} width="220">Nombre<span className="footable-sort-indicator"></span></th>
                                                    <th className={"table-header-group"} width="100">Fecha Inicio<span className="footable-sort-indicator"></span></th>
                                                    <th className={"table-header-group"} style={{ textAlign: "right" }} width="100">Prima Neta<span className="footable-sort-indicator"></span></th>
                                                    <th className={"table-header-group"} style={{ textAlign: "right" }} width="100">Prima Total<span className="footable-sort-indicator"></span></th>
                                                </tr>
                                            </thead>
                                        </table>
                                    </>
                                );
                            }

                            if( item.tipoRegistro === 3 ) {
                                return (
                                    <table className="footable table table-stripped footable-loaded default" style={{ marginBottom: "0" }}>
                                        <tbody>
                                            <tr>
                                                <td className={"table-row"} width="150">{item.numeroPoliza}</td>
                                                <td className={"table-row"} width="100">{item.usuario}</td>
                                                <td className={"table-row"} width="220">{item.nombreUsuario}</td>
                                                <td className={"table-row"} width="100">{format(new Date(item.fechaInicio), 'dd/MM/yyyy')}</td>
                                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.primaNeta} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                                                <td className={"table-row"} width="100" align="right">{<NumberFormat value={item.primaTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                );
                            }

                            if( item.tipoRegistro === 4 ) {
                                return (
                                    <>
                                        <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                                            <tbody>
                                                <tr>
                                                    <td width="570" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Total Tipo Póliza</b> &nbsp; {item.tipoPoliza}</td>
                                                    <td width="100" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.primaNeta} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</b></td>
                                                    <td width="100" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.primaTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</b></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div style={{ marginTop: "4px" }}></div>
                                    </>
                                );
                            }

                            if( item.tipoRegistro === 5 ) {
                                return (
                                    <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse", marginBottom: "0" }}>
                                        <tbody>
                                            <tr>
                                                <td width="570" align="left" style={{ border: "none", padding: "2px 8px" }}><b>Total Aseguradora</b> &nbsp; {item.aseguradora}</td>
                                                <td width="100" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.primaNeta} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</b></td>
                                                <td width="100" align="right" style={{ border: "none", padding: "2px 8px" }}><b>{<NumberFormat value={item.primaTotal} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</b></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                );
                            }

                            // return (
                            //     <tr key={`report_row_${index}`}>
                            //         <td style={{ border: "none" }}>Trident</td>
                            //         <td style={{ border: "none" }}>Internet Explorer 4</td>
                            //         <td style={{ border: "none" }}>Win</td>
                            //         <td style={{ border: "none" }}>4</td>
                            //         <td style={{ border: "none" }}>x</td>
                            //     </tr>
                            // );
                        }) : null
                }
                {/* <table className="footable table table-stripped footable-loaded default" style={{ borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th className="footable-visible footable-first-column footable-sortable">Rendering engine<span className="footable-sort-indicator"></span></th>
                            <th className="footable-visible footable-sortable">Browser<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-sortable">Platform(s)<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-sortable">Engine version<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-last-column footable-sortable">CSS grade<span className="footable-sort-indicator"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th colSpan={5}>
                                Aseguradora: MAPFRE<br/>
                                TipoPoliza: PRUEBA
                            </th>
                        </tr>
                        <tr>
                            <th className="footable-visible footable-first-column footable-sortable">Rendering engine<span className="footable-sort-indicator"></span></th>
                            <th className="footable-visible footable-sortable">Browser<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-sortable">Platform(s)<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-sortable">Engine version<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-last-column footable-sortable">CSS grade<span className="footable-sort-indicator"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                    </tbody>

                    <thead>
                        <br/>
                        <tr>
                            <th className="footable-visible footable-first-column footable-sortable">Rendering engine<span className="footable-sort-indicator"></span></th>
                            <th className="footable-visible footable-sortable">Browser<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-sortable">Platform(s)<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-sortable">Engine version<span className="footable-sort-indicator"></span></th>
                            <th data-hide="phone,tablet" className="footable-visible footable-last-column footable-sortable">CSS grade<span className="footable-sort-indicator"></span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                        <tr>
                            <td style={{ border: "none" }}>Trident</td>
                            <td style={{ border: "none" }}>Internet Explorer 4</td>
                            <td style={{ border: "none" }}>Win</td>
                            <td style={{ border: "none" }}>4</td>
                            <td style={{ border: "none" }}>x</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </div>
    );
}

export default ReporteContenido;