import React, {useState} from 'react'
import { Link} from '@material-ui/core';
import PolizaDrawer from '../polizas/polizaDrawer';
import format from 'date-fns/format';

const PolizasPorVencerTable = ({busco, polizasPorVencer }) => {
    const [poliza, setPoliza] = useState("");
    const [open, setOpen] = useState(false);

    const NoHayRegistros = () => {
        return (
            <div className="ibox-content ibox-heading" style={{ textAlign: "center" }}>
                <h3>No se encontraron pólizas por vencer</h3>
                <small style={{fontSize: "inherit"}}>
                    El período consultado es el comprendido entre el <b>{format(new Date(), 'dd/MM/yyyy')}</b> al <b>{format(new Date((new Date()).setDate((new Date().getDate()) + 7)), 'dd/MM/yyyy')}</b>.
                </small>
            </div>
        );
    }

    const seleccionarPoliza = (noPoliza) => {
        setPoliza(noPoliza);
        setOpen(true);
    }

    return (
        <>
           {!busco ? null :
                ( !polizasPorVencer || polizasPorVencer.length <= 0 ) ? <NoHayRegistros /> :
                <table className="table table-bordered" style={{marginBottom: 0}}>
                    <thead>
                        <tr>
                            <th>Póliza</th>
                            <th>Tipo</th>
                            <th>Aseguradora</th>
                            <th>Vencimiento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            polizasPorVencer.map((p, i) => <tr key={`polizasPorVencer_${i.toString()}`}>
                                <td><Link className="detallePoliza" onClick={() => seleccionarPoliza(p.noPoliza)}>{p.noPoliza}</Link></td>
                                <td>{p.tipoPoliza}</td>
                                <td>{p.aseguradora}</td>
                                <td>{format(new Date(p.fechaFin), 'dd/MM/yyyy')}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            }
            <PolizaDrawer polizaDraw={poliza} open={open} setOpen={setOpen} /> 
        </>
    )
}


export default React.memo(PolizasPorVencerTable);

