import React, {useState} from 'react'
import { Link } from '@material-ui/core';
import PolizaDrawer from '../polizas/polizaDrawer';

const TableClients = ({polizasCliente}) => {

    const [open, setOpen] = useState(false);
    const [poliza, setPoliza] = useState("");

    const seleccionarPoliza = (noPoliza) => {
        setPoliza(noPoliza);
        setOpen(true);
    }

    const NoHayRegistros = () => {
        return (
            <div className="ibox-content ibox-heading" style={{ textAlign: "center" }}>
                <h3>No se encontraron pólizas para el cliente seleccionado</h3>
            </div>
        );
    }
    //<Link className="detallePoliza" onClick={() => seleccionarPoliza(p.noPoliza)}>{p.noPoliza}</Link>
    return (
        <>
        { ( !polizasCliente || polizasCliente.length <= 0 ) ? <NoHayRegistros /> : 
        
        
        <>
        <table className="table table-bordered" style={{marginBottom: 0}}>
            <thead>
                <tr>
                    <th>Póliza</th>
                    <th>Tipo</th>
                    <th>Aseguradora</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {
                polizasCliente.map((p, i) => <tr key={`misClientes_${i.toString()}`}>
                <td><Link className="detallePoliza" onClick={() => seleccionarPoliza(p.noPoliza)}>{p.noPoliza}</Link></td>
                <td>{p.tipoPoliza}</td>
                <td>{p.aseguradora}</td>
                <td>{p.estadoPoliza}</td>
                </tr>)
                }
            </tbody>
        </table>
        </>
    
        }
        <PolizaDrawer polizaDraw={poliza} open={open} setOpen={setOpen} />
        </>
        
    );
}

export default React.memo(TableClients);