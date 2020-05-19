import React, { useEffect, useState } from "react";
import { useFetchComisiones } from "../../redux/fetchComisiones";
import { useFetchAseguradoras } from "../../redux/fetchAseguradoras";
import { useGetToken } from "../../../common/redux/hooks";
import { getCRUDConfig } from "../../../../common/utils";
import BLoading from "../../../../components/bloading";
import BTable from "../../../../components/btable";
import getColumnsComisiones from './comisiones_columnas';
import { useUpdateComisiones } from "../../redux/updateComisiones";
import { fetchProductosBrokfy } from "../../redux/fetchProductosBrokfy";

const Comisiones = (props) => {
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    aseguradoras: false,
    comisiones: false,
  });
  const [datosGrid, setDatosGrid] = useState([]);
  const [columns, setColumns] = useState([]);
  const { auth } = useGetToken();

  const { comisiones: listadoComisiones, fetchComisiones, fetchComisionesPending } = useFetchComisiones();
  const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
  const { updateComisiones, updateComisionesPending, updateComisionesError, updateComisionesNotify } = useUpdateComisiones();

  useEffect(() => {
    if ( auth.tokenFirebase === "" ) return;
    if( fetchComisionesPending || fetchAseguradorasPending ) return;

    if ( !datosCargados.aseguradoras ) {
      fetchAseguradoras(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        aseguradoras: true,
      });
      return;
    }

    if ( !datosCargados.comisiones ) {
      setColumns(getColumnsComisiones(listadoAseguradora));
      fetchComisiones(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        comisiones: true,
      });
      return;
    }

    setLoading(false);
    setDatosGrid(listadoComisiones);

  }, [auth.tokenFirebase, fetchAseguradorasPending, fetchComisionesPending, listadoAseguradora, listadoComisiones, setColumns, datosCargados, fetchAseguradoras, fetchComisiones])

  const options = {
    ...getCRUDConfig(
      'Comisiones', 
      updateComisiones, updateComisionesPending, updateComisionesError, updateComisionesNotify,
      ()=>{}, false, null, false,
      ()=>{}, false, null, false
    ),
    buttons: {
      hideCreate: true,
      hideEdit: false,
      hideDelete: true,
      customButtons: [
      ]
    },
  };

  return (
    <div>
      { loading === true ? <BLoading /> : null }
      { datosCargados && !loading ? <BTable columns={columns} data={datosGrid} options={options} token={auth.tokenFirebase} /> : null }
    </div>
  );
}

export default Comisiones;