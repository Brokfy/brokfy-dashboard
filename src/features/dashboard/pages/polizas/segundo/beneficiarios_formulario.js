import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetToken } from '../../../../../features/common/redux/hooks';
import Grid from '@material-ui/core/Grid';
import { TextField, Select, MenuItem } from '@material-ui/core'
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { useFetchDropdownOcupaciones } from '../../../redux/fetchDropdownOcupaciones';
import { useAgregarBeneficiario } from '../../../redux/agregarBeneficiario';
import { useEliminarBeneficiario } from '../../../redux/eliminarBeneficiario';
import { useFetchDropdownParentesco } from '../../../redux/fetchDropdownParentesco';

const BeneficiariosFormulario = (props) => {
    const { auth } = useGetToken();
    const [loading, setLoading] = useState(true);
    const [datosCargados, setDatosCargados] = useState({
        ocupaciones: false,
    });
    const { dropdownOcupaciones, fetchDropdownOcupaciones, fetchDropdownOcupacionesPending } = useFetchDropdownOcupaciones();
    const { dropdownParentesco, fetchDropdownParentesco, fetchDropdownParentescoPending } = useFetchDropdownParentesco();
    const beneficiarios = useSelector(state => state.dashboard.beneficiarios);
    const porcentajeTotal = useSelector(state => state.dashboard.beneficiariosPctAsignado);
    const { agregarBeneficiario } = useAgregarBeneficiario();
    const { eliminarBeneficiario } = useEliminarBeneficiario();
    const [ listadoValidaciones, setListadoValidaciones ] = useState([]);
    const [ datosFormulario, setDatosFormulario ] = useState();

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: theme.spacing(120),
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4),
        },
        headerCell: {
            background: "#e3e7ee !important",
            verticalAlign: "middle !important",
        },
        bodyCell: {
            background: "white !important",
            verticalAlign: "middle !important",
        },
        botonAgregar: {
            "&:hover": {
                background: "#e5ebf4",
            }
        },
        botonEliminar: {
            "&:hover": {
                background: "#fce7e7",
            }
        },
        registro: {
            "&:hover": {
                background: "#e3e7ee",
            }
        },
        selectIcon: {
            display: "none",
        },
    }));

    const classes = useStyles();

    useEffect(() => {
        if ( !auth.tokenFirebase || auth.tokenFirebase === "" ) return;
        if ( fetchDropdownOcupacionesPending || fetchDropdownParentescoPending ) return;
        
        if ( !datosCargados.ocupaciones && !(dropdownOcupaciones && dropdownOcupaciones.length > 0) ) {
            fetchDropdownOcupaciones(auth.tokenFirebase);
            setDatosCargados({
                ...datosCargados,
                ocupaciones: true,
            });
            return;
        }

        if( dropdownParentesco.length === 0 ) {
            fetchDropdownParentesco(auth.tokenFirebase);
            return;
        }

        setLoading(false);
    }, [auth.tokenFirebase, fetchDropdownOcupaciones, fetchDropdownOcupacionesPending, datosCargados, dropdownOcupaciones, fetchDropdownParentesco, fetchDropdownParentescoPending, dropdownParentesco.length]);

    const columnasGrillaBeneficiarios = [
        { name: "nombre", label: "Nombre", },
        { name: "segundoNombre", label: "Segundo Nombre", },
        { name: "apellidoPaterno", label: "Apellido Paterno", },
        { name: "apellidoMaterno", label: "Apellido Materno", },
        { name: "curp", label: "CURP", },
        { name: "idParentesco", label: "Parentesco", },
        { name: "pctAsignado", label: "  %  ", },
        { name: "acciones", label: "", },
    ];

    const GrillaBeneficiariosCabecera = () => {
        return (
            <thead>
                <tr>
                    { 
                        columnasGrillaBeneficiarios.map((item, i) => {
                            if ( item.name === "pctAsignado" ) {
                                return <th key={`col_beneficiario_${i.toString()}`} className={classes.headerCell} style={{ minWidth: "80px" }}>{item.label}</th>;
                            } else if ( item.name === "idParentesco" ) {
                                return <th key={`col_beneficiario_${i.toString()}`} className={classes.headerCell} style={{ minWidth: "120px" }}>{item.label}</th>;
                            } else {
                                return <th key={`col_beneficiario_${i.toString()}`} className={classes.headerCell}>{item.label}</th>;
                            }
                        }) 
                    }
                </tr>
            </thead>
        );
    }

    //Función para validar una CURP
    const curpValida = (curp) => {
        var re = /^[a-zA-Z]{4}((\d{2}((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|(0[13456789]|1[012])(0[1-9]|[12]\d|30)|02(0[1-9]|1\d|2[0-8])))|([02468][048]|[13579][26])0229)(H|M)(AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|SM|NE)([a-zA-Z]{3})([a-zA-Z0-9\s]{1})\d{1}$/;
        // validado = curp.match(re);
        
        // if (!validado)  //Coincide con el formato general?
        //     return false;
        
        return re.test(curp);
    }

    // const eliminarBeneficiario = (item) => setBeneficiarios([...beneficiarios.filter(i => i.curp !== item.curp)]);
    const eliminarBeneficiarioDelListado = (item) => eliminarBeneficiario(item.curp);
        
    const agregarBeneficiarioAListado = () => {
        var parentesco = document.getElementById("idParentesco");
        var parentesco1 = parentesco && parentesco.textContent !== "" ? dropdownParentesco.filter(i => i.descripcion === parentesco.textContent)[0] : null;
        const parentescoValue = parentesco1 ? parentesco1.id : null;

        const datosNuevoBeneficiario = { 
            nombre: document.getElementById("nombre").value, 
            segundoNombre: document.getElementById("segundoNombre").value,
            apellidoPaterno: document.getElementById("apellidoPaterno").value,
            apellidoMaterno: document.getElementById("apellidoMaterno").value,
            curp: document.getElementById("curp").value,
            idParentesco: parentescoValue,
            pctAsignado: document.getElementById("pctAsignado").value,
        };

        let validaciones = [];

        if ( datosNuevoBeneficiario.nombre === "" ) {
            validaciones = [...validaciones, { campo: "nombre", mensaje: "El nombre es requerido" }];
        }

        if ( datosNuevoBeneficiario.apellidoPaterno === "" ) {
            validaciones = [...validaciones, { campo: "apellidoPaterno", mensaje: "El apellido paterno es requerido" }];
        }

        if ( datosNuevoBeneficiario.curp === "" ) {
            validaciones = [...validaciones, { campo: "curp", mensaje: "La clave única de registro de poblcación (CURP) es requerida." }];
        }

        if ( datosNuevoBeneficiario.curp !== "" && !curpValida(datosNuevoBeneficiario.curp) ) {
            validaciones = [...validaciones, { campo: "curp", mensaje: "La clave única de registro de poblcación (CURP) es corresponde a un código válido." }];
        }

        if ( parentescoValue === null ) {
            validaciones = [...validaciones, { campo: "parentesco", mensaje: "El parentesco es requerido." }];
        }

        if ( datosNuevoBeneficiario.pctAsignado === "" ) {
            validaciones = [...validaciones, { campo: "porcentaje", mensaje: "El porcentaje es requerido." }];
        } else {
            if ( parseFloat(datosNuevoBeneficiario.pctAsignado) <= 0 ) {
                validaciones = [...validaciones, { campo: "porcentaje", mensaje: "El porcentaje debe ser mayor a cero (0)." }];
            }
    
            if ( parseFloat(datosNuevoBeneficiario.pctAsignado) > 100 ) {
                validaciones = [...validaciones, { campo: "porcentaje", mensaje: "El porcentaje debe ser menor o igual a cien (100)." }];
            }

            if ( (porcentajeTotal + parseFloat(datosNuevoBeneficiario.pctAsignado)) > 100 ) {
                validaciones = [...validaciones, { campo: "porcentajeTotal", mensaje: "El porcentaje ingresado hace que se exceda el 100% del porcentaje total." }];
            }
        }

        if( validaciones.length === 0 ){
            agregarBeneficiario(datosNuevoBeneficiario);
        } else {
            setDatosFormulario(datosNuevoBeneficiario);
            setListadoValidaciones(validaciones);
        }
    };

    const RegistroBeneficiario = () => {
        if( beneficiarios.length === 0 ) {
            return (
                <tr>
                    <td className={classes.bodyCell} style={{ alignItems: "center" }} colSpan={ columnasGrillaBeneficiarios.length }>
                        <span>No se han agregado beneficiarios</span>
                    </td>
                </tr>
            );
        }
        return beneficiarios.map((item, i) => (  
            <tr key={`registro_beneficiario_${i.toString()}`}>
                {   Object.keys(item).map(element => {
                        if( element === "idParentesco" ) {
                            return <td className={classes.bodyCell}>{ dropdownParentesco.filter(i => i.id === parseInt(item[element]))[0].descripcion }</td>;
                        }
                        return <td className={classes.bodyCell}>{item[element]}</td>;
                    }) }
                <td className={classes.bodyCell}>
                    <button className={`btn btn-white btn-bitbucket btn-rounded btn-sm ${classes.botonEliminar}`} type="button" onClick={() => eliminarBeneficiarioDelListado(item)}  style={{ color: "red" }}><i className="fa fa-times"></i></button>
                </td>
            </tr>
        ));
    }

    const GrillaBeneficiariosAgregarNuevo = () => {
        return (
            <tfoot>
                <tr>
                    { 
                        columnasGrillaBeneficiarios.map(element => {
                            if( element.name === "acciones" ) return (<td className={classes.bodyCell}>
                                <button onClick={agregarBeneficiarioAListado} type="button" className={`btn btn-white btn-bitbucket btn-rounded btn-sm`}><i className="fa fa-check text-navy"></i></button>
                            </td>);

                            if( element.name === "idParentesco" ) return (
                                <td className={classes.bodyCell}>
                                    <Select
                                        variant="outlined"
                                        style={{ width: "100%", "&::-webkit-appearance": "none" }}
                                        labelId={element.name}
                                        id={element.name}
                                        name={element.name}
                                        defaultValue={ datosFormulario ? datosFormulario[element.name] : '' }
                                        inputProps={{
                                            classes: {
                                                icon: classes.selectIcon,
                                            },
                                        }}
                                    >
                                        {dropdownParentesco.map((x, i) => <MenuItem key={`mi_${i}_sexo`} value={x.id}>{x.descripcion}</MenuItem>)}
                                    </Select>
                                </td>
                            )

                            return (
                                <td className={classes.bodyCell}>
                                    <TextField
                                        type={ element.name === "pctAsignado" ? "number" : "search" }
                                        variant="outlined"
                                        id={element.name}
                                        name={element.name}
                                        defaultValue={ datosFormulario ? datosFormulario[element.name] : '' }
                                        inputProps={{
                                            min: "0",
                                            max: "100",
                                            step: "1",
                                            autoComplete: 'off',
                                            pattern: (element.name === "curp" ? "([A-Z]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[0-9A-Z]\\d)" : "*"),
                                        }}
                                    />
                                </td>
                            );
                        }) 
                    }
                </tr>
                {
                    listadoValidaciones.length > 0 ? 
                    <tr style={{ textAlign: "start", color: "red", fontSize: "smaller", background: "white" }}>
                        <td colSpan="8">
                            <ul>
                                { listadoValidaciones.map((item, index) => <li key={`validaciones_${index.toString()}`}>{ item.mensaje }</li> ) }
                            </ul>
                        </td>
                    </tr> : null
                }
                
            </tfoot>
        );
    }

    const GrillaBeneficiarios = () => {
        return (
            <div className="table-responsive" style={{ marginTop: "1rem" }}>
                <table className="table table-bordered table-hover">
                    <GrillaBeneficiariosCabecera />
                    <tbody>
                        <RegistroBeneficiario />
                    </tbody>
                    { porcentajeTotal < 100 ? <GrillaBeneficiariosAgregarNuevo /> : null }
                </table>
            </div>
        );
    }

    return <div>

        <Grid container spacing={3}>
            <Grid item xs={12} style={{ borderBottomStyle: "inset" }}>
                <Typography variant="h6">Información de Beneficiarios</Typography>
            </Grid>

            <GrillaBeneficiarios />
        </Grid>

    </div>
}

export default BeneficiariosFormulario;