import React, { useState, useEffect } from 'react';
import BTable from '../../../../components/btable';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchProductos } from '../../redux/fetchProductos';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useFetchProductosBrokfy } from '../../redux/fetchProductosBrokfy';
import { useUpdateProducto } from '../../redux/updateProducto';
import { useInsertProducto } from '../../redux/insertProducto';
import { useDeleteProducto } from '../../redux/deleteProducto';
import BLoading from '../../../../components/bloading';
import getColumnsCatalogoProductos from './catalogo_productos_columnas';
import { getCRUDConfig } from '../../../../common/utils';

const CatalogoProductos = () => {
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    aseguradoras: false,
    productosBrokfy: false,
    productos: false,
  });
  const [datosGrid, setDatosGrid] = useState([]);
  const [columns, setColumns] = useState([]);
  const { auth } = useGetToken();

  const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
  const { productosBrokfy: listadoProductosBrokfy, fetchProductosBrokfy, fetchProductosBrokfyPending } = useFetchProductosBrokfy();
  const { productos: listadoProductos, fetchProductos, fetchProductosPending } = useFetchProductos();
  const { updateProducto, updateProductoPending, updateProductoError, updateProductoNotify } = useUpdateProducto();
  const { insertProducto, insertProductoPending, insertProductoError, insertProductoNotify } = useInsertProducto();
  const { deleteProducto, deleteProductoPending, deleteProductoError, deleteProductoNotify } = useDeleteProducto();

  useEffect(() => {
    if ( auth.tokenFirebase === "" ) return;
    if( fetchAseguradorasPending || fetchProductosBrokfyPending || fetchProductosPending ) return;

    if ( !datosCargados.aseguradoras ) {
      fetchAseguradoras(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        aseguradoras: true,
      });
      return;
    }

    if( !datosCargados.productosBrokfy ) {
      fetchProductosBrokfy(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        productosBrokfy: true,
      });
      return;
    }

    if( !datosCargados.productos ) {
      setColumns(getColumnsCatalogoProductos(listadoAseguradora, listadoProductosBrokfy));
      fetchProductos(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        productos: true,
      });
      return;
    }

    setLoading(false);
    setDatosGrid(listadoProductos);
  }, [auth.tokenFirebase, fetchAseguradorasPending, fetchProductosBrokfyPending, fetchProductosPending, listadoAseguradora, listadoProductosBrokfy, listadoProductos, setColumns, datosCargados, fetchAseguradoras, fetchProductos, fetchProductosBrokfy]);


  const options = getCRUDConfig(
    'Productos', 
    updateProducto, updateProductoPending, updateProductoError, updateProductoNotify,
    insertProducto, insertProductoPending, insertProductoError, insertProductoNotify,
    deleteProducto, deleteProductoPending, deleteProductoError, deleteProductoNotify
  );

  return (
    <div>
      { loading === true ? <BLoading /> : null }
      { datosCargados && !loading ? <BTable columns={columns} data={datosGrid} options={options} token={auth.tokenFirebase} /> : null }
    </div>
  );
  
}

export default CatalogoProductos;