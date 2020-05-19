import React, { useState, useEffect } from 'react';
import BTable from '../../../../components/btable';
import { useGetToken } from '../../../common/redux/hooks';
import { useUpdateAseguradora } from '../../redux/updateAseguradora';
import { useDeleteAseguradora } from '../../redux/deleteAseguradora';
import { useInsertAseguradora } from '../../redux/insertAseguradora';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import BLoading from '../../../../components/bloading';
import getColumnsAseguradoras from './aseguradoras_columnas';
import { getCRUDConfig } from '../../../../common/utils';

const Aseguradoras = () => {
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState(false);
  const [datosGrid, setDatosGrid] = useState([]);
  const { auth } = useGetToken();

  const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
  const { updateAseguradora, updateAseguradoraPending, updateAseguradoraError, updateAseguradoraNotify } = useUpdateAseguradora();
  const { insertAseguradora, insertAseguradoraPending, insertAseguradoraError, insertAseguradoraNotify } = useInsertAseguradora();
  const { deleteAseguradora, deleteAseguradoraPending, deleteAseguradoraError, deleteAseguradoraNotify } = useDeleteAseguradora();
  const columns = getColumnsAseguradoras();

  useEffect(() => {
    if ( auth.tokenFirebase === "" ) return;
    if( fetchAseguradorasPending ) return;

    if ( !datosCargados ) {
      fetchAseguradoras(auth.tokenFirebase);
      setDatosCargados(true);
      return;
    }

    setLoading(false);
    setDatosGrid(listadoAseguradora);
  }, [auth.tokenFirebase, fetchAseguradorasPending, listadoAseguradora, datosCargados, fetchAseguradoras]);

  const options = getCRUDConfig(
    'Aseguradoras', 
    updateAseguradora, updateAseguradoraPending, updateAseguradoraError, updateAseguradoraNotify,
    insertAseguradora, insertAseguradoraPending, insertAseguradoraError, insertAseguradoraNotify,
    deleteAseguradora, deleteAseguradoraPending, deleteAseguradoraError, deleteAseguradoraNotify
  );

  return (
    <div>
      { loading === true ? <BLoading /> : null }
      { datosCargados && !loading ? <BTable columns={columns} data={datosGrid} options={options} token={auth.tokenFirebase} /> : null }
    </div>
  );
}

export default Aseguradoras;