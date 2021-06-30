import React from 'react'


const TableClients = ({polizasCliente}) => {

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
                    polizasCliente.map((p, i) => <tr key={'misClientes'+i.toString()}>
                        <td>1</td>
                        <td>{p.tipoPoliza}</td>
                        <td>{p.aseguradora}</td>
                        <td>{p.estadoPoliza}</td>
                    </tr>)
                }
            </tbody>
        </table>
    </>
    
    }
        </>
        
    );
}

export default React.memo(TableClients);