import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormaPago, useAseguradora, useTipoPoliza, useProductos} from '../../hooks';
import Grid from '@material-ui/core/Grid';
import { getFormData, generarCuotas } from '../../../../common/utils';
import BStepper from '../../../../components/bstepper';
import BInput from '../../../../components/binput';
import SegundoFormulario from './segundo';
import { useInsertPolizasAuto } from '../../redux/insertPolizasAuto';
import { useGetToken } from '../../../common/redux/hooks';
import getColumnsAprobarFormulario from './aprobar_formulario_columnas';
import { useHistory } from 'react-router-dom';
import { useInsertPolizasMoto } from '../../redux/insertPolizasMoto';
import { useInsertPolizasVida } from '../../redux/insertPolizasVida';
import { Typography } from '@material-ui/core';
import BeneficiariosFormulario from './segundo/beneficiarios_formulario';
import { useResetBeneficiarios } from '../../redux/resetBeneficiarios';

const AprobarFormulario = ({ data, dropdownAseguradoras, dropdownTipoPoliza, dropdownProductos }) => {
  const [aseguradora, AseguradoraView, setAseguradora, listadoAseguradora, idAseguradora] = useAseguradora(dropdownAseguradoras, data.aseguradora);
  const [tipoPoliza, TipoPolizaView, setTipoPoliza, listadoTipoPoliza] = useTipoPoliza(dropdownTipoPoliza);
  const [productos, ProductosView, setProductos, listadoProductos, filtroProductosXidAseguradora] = useProductos(dropdownProductos, idAseguradora);
  const [formaPago, formaPagoView, setFormaPago, listadoFormaPago] = useFormaPago();
  const { auth } = useGetToken();
  const { insertPolizasAuto, insertPolizasAutoPending } = useInsertPolizasAuto();
  const { insertPolizasMoto, insertPolizasMotoPending } = useInsertPolizasMoto();
  const { insertPolizasVida, insertPolizasVidaPending } = useInsertPolizasVida();
  const [firstPage, setFirstPage] = useState(null);
  const [datos, setDatos] = useState(data);
  const [validacionFormulario, setValidacionFormulario] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [procesando, setProcesando] = useState(false);
  const [columns, setColumns] = useState([]);
  const history = useHistory();
  const porcentajeTotal = useSelector(state => state.dashboard.beneficiariosPctAsignado);
  const beneficiarios = useSelector(state => state.dashboard.beneficiarios);
  const { resetBeneficiarios } = useResetBeneficiarios();

  useEffect(() => {
    if ( tipoPoliza === null || tipoPoliza === "" ) {
      setTipoPoliza(datos.tipo);
    } else {
      if( datos.tipo !== tipoPoliza ) {
        setDatos({...datos, tipo: tipoPoliza});
      }
    }
  }, [tipoPoliza, datos, setTipoPoliza]);

  useEffect(() => {
    if( !auth.tokenFirebase ) return;

    setColumns(getColumnsAprobarFormulario(datos, dropdownTipoPoliza, dropdownAseguradoras, dropdownProductos, listadoFormaPago))
    filtroProductosXidAseguradora(idAseguradora);
    if( datos.producto && datos.producto ) {
      setDatos({...datos, producto: ''});
    }

  }, [dropdownTipoPoliza, dropdownAseguradoras, dropdownProductos, listadoFormaPago, auth, filtroProductosXidAseguradora, idAseguradora, firstPage, datos]);

  useEffect(() => {
    resetBeneficiarios({});
  }, [resetBeneficiarios]);

  useEffect(() => {
    if( !procesando && (insertPolizasAutoPending || insertPolizasMotoPending || insertPolizasVidaPending) ) {
      setProcesando(true);
      return;
    }

    if( procesando && !insertPolizasAutoPending && !insertPolizasMotoPending && !insertPolizasVidaPending ) {
      insertPolizasAuto({ dismiss: true });
      insertPolizasMoto({ dismiss: true });
      insertPolizasVida({ dismiss: true });
      history.push(`/polizas/todas/aprobaciones`);
      return;
    }

  }, [procesando, insertPolizasAutoPending, history, insertPolizasAuto, insertPolizasMotoPending, insertPolizasMoto, insertPolizasVidaPending, insertPolizasVida])


  const pasaValidacionMontos = (formData) => {
    const cuotas = generarCuotas( formData["formaPago"], formData["fechaInicio"], formData["fechaFin"] );
    var total = 0;
    cuotas.forEach((cuota, index) => {
      total += (index === 0 ? 
        parseFloat(formData["costoPrimerRecibo"].toString() !== "" ? formData["costoPrimerRecibo"].replace(/[\$,]/gi, '') : 0) :
        parseFloat(formData["costoRecibosSubsecuentes"].toString() !== "" ? formData["costoRecibosSubsecuentes"].replace(/[\$,]/gi, '') : 0))
    });
    const primaTotal = parseFloat(formData["costo"].toString() !== "" ? formData["costo"].replace(/[\$,]/gi, '') : 0);
    return Number((primaTotal - Number(total.toFixed(2)))/*.toFixed(1)*/) < 1;
  }


  const submitFormStep1 = (event) => {
    const formData = getFormData(event);
    const requiredFieldText = "El campo es requerido";
    const requiredGreaterThanZeroText = "El valor debe ser mayor a 0";
    const rangoFechaInvalido = "Seleccione un rango valido";
    const fechaFueraRango = "Fecha fuera de rango de vigencia";
    let validacion = {};
    let pasaValidacion = true;

    columns.forEach(element => {
      if( element.required && (element.options.display === null || element.options.display !== false )) {
        if( element.type === "currency" ) {
          if( parseFloat(formData[element.name].toString() !== "" ? formData[element.name].replace(/[\$,]/gi, '') : 0) === 0 ) {
            if( (formData["formaPago"] === "Anual" && !(element.name === "costoRecibosSubsecuentes" || element.name === "costoPrimerRecibo")) || formData["formaPago"] !== "Anual" ) {
              validacion = { ...validacion, [element.name]: requiredGreaterThanZeroText };
              pasaValidacion = false;
            }
          } else if( element.name === "costoRecibosSubsecuentes" && !pasaValidacionMontos(formData) ) {
            validacion = { ...validacion, [element.name]: "El valor ingresado no coincide con la prima total" }
            pasaValidacion = false;
          } else if ( element.name === "primaNeta" ) {
            if( parseFloat(formData[element.name].toString() !== "" ? formData[element.name].replace(/[\$,]/gi, '') : 0) > parseFloat(formData["costo"].toString() !== "" ? formData["costo"].replace(/[\$,]/gi, '') : 0) ) {
              validacion = { ...validacion, [element.name]: "Valor no puede ser mayor a la prima total" };
              pasaValidacion = false;
            }
          } else if ( element.name === "costoPrimerRecibo" ) {
            if( formData["formaPago"] === "Anual" ) {
              if( parseFloat(formData[element.name].toString() !== "" ? formData[element.name].replace(/[\$,]/gi, '') : 0) !== parseFloat(formData["costo"].toString() !== "" ? formData["costo"].replace(/[\$,]/gi, '') : 0) ) {
                validacion = { ...validacion, [element.name]: "Valor debe ser igual a la prima total" };
                pasaValidacion = false;
              }
            }
          }
        } else if( element.type === "long" ) {
          if( parseFloat(formData[element.name]) === 0 ) {
            validacion = { ...validacion, [element.name]: requiredGreaterThanZeroText };
            pasaValidacion = false;
          }
        } else {
          if( element.name === "fechaInicio" && `${formData[element.name]}` >= `${formData["fechaFin"]}` ) {
            validacion = { ...validacion, [element.name]: rangoFechaInvalido }
            pasaValidacion = false;
          } else if( element.name === "fechaFin" && `${formData[element.name]}` <= `${formData["fechaInicio"]}` ) {
            validacion = { ...validacion, [element.name]: rangoFechaInvalido }
            pasaValidacion = false;
          } else if( element.name === "proximoPago" && `${formData[element.name]}` < `${formData["fechaInicio"]}` && `${formData[element.name]}` > `${formData["fechaFin"]}` ) {
            validacion = { ...validacion, [element.name]: fechaFueraRango }
            pasaValidacion = false;
          } else {
            if( `${formData[element.name]}` === "" ) {
              validacion = { ...validacion, [element.name]: requiredFieldText }
              pasaValidacion = false;
            }
          }
        }
      }
    });

    setDatos({
      ...datos, 
      ...formData,
      costo: formData.costo.replace(/[\$,]/gi, ''),
      primaNeta: formData.primaNeta.replace(/[\$,]/gi, ''),
      costoPrimerRecibo: formData.costoPrimerRecibo.replace(/[\$,]/gi, ''),
      costoRecibosSubsecuentes: formData.costoRecibosSubsecuentes.replace(/[\$,]/gi, '')
    });
    if( pasaValidacion ) {
      setFirstPage({
        ...formData,
        costo: formData.costo.replace(/[\$,]/gi, ''),
        primaNeta: formData.primaNeta.replace(/[\$,]/gi, ''),
        costoPrimerRecibo: formData.costoPrimerRecibo.replace(/[\$,]/gi, ''),
        costoRecibosSubsecuentes: formData.costoRecibosSubsecuentes.replace(/[\$,]/gi, '')
      });
      setValidacionFormulario({});
    } else {
      setValidacionFormulario(validacion);
    }

    return pasaValidacion;
  }

  const submitFormStep2 = (event) => {
    const formData = getFormData(event);
    const requiredFieldText = "El campo es requerido";
    let validacion = {};
    let pasaValidacion = true;

    Object.keys(formData).forEach(element => {
      if( `${formData[element]}` === "" ) {
        validacion = { ...validacion, [element]: requiredFieldText }
        pasaValidacion = false;
      } else {
        if ( element === "codigoPostal" && !/^[0-9]{5}$/g.test(`${formData[element]}`) ) {
          pasaValidacion = false;
        }
      }
    });

    if( pasaValidacion ) {
      const reqData = {
        data: Object.assign({}, firstPage, getFormData(event)),
        token: auth.tokenFirebase
      };
      
      if( activeStep === getSteps().length - 1 ) {
        if( `${parseInt(datos.tipo)}` === "1" ) insertPolizasAuto(reqData); // AUTO
        if( `${parseInt(datos.tipo)}` === "2" ) insertPolizasMoto(reqData); // MOTO
        if( `${parseInt(datos.tipo)}` === "5" ) insertPolizasVida(reqData); // VIDA
      }

      setDatos({
        ...datos, 
        ...formData,
      });

    } else {
      setDatos({
        ...datos, 
        ...formData,
      });
      setValidacionFormulario(validacion);
    }

    return pasaValidacion;
  }

  const submitFormStep3 = (event) => {
    if( datos.tipo === "5" ) { // VIDA
      const reqData = {
        data: Object.assign({}, datos, { beneficiarios }),
        token: auth.tokenFirebase
      };

      insertPolizasVida(reqData);
    } 
    
  }

  const guardarFormulario = () => {
    const noAsegurado = document.querySelector("#noAsegurado").value;
    const username = document.querySelector("#username").value;
    const noPoliza = document.querySelector("#noPoliza").value;
    const formaPago = document.querySelector('input[name="formaPago"]').value;
    const costo = document.querySelector("#costo").value.replace('$', '');
    const primaNeta = document.querySelector("#primaNeta").value.replace('$', '');
    const costoPrimerRecibo = document.querySelector("#costoPrimerRecibo").value.replace('$', '');
    const costoRecibosSubsecuentes = document.querySelector("#costoRecibosSubsecuentes").value.replace('$', '');

    let bl_actualizar = false;
    let snapshot = { ...datos }

    if( noAsegurado !== datos.noAsegurado ) {
      snapshot = {
        ...snapshot,
        noAsegurado: noAsegurado !== snapshot.noAsegurado ? noAsegurado : snapshot.noAsegurado,
      };

      bl_actualizar = true;
    }

    if( username !== datos.username ) {
      snapshot = {
        ...snapshot,
        username: username !== snapshot.username ? username : snapshot.username,
      };

      bl_actualizar = true;
    }

    if( noPoliza !== datos.noPoliza ) {
      snapshot = {
        ...snapshot,
        noPoliza: noPoliza !== snapshot.noPoliza ? noPoliza : snapshot.noPoliza,
      };

      bl_actualizar = true;
    }

    if( formaPago !== datos.formaPago ) {
      snapshot = {
        ...snapshot,
        formaPago: formaPago !== snapshot.formaPago ? formaPago : snapshot.formaPago,
      };

      bl_actualizar = true;
    }

    if( costo !== datos.costo ) {
      snapshot = {
        ...snapshot,
        costo: costo !== snapshot.costo ? costo : snapshot.costo,
      };

      bl_actualizar = true;
    }

    if( primaNeta !== datos.primaNeta ) {
      snapshot = {
        ...snapshot,
        primaNeta: primaNeta !== snapshot.primaNeta ? primaNeta : snapshot.primaNeta,
      };

      bl_actualizar = true;
    }

    if( costoPrimerRecibo !== datos.costoPrimerRecibo ) {
      snapshot = {
        ...snapshot,
        costoPrimerRecibo: costoPrimerRecibo !== snapshot.costoPrimerRecibo ? costoPrimerRecibo : snapshot.costoPrimerRecibo,
      };

      bl_actualizar = true;
    }

    if( costoRecibosSubsecuentes !== datos.costoRecibosSubsecuentes ) {
      snapshot = {
        ...snapshot,
        costoRecibosSubsecuentes: costoRecibosSubsecuentes !== snapshot.costoRecibosSubsecuentes ? costoRecibosSubsecuentes : snapshot.costoRecibosSubsecuentes,
      };

      bl_actualizar = true;
    }

    if( bl_actualizar ) {
      setDatos(snapshot);
    }
  }

  const getSteps = () => {
    let steps = [
      {
        handleSubmit: submitFormStep1,
        canSubmit: true,
        renderView: !data ? "Loading" :
          <div>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ marginBottom: "1rem", borderBottomStyle: "inset", borderBottomWidth: "3px", borderBottomColor: "#e7e7ec" }}>
                <Typography variant="h6">Información General</Typography>
              </Grid>
              {!columns || columns.length <= 0 || data.length <= 0 ?
                null : columns.map((col, index) => {
                  return col.options.hasOwnProperty("display") && !col.options.display ? null :
                    <Grid key={`grid_${index}_${col.name}`} item xs={4} >
                      {
                        col.name === "tipo" ?
                        <TipoPolizaView error={validacionFormulario.hasOwnProperty(col.name)} {...col} errorMessage={validacionFormulario[col.name]} editValue={col.defaultValue === "" ? null : col.defaultValue} onChange={guardarFormulario} /> :
                        col.name === "aseguradora" ?
                        <AseguradoraView error={validacionFormulario.hasOwnProperty(col.name)} errorMessage={validacionFormulario[col.name]} onChange={guardarFormulario}/> :
                        col.name === "producto" ?
                        <ProductosView error={validacionFormulario.hasOwnProperty(col.name)} errorMessage={validacionFormulario[col.name]} onChange={guardarFormulario} /> :
                        <BInput key={`col_${index}_${col.name}`} {...col} editValue={col.defaultValue === "" ? null : col.defaultValue} error={validacionFormulario.hasOwnProperty(col.name)} errorMessage={validacionFormulario[col.name]} onChange={guardarFormulario}/>
                      }                          
                    </Grid>
                }
                )}
            </Grid>
          </div>
      },

      {
        handleSubmit: submitFormStep2,
        canSubmit: true,
        renderView: !data ? "Loading" :
          <SegundoFormulario tipo={parseInt(datos.tipo)} datos={datos} />
      }

    ];

    // TIPO: VIDA
    if( parseInt(datos.tipo) === 5 ) {
      steps = [ ...steps, {
        handleSubmit: submitFormStep3,
        canSubmit: porcentajeTotal === 100,
        renderView: !data ? "Loading" :
          <BeneficiariosFormulario />
      }]
    }

    return steps;
  }

  return (
    <div>
      {insertPolizasAutoPending !== true && insertPolizasMotoPending !== true && insertPolizasVidaPending !== true ?
        <BStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          labelAction="Aprobar"
          stepContent={[...getSteps()]}
        /> : <h3>Procesando....</h3> }
    </div>
  );
}

export default AprobarFormulario;