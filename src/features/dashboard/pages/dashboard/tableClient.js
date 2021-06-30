import React from 'react'

function TableClients({polizasCliente}) {
    //<Link className="detallePoliza" onClick={() => seleccionarPoliza(p.noPoliza)}>{p.noPoliza}</Link>
    return (
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
                      /*  polizasCliente.map((p, i) => <tr key={'misClientes'+i.toString()}>
                            <td>1</td>
                            <td>{p.tipoPoliza}</td>
                            <td>{p.aseguradora}</td>
                            <td>{p.estadoPoliza}</td>
                        </tr>);*/
                    }
                </tbody>
            </table>
        </>
    )
}

export default React.memo(TableClients);