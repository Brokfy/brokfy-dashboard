import React from 'react';

const PerfilAsegurado = () => {
    return (
        <div className="panel panel-default" style={{ marginBottom: "0px" }}>
            <div className="panel-heading">
                Perfil Asegurado
        </div>
            <div className="panel-body">
                <table className="table table-hover" style={{ marginBottom: "0px" }}>
                    <tbody>
                        <tr><td width="30%">Municipio</td><td width="70%">municipio</td></tr>
                        <tr><td width="30%">CodigoPostal</td><td width="70%">codigoPostal</td></tr>
                        <tr><td width="30%">Estado</td><td width="70%">estado</td></tr>
                        <tr><td width="30%">Hijos</td><td width="70%">hijos</td></tr>
                        <tr><td width="30%">Edad</td><td width="70%">edad</td></tr>
                        <tr><td width="30%">RegimenVivienda</td><td width="70%">regimenVivienda</td></tr>
                        <tr><td width="30%">SituacionLaboral</td><td width="70%">situacionLaboral</td></tr>
                        <tr><td width="30%">Hipoteca</td><td width="70%">hipoteca</td></tr>
                        <tr><td width="30%">Viaja</td><td width="70%">viaja</td></tr>
                        <tr><td width="30%">Mascotas</td><td width="70%">mascotas</td></tr>
                        <tr><td width="30%">EstadoCivil</td><td width="70%">estadoCivil</td></tr>
                        <tr><td width="30%">Profesion</td><td width="70%">idProfesion</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PerfilAsegurado;