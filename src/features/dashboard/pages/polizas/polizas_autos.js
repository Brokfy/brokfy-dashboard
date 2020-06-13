import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BTable from '../../../../components/btable';
import { useFetchPolizasAuto } from '../../redux/fetchPolizasAuto';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useFetchProductos } from '../../redux/fetchProductos';
import BLoading from '../../../../components/bloading';
import { useUpdatePolizasAuto } from '../../redux/updatePolizasAuto';
import { useDeletePolizasAuto } from '../../redux/deletePolizasAuto';
import { useInsertPolizasAuto } from '../../redux/insertPolizasAuto';
import {useParams} from 'react-router-dom';
import format from 'date-fns/format'
import { TextField, FormHelperText, FormControlLabel, Checkbox, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { nowrapColumn, checkboxRender, getEstadoPolizaLabel, listEstadoPoliza } from '../../../../common/utils';
import getColumnsPolizasAuto from './polizas_auto_columnas';

const PolizasAutos = () => {
  const [columns, setColumns] = useState([]);
  const { auth } = useGetToken();
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    aseguradoras: false,
    productos: false,
    polizasAuto: false,
  });
  
  const { polizasAuto: listadoPolizasAuto, fetchPolizasAuto, fetchPolizasAutoPending } = useFetchPolizasAuto();
  const { updatePolizasAuto, updatePolizasAutoPending, updatePolizasAutoError, updatePolizasAutoNotify } = useUpdatePolizasAuto();
  const { deletePolizasAuto, deletePolizasAutoPending, deletePolizasAutoError, deletePolizasAutoNotify } = useDeletePolizasAuto();
  const { insertPolizasAuto, insertPolizasAutoPending, insertPolizasAutoError, insertPolizasAutoNotify } = useInsertPolizasAuto();
  const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
  const { productos: listadoProductos, fetchProductos, fetchProductosPending } = useFetchProductos();

  let { propia, tipo } = useParams();

  useEffect(() => {
    setDatosCargados({
      aseguradoras: false,
      productos: false,
      polizasAuto: false,
    });
  }, [propia, tipo])


  useEffect(() => {
    if ( !auth.tokenFirebase || auth.tokenFirebase  === "" ) return;
    if ( fetchPolizasAutoPending || fetchAseguradorasPending || fetchProductosPending ) return;

    if ( !datosCargados.aseguradoras ) {
      setLoading(true);
      fetchAseguradoras(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        aseguradoras: true
      });
      return;
    }

    if ( !datosCargados.productos ) {
      setLoading(true);
      fetchProductos(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        productos: true
      });
      return;
    }

    if ( !datosCargados.polizasAuto ) {
      setLoading(true);
      fetchPolizasAuto({propia:propia === "brokfy" ? "Si" : "No", tokenFirebase: auth.tokenFirebase});
      setColumns(getColumnsPolizasAuto(listadoAseguradora, listadoProductos));
      setDatosCargados({
        ...datosCargados,
        polizasAuto: true
      });
      return;
    }

    setLoading(false);
  }, [auth.tokenFirebase, fetchPolizasAutoPending, fetchAseguradorasPending, fetchProductosPending, datosCargados, fetchAseguradoras, fetchProductos, fetchPolizasAuto, propia, listadoAseguradora, listadoProductos]);


  const options = {
    module: "PolizaAuto",
    buttons: {
      hideCreate: true,
      hideEdit: false,
      hideDelete: false,
      customButtons: []
    },
    actions: {
      PUT: {
        action: updatePolizasAuto,
        pending: updatePolizasAutoPending,
        error: updatePolizasAutoError,
        display: updatePolizasAutoNotify === true &&
          (updatePolizasAutoPending === false ?
            (updatePolizasAutoError !== null ?
              updatePolizasAutoError :
              "Registro actualizado exitosamente")
            : "") !== "",
        message: ""
      },
      POST: {
        action: insertPolizasAuto,
        pending: insertPolizasAutoPending,
        error: insertPolizasAutoError,
        display: insertPolizasAutoNotify === true && (insertPolizasAutoPending === false ?
          (insertPolizasAutoError !== null ?
            insertPolizasAutoError :
            "Registro ingresado exitosamente")
          : "") !== "",
        message: insertPolizasAutoPending === false ?
          (insertPolizasAutoError !== null ?
            insertPolizasAutoError :
            "Registro ingresado exitosamente")
          : ""
      },
      DELETE: {
        action: deletePolizasAuto,
        pending: deletePolizasAutoPending,
        error: deletePolizasAutoError,
        display: deletePolizasAutoNotify === true && (deletePolizasAutoPending === false ?
          (deletePolizasAutoError !== null ?
            deletePolizasAutoError :
            "Registro eliminado exitosamente")
          : "") !== "",
        message: deletePolizasAutoPending === false ?
          (deletePolizasAutoError !== null ?
            deletePolizasAutoError :
            "Registro eliminado exitosamente")
          : ""
      }
    }
  };

  if (!loading) {
    return (
      <BTable columns={columns} data={listadoPolizasAuto} options={options} isLoading={false} refreshData={fetchPolizasAuto} token={auth.tokenFirebase} />
    );
  } else {
    return <BLoading display={true} />;
  }
}

export default PolizasAutos;