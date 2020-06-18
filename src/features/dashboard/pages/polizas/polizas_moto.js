import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchPolizasMoto } from '../../redux/fetchPolizasMoto';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useInsertPolizasMoto } from '../../redux/insertPolizasMoto';
import { useUpdatePolizasMoto } from '../../redux/updatePolizasMoto';
import { useDeletePolizasMoto } from '../../redux/deletePolizasMoto';
import { useFetchProductos } from '../../redux/fetchProductos';
import BLoading from '../../../../components/bloading';
import BTable from '../../../../components/btable';
import getColumnsPolizasMoto from './polizas_moto_columnas';

const PolizasMoto = (props) => {
  const [columns, setColumns] = useState([]);
  const { auth } = useGetToken();
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    aseguradoras: false,
    productos: false,
    polizasAuto: false,
  });

  const { polizasMoto: listadoPolizasMoto, fetchPolizasMoto, fetchPolizasMotoPending } = useFetchPolizasMoto();
  const { updatePolizasMoto, updatePolizasMotoPending, updatePolizasMotoError, updatePolizasMotoNotify } = useUpdatePolizasMoto();
  const { deletePolizasMoto, deletePolizasMotoPending, deletePolizasMotoError, deletePolizasMotoNotify } = useDeletePolizasMoto();
  const { insertPolizasMoto, insertPolizasMotoPending, insertPolizasMotoError, insertPolizasMotoNotify } = useInsertPolizasMoto();
  const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
  const { productos: listadoProductos, fetchProductos, fetchProductosPending } = useFetchProductos();

  let { propia, tipo } = useParams();

  useEffect(() => {
    setDatosCargados({
      aseguradoras: false,
      productos: false,
      polizasMoto: false,
    });
  }, [propia, tipo]);

  useEffect(() => {
    if ( !auth.tokenFirebase || auth.tokenFirebase  === "" ) return;
    if ( fetchPolizasMotoPending || fetchAseguradorasPending || fetchProductosPending ) return;

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

    if ( !datosCargados.polizasMoto ) {
      setLoading(true);
      fetchPolizasMoto({propia:propia === "brokfy" ? "Si" : "No", tokenFirebase: auth.tokenFirebase});
      setColumns(getColumnsPolizasMoto(listadoAseguradora, listadoProductos));
      setDatosCargados({
        ...datosCargados,
        polizasMoto: true
      });
      return;
    }

    setLoading(false);
  }, [auth.tokenFirebase, fetchPolizasMotoPending, fetchAseguradorasPending, fetchProductosPending, datosCargados, fetchAseguradoras, fetchProductos, fetchPolizasMoto, propia, listadoAseguradora, listadoProductos]);

  const options = {
    module: "PolizaMoto",
    buttons: {
      hideCreate: true,
      hideEdit: true,
      hideDelete: false,
      customButtons: []
    },
    actions: {
      PUT: {
        action: updatePolizasMoto,
        pending: updatePolizasMotoPending,
        error: updatePolizasMotoError,
        display: updatePolizasMotoNotify === true &&
          (updatePolizasMotoPending === false ?
            (updatePolizasMotoError !== null ?
              updatePolizasMotoError :
              "Registro actualizado exitosamente")
            : "") !== "",
        message: ""
      },
      POST: {
        action: insertPolizasMoto,
        pending: insertPolizasMotoPending,
        error: insertPolizasMotoError,
        display: insertPolizasMotoNotify === true && (insertPolizasMotoPending === false ?
          (insertPolizasMotoError !== null ?
            insertPolizasMotoError :
            "Registro ingresado exitosamente")
          : "") !== "",
        message: insertPolizasMotoPending === false ?
          (insertPolizasMotoError !== null ?
            insertPolizasMotoError :
            "Registro ingresado exitosamente")
          : ""
      },
      DELETE: {
        action: deletePolizasMoto,
        pending: deletePolizasMotoPending,
        error: deletePolizasMotoError,
        display: deletePolizasMotoNotify === true && (deletePolizasMotoPending === false ?
          (deletePolizasMotoError !== null ?
            deletePolizasMotoError :
            "Registro eliminado exitosamente")
          : "") !== "",
        message: deletePolizasMotoPending === false ?
          (deletePolizasMotoError !== null ?
            deletePolizasMotoError :
            "Registro eliminado exitosamente")
          : ""
      }
    }
  };

  if (!loading) {
    return (
      <BTable columns={columns} data={listadoPolizasMoto} options={options} isLoading={false} refreshData={fetchPolizasMoto} token={auth.tokenFirebase} />
    );
  } else {
    return <BLoading display={true} />;
  }
}

export default PolizasMoto;