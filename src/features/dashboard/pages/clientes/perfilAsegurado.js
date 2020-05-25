import React from 'react';

const PerfilAsegurado = ({ idPerfil, municipio, codigoPostal, estado, hijos, edad, regimenVivienda, situacionLaboral, hipoteca, viaja, mascotas, estadoCivil, profesion }) => {
    return (
        <div className="panel panel-default" style={{ marginBottom: "0px" }}>
            <div className="panel-body">
                <span className="titulo-panel">Perfil Asegurado</span>
                <br /><br />
                <table className="table table-hover" style={{ marginBottom: "0px" }}>
                    <tbody>
                        <tr><td width="30%">Municipio</td><td width="70%">{municipio}</td></tr>
                        <tr><td width="30%">CodigoPostal</td><td width="70%">{codigoPostal}</td></tr>
                        <tr><td width="30%">Estado</td><td width="70%">{estado}</td></tr>
                        <tr><td width="30%">Hijos</td><td width="70%">{hijos}</td></tr>
                        <tr><td width="30%">Edad</td><td width="70%">{edad}</td></tr>
                        <tr><td width="30%">RegimenVivienda</td><td width="70%">{regimenVivienda}</td></tr>
                        <tr><td width="30%">SituacionLaboral</td><td width="70%">{situacionLaboral}</td></tr>
                        <tr><td width="30%">Hipoteca</td><td width="70%">{hipoteca ? "Si" : "No"}</td></tr>
                        <tr><td width="30%">Viaja</td><td width="70%">{viaja ? "Si" : "No"}</td></tr>
                        <tr><td width="30%">Mascotas</td><td width="70%">{mascotas ? "Si" : "No"}</td></tr>
                        <tr><td width="30%">EstadoCivil</td><td width="70%">{estadoCivil}</td></tr>
                        <tr><td width="30%">Profesion</td><td width="70%">{profesion}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PerfilAsegurado;