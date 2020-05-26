import React, { useState, useEffect } from 'react';
import { useGetToken } from '../../../common/redux/hooks';
import BTable from '../../../../components/btable';
import { useFetchPolizasVida } from '../../redux/fetchPolizasVida';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useFetchProductos } from '../../redux/fetchProductos';
import BLoading from '../../../../components/bloading';
import { useUpdatePolizasVida } from '../../redux/updatePolizasVida';
import { useDeletePolizasVida } from '../../redux/deletePolizasVida';
import { useInsertPolizasVida } from '../../redux/insertPolizasVida';
import {useParams} from 'react-router-dom';
import { nowrapColumn, checkboxRender, listEstadoPoliza } from '../../../../common/utils';
import getColumnsPolizasVida from './polizas_vida_columnas';

const PolizasVida = () => {
  const [columns, setColumns] = useState([]);
  const { auth } = useGetToken();
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    aseguradoras: false,
    productos: false,
    polizasVida: false,
  });
  
  const { polizasVida: listadoPolizasVida, fetchPolizasVida, fetchPolizasVidaPending } = useFetchPolizasVida();
  const { updatePolizasVida, updatePolizasVidaPending, updatePolizasVidaError, updatePolizasVidaNotify } = useUpdatePolizasVida();
  const { deletePolizasVida, deletePolizasVidaPending, deletePolizasVidaError, deletePolizasVidaNotify } = useDeletePolizasVida();
  const { insertPolizasVida, insertPolizasVidaPending, insertPolizasVidaError, insertPolizasVidaNotify } = useInsertPolizasVida();
  const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
  const { productos: listadoProductos, fetchProductos, fetchProductosPending } = useFetchProductos();

  let { propia, tipo } = useParams();

  useEffect(() => {
    setDatosCargados({
      aseguradoras: false,
      productos: false,
      polizasVida: false,
    });
  }, [propia, tipo])


  useEffect(() => {
    if ( !auth.tokenFirebase || auth.tokenFirebase  === "" ) return;
    if ( fetchPolizasVidaPending || fetchAseguradorasPending || fetchProductosPending ) return;

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

    if ( !datosCargados.polizasVida ) {
      setLoading(true);
      fetchPolizasVida({propia:propia === "brokfy" ? "Si" : "No", tokenFirebase: auth.tokenFirebase});
      setColumns(getColumnsPolizasVida(listadoAseguradora, listadoProductos));
      setDatosCargados({
        ...datosCargados,
        polizasVida: true
      });
      return;
    }

    setLoading(false);
  }, [auth.tokenFirebase, fetchPolizasVidaPending, fetchAseguradorasPending, fetchProductosPending, datosCargados, fetchAseguradoras, fetchProductos, fetchPolizasVida, propia, listadoAseguradora, listadoProductos]);

  const options = {
    module: "PolizaVida",
    buttons: {
      hideCreate: true,
      hideEdit: false,
      hideDelete: false,
      customButtons: []
    },
    actions: {
      PUT: {
        action: updatePolizasVida,
        pending: updatePolizasVidaPending,
        error: updatePolizasVidaError,
        display: updatePolizasVidaNotify === true &&
          (updatePolizasVidaPending === false ?
            (updatePolizasVidaError !== null ?
              updatePolizasVidaError :
              "Registro actualizado exitosamente")
            : "") !== "",
        message: ""
      },
      POST: {
        action: insertPolizasVida,
        pending: insertPolizasVidaPending,
        error: insertPolizasVidaError,
        display: insertPolizasVidaNotify === true && (insertPolizasVidaPending === false ?
          (insertPolizasVidaError !== null ?
            insertPolizasVidaError :
            "Registro ingresado exitosamente")
          : "") !== "",
        message: insertPolizasVidaPending === false ?
          (insertPolizasVidaError !== null ?
            insertPolizasVidaError :
            "Registro ingresado exitosamente")
          : ""
      },
      DELETE: {
        action: deletePolizasVida,
        pending: deletePolizasVidaPending,
        error: deletePolizasVidaError,
        display: deletePolizasVidaNotify === true && (deletePolizasVidaPending === false ?
          (deletePolizasVidaError !== null ?
            deletePolizasVidaError :
            "Registro eliminado exitosamente")
          : "") !== "",
        message: deletePolizasVidaPending === false ?
          (deletePolizasVidaError !== null ?
            deletePolizasVidaError :
            "Registro eliminado exitosamente")
          : ""
      }
    }
  };

  if (!loading) {
    return (
      <BTable columns={columns} data={listadoPolizasVida} options={options} isLoading={false} refreshData={fetchPolizasVida} token={auth.tokenFirebase} />
    );
  } else {
    return <BLoading display={true} />;
  }
}

export default PolizasVida;