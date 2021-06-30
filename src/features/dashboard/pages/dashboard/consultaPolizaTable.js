import React, {memo, useState} from 'react'
import PolizaDrawer from '../polizas/polizaDrawer';
import {  Link, } from '@material-ui/core';
import format from 'date-fns/format';

const ConsultaPolizaTable = ({busco, consultaPoliza, poliza}) => {

    const [open, setOpen] = useState(false);

    const NoHayRegistros = () => {
        return (
            <div className="ibox-content ibox-heading"  style={{ textAlign: "center" }}>
                <h3>No se encontró la póliza indicada</h3>
            </div>
        );
    }


    return (
        <>
           {!busco ? null :
                        ( !consultaPoliza ) ? <NoHayRegistros /> :
                        <div>
                            <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                <tr>
                                    <th>Cliente</th>
                                    <td>{consultaPoliza.cliente}</td>
                                </tr>
                                <tr>
                                    <th>Póliza</th>
                                    <td><Link className="detallePoliza" onClick={() => setOpen(true)}>{consultaPoliza.noPoliza}</Link></td>
                                </tr>
                                <tr>
                                    <th>Tipo</th>
                                    <td>{consultaPoliza.tipoPoliza}</td>
                                </tr>
                                <tr>
                                    <th>Estado</th>
                                    <td>{consultaPoliza.estadoPoliza}</td>
                                </tr>
                                <tr>
                                    <th>Brokfy</th>
                                    <td>{consultaPoliza.polizaPropia === "Si" ? "Si" : "No"}</td>
                                </tr>
                                <tr>
                                    <th>Periodo</th>
                                    <td>{`${format(new Date(consultaPoliza.fechaInicio), 'dd/MM/yyyy')} - ${format(new Date(consultaPoliza.fechaFin), 'dd/MM/yyyy')}`}</td>
                                </tr>
                                <tr>
                                    <th>Aseguradora</th>
                                    <td>{consultaPoliza.aseguradora}</td>
                                </tr>
                            </table>

                            {/* <table className="table table-hover" style={{ marginBottom: "0px" }}>
                                <tr>
                                    <th>Póliza</th>
                                    <td><Link className="detallePoliza" onClick={() => setOpen(true)}>{consultaPoliza.noPoliza}</Link></td>
                                    <th>Brokfy</th>
                                    <td>{consultaPoliza.polizaPropia === "Si" ? "Si" : "No"}</td>
                                </tr>
                                <tr>
                                    <th>Periodo</th>
                                    <td>{`${format(new Date(consultaPoliza.fechaInicio), 'dd/MM/yyyy')} - ${format(new Date(consultaPoliza.fechaFin), 'dd/MM/yyyy')}`}</td>
                                    <th>Tipo</th>
                                    <td>{consultaPoliza.tipoPoliza}</td>
                                </tr>
                                <tr>
                                    <th>Cliente</th>
                                    <td>{consultaPoliza.cliente}</td>
                                    <th>Estado</th>
                                    <td>{consultaPoliza.estadoPoliza}</td>
                                </tr>
                                <tr>
                                    <th>Aseguradora</th>
                                    <td>{consultaPoliza.aseguradora}</td>
                                    <th></th>
                                    <td></td>
                                </tr>
                            </table> */}
                            <PolizaDrawer polizaDraw={poliza} open={open} setOpen={setOpen} />
                        </div>

                    } 
        </>
    )
}


export default React.memo(ConsultaPolizaTable);

