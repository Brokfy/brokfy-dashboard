import React, { useState, useEffect } from 'react';
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

const AprobarFormulario = ({ data, dropdownAseguradoras, dropdownTipoPoliza, dropdownProductos }) => {
  const [aseguradora, AseguradoraView, setAseguradora, listadoAseguradora, idAseguradora] = useAseguradora(dropdownAseguradoras, data.aseguradora);
  const [tipoPoliza, TipoPolizaView, setTipoPoliza, listadoTipoPoliza] = useTipoPoliza(dropdownTipoPoliza);
  const [productos, ProductosView, setProductos, listadoProductos, filtroProductosXidAseguradora] = useProductos(dropdownProductos, idAseguradora);
  const [formaPago, formaPagoView, setFormaPago, listadoFormaPago] = useFormaPago();
  const { auth } = useGetToken();
  const { insertPolizasAuto, insertPolizasAutoPending } = useInsertPolizasAuto();
  const [firstPage, setFirstPage] = useState(null);
  const [datos, setDatos] = useState(data);
  const [validacionFormulario, setValidacionFormulario] = useState({});
  const [activeStep, setActiveStep] = useState(0);
  const [procesando, setProcesando] = useState(false);
  const [columns, setColumns] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if( !auth.tokenFirebase ) return;

    setColumns(getColumnsAprobarFormulario(datos, dropdownTipoPoliza, dropdownAseguradoras, dropdownProductos, listadoFormaPago))
    filtroProductosXidAseguradora(idAseguradora);

  }, [dropdownTipoPoliza, dropdownAseguradoras, dropdownProductos, listadoFormaPago, auth, filtroProductosXidAseguradora, idAseguradora, firstPage, datos]);

  useEffect(() => {
    if( !procesando && insertPolizasAutoPending ) {
      setProcesando(true);
      return;
    }

    if( procesando && !insertPolizasAutoPending ) {
      insertPolizasAuto({ dismiss: true });
      history.push(`/polizas/todas/aprobaciones`);
      return;
    }

  }, [procesando, insertPolizasAutoPending, history, insertPolizasAuto])


  const pasaValidacionMontos = (formData) => {
    const cuotas = generarCuotas( formData["formaPago"], formData["fechaInicio"], formData["fechaFin"] );
    var total = 0;
    cuotas.forEach((cuota, index) => {
      total += (index === 0 ? 
        parseFloat(formData["costoPrimerRecibo"].toString() !== "" ? formData["costoPrimerRecibo"].replace(/[\$,]/gi, '') : 0) :
        parseFloat(formData["costoRecibosSubsecuentes"].toString() !== "" ? formData["costoRecibosSubsecuentes"].replace(/[\$,]/gi, '') : 0))
    });
    const primaTotal = parseFloat(formData["costo"].toString() !== "" ? formData["costo"].replace(/[\$,]/gi, '') : 0);
    return total === primaTotal;
  }


  const submitFormStep1 = (event) => {
    const formData = getFormData(event);
    const requiredFieldText = "El campo es requerido";
    const requiredGreaterThanZeroText = "El valor debe ser mayor a 0";
    const rangoFechaInvalido = "Seleccione un rango valido";
    const fechaFueraRango = "Fecha fuera de rango de vigencia";
    let validacion = {};
    let pasaValidacion = true;

    console.log(formData);

    columns.forEach(element => {
      if( element.required && (element.options.display === null || element.options.display !== false )) {
        if( element.type === "currency" ) {
          if( parseFloat(formData[element.name].toString() !== "" ? formData[element.name].replace(/[\$,]/gi, '') : 0) === 0 ) {
            validacion = { ...validacion, [element.name]: requiredGreaterThanZeroText }
            pasaValidacion = false;
          } else if( element.name === "costoRecibosSubsecuentes" && !pasaValidacionMontos(formData) ) {
            validacion = { ...validacion, [element.name]: "El valor ingresado no coincide con la prima total" }
            pasaValidacion = false;
          } 
        } else if( element.type === "long" ) {
          if( parseFloat(formData[element.name]) === 0 ) {
            validacion = { ...validacion, [element.name]: requiredGreaterThanZeroText }
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
      }
    });

    if( pasaValidacion ) {
      // setValidacionFormulario({});
      insertPolizasAuto({
        data: Object.assign({}, firstPage, getFormData(event)),
        token: auth.tokenFirebase
      });
    } else {
      // setValidacionFormulario(validacion);
    }
  }

  return (
    <div>
      {insertPolizasAutoPending !== true ?
        <BStepper
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          labelAction="Aprobar"
          stepContent={[
            {
              handleSubmit: submitFormStep1,
              renderView: !data ? "Loading" :
                <div>
                  <Grid container spacing={3}>
                    {!columns || columns.length <= 0 || data.length <= 0 ?
                      null : columns.map((col, index) => {
                        return col.options.hasOwnProperty("display") && !col.options.display ? null :
                          <Grid key={`grid_${index}_${col.name}`} item xs={4} >
                            {
                              col.name === "aseguradora" ?
                              <AseguradoraView error={validacionFormulario.hasOwnProperty(col.name)} errorMessage={validacionFormulario[col.name]} /> :
                              col.name === "producto" ?
                              <ProductosView error={validacionFormulario.hasOwnProperty(col.name)} errorMessage={validacionFormulario[col.name]} /> :
                              <BInput key={`col_${index}_${col.name}`} {...col} editValue={col.defaultValue === "" ? null : col.defaultValue} error={validacionFormulario.hasOwnProperty(col.name)} errorMessage={validacionFormulario[col.name]} />
                            }                          
                          </Grid>
                      }
                      )}
                  </Grid>
                </div>
            },

            {
              handleSubmit: submitFormStep2,
              renderView: !data ? "Loading" :
                <SegundoFormulario tipo={parseInt(datos.tipo)} />
            }
          ]}
        /> : <h3>Procesando....</h3> }
    </div>
  );
}

export default AprobarFormulario;