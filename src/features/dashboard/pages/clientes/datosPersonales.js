import React from 'react';

const DatosPersonales = () => {
    return (
        <div className="panel panel-default" style={{ marginBottom: "0px" }}>
            <div className="panel-heading">
                Datos Personales
        </div>
            <div className="panel-body">
                <table className="table table-hover" style={{ marginBottom: "0px" }}>
                    <tbody>
                        <tr><td width="30%">Nombre</td><td width="70%">nombre</td></tr>
                        <tr><td width="30%">Apellido Paterno</td><td width="70%">apellidoPaterno</td></tr>
                        <tr><td width="30%">Apellido Materno</td><td width="70%">apellidoMaterno</td></tr>
                        <tr><td width="30%">Fecha Nacimiento</td><td width="70%">fechaNacimiento</td></tr>
                        <tr><td width="30%">Sexo</td><td width="70%">sexo</td></tr>
                        <tr><td width="30%">Email</td><td width="70%">email</td></tr>
                        <tr><td width="30%">Username</td><td width="70%">username</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DatosPersonales;