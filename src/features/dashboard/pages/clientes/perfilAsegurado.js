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
                        <tr><td width="30%">Código Postal</td><td width="70%">{codigoPostal}</td></tr>
                        <tr><td width="30%">Estado</td><td width="70%">{estado}</td></tr>
                        <tr><td width="30%">Hijos</td><td width="70%">{hijos}</td></tr>
                        <tr><td width="30%">Edad</td><td width="70%">{edad}</td></tr>
                        <tr><td width="30%">Régimen Vivienda</td><td width="70%">{regimenVivienda}</td></tr>
                        <tr><td width="30%">Situación Laboral</td><td width="70%">{situacionLaboral}</td></tr>
                        <tr><td width="30%">Hipoteca</td><td width="70%">{hipoteca ? "Si" : "No"}</td></tr>
                        <tr><td width="30%">Viaja</td><td width="70%">{viaja ? "Si" : "No"}</td></tr>
                        <tr><td width="30%">Mascotas</td><td width="70%">{mascotas ? "Si" : "No"}</td></tr>
                        <tr><td width="30%">Estado Civil</td><td width="70%">{estadoCivil}</td></tr>
                        <tr><td width="30%">Profesión</td><td width="70%">{profesion}</td></tr>
                    </tbody>
                </table>
                <br />
            </div>
        </div>
    );
}

export default PerfilAsegurado;