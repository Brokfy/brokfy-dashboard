import React, { useState } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import { useDashboardConsultaPoliza } from '../../redux/dashboardConsultaPoliza';
import PolizaDrawer from '../polizas/polizaDrawer';
import { Link, InputBase, Grid, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import format from 'date-fns/format';
import MuiAlert from '@material-ui/lab/Alert';


const ConsultaPoliza = () => {

    const [poliza, setPoliza] = useState("");
    const { auth } = useGetToken();
    const { consultaPoliza, dashboardConsultaPoliza, dashboardConsultaPolizaPending } = useDashboardConsultaPoliza();
    const [busco, setBusco] = useState(false);

    const [open, setOpen] = useState(false);

    const buscarPoliza = (e) => {
        e.preventDefault();
        dashboardConsultaPoliza({ tokenFirebase: auth.tokenFirebase, noPoliza: poliza });
    }

    const buscarPolizaNo = () => {
        setBusco(true);
        dashboardConsultaPoliza({ tokenFirebase: auth.tokenFirebase, noPoliza: poliza });
    }

    const NoHayRegistros = () => {
        return (
            <div className="ibox-content ibox-heading"  style={{ textAlign: "center" }}>
                <h3>No se encontró la póliza indicada</h3>
            </div>
        );
    }


    return (
        <div className="panel panel-default">
            <div className="panel-body panel-body-alt-2">
                <span className="titulo-panel">Consulta por Póliza</span>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <InputBase
                            className="rbt-input"
                            placeholder="Buscar póliza"
                            inputProps={{ 'aria-label': 'Buscar póliza' }}
                            onChange={(e) => setPoliza(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" ? buscarPoliza(e) : null}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button onClick={() => buscarPolizaNo()} color="primary" disabled={poliza === ""}>
                            <SearchIcon />
                        </Button>
                    </Grid>
                </Grid>

                <div className="dashboard-panel">
                    {busco ? null :
                        <MuiAlert className="alert-pad" elevation={6} variant="filled" severity="info" >Escriba el número de póliza y presione Enter</MuiAlert>}
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
                </div>
            </div>

        </div>
    );
}

export default ConsultaPoliza;