import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BTable from '../../../../components/btable';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useGetToken } from '../../../common/redux/hooks';
import { useFetchAprobaciones } from '../../redux/fetchAprobaciones';
import { useDeleteAprobacion } from '../../redux/deleteAprobacion';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { useFetchTipoPolizas } from '../../redux/fetchTipoPolizas';
import BLoading from '../../../../components/bloading';
import { getCRUDConfig } from '../../../../common/utils';
import getColumnsAprobaciones from './aprobaciones_columnas';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

const Aprobaciones = () => {
  const [loading, setLoading] = useState(true);
  const [datosCargados, setDatosCargados] = useState({
    tipoPoliza: false,
    aseguradoras: false,
    aprobaciones: false,
  });
  const [datosGrid, setDatosGrid] = useState([]);
  const [columns, setColumns] = useState([]);
  const { auth } = useGetToken();  
  const [open, setOpen] = React.useState(false);
  const [eliminando, setEliminando] = React.useState(false);
  const [seleccion, guardarSeleccion] = useState([]);

  const { aseguradoras: listadoAseguradora, fetchAseguradoras, fetchAseguradorasPending } = useFetchAseguradoras();
  const { tipoPolizas: listadoTipoPoliza, fetchTipoPolizas, fetchTipoPolizasPending } = useFetchTipoPolizas();
  const { aprobaciones: listadoAprobaciones, fetchAprobaciones, fetchAprobacionesPending } = useFetchAprobaciones();
  const { deleteAprobacion, deleteAprobacionPending } = useDeleteAprobacion();

  const history = useHistory();

  useEffect(() => {
    if ( auth.tokenFirebase === "" ) return;
    if( fetchAseguradorasPending || fetchTipoPolizasPending || fetchAprobacionesPending ) return;

    if(eliminando && open && !deleteAprobacionPending) {
      setOpen(false);
    }

    if ( !datosCargados.aseguradoras ) {
      fetchAseguradoras(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        aseguradoras: true,
      });
      return;
    }

    if( !datosCargados.tipoPoliza ) {
      fetchTipoPolizas(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        tipoPoliza: true,
      });
      return;
    }

    if( !datosCargados.productos ) {
      setColumns(getColumnsAprobaciones(listadoTipoPoliza, listadoAseguradora));
      fetchAprobaciones(auth.tokenFirebase);
      setDatosCargados({
        ...datosCargados,
        productos: true,
      });
      return;
    }

    setLoading(false);
    setDatosGrid(listadoAprobaciones);
  }, [auth.tokenFirebase, fetchAseguradorasPending, fetchTipoPolizasPending, fetchAprobacionesPending, datosCargados, fetchAseguradoras, fetchTipoPolizas, fetchAprobaciones, listadoAprobaciones, listadoAseguradora, listadoTipoPoliza, deleteAprobacionPending, open, eliminando]);

  const options = { 
    ...getCRUDConfig(
      'carta-nombramiento', 
      () => {}, false, null, false,
      () => {}, false, null, false,
      () => {}, false, null, false
    ),
    buttons: {
      hideCreate: true,
      hideEdit: true,
      hideDelete: true,
      customButtons: [
        {
          title: "Aprobar",
          multiple: false,
          icon: <ThumbUpIcon />,
          action: (selectedRows, displayData, setSelectedRows) => updateSelected(selectedRows, displayData, setSelectedRows, 1, history)
        },
        {
          title: "Rechazar",
          multiple: true,
          icon: <ThumbDownIcon />,
          action: (selectedRows, displayData, setSelectedRows) => {
            const arrElementSelected = selectedRows.data.map(item => item.index);
            const polizasSeleccionadas = arrElementSelected.map(item => displayData[item].data[5]);
            guardarSeleccion(polizasSeleccionadas);
            openDialog();
          }
        }
      ]
    },
  };

  const updateSelected = ({ data: [{ index }] }, displayData, setSelectedRows, option, history) => {
    const { data } = displayData[index];
    const noPoliza = data[5];

    if (option === 1) {
      history.push(`/polizas/todas/aprobaciones/aprobar?poliza=${noPoliza}`);
    }
  }

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const descartarPolizas = () => {
    if( seleccion.length > 0 ) {
      setEliminando(true);
      deleteAprobacion({
        data: seleccion,
        token: auth.tokenFirebase
      });
    }
  }

  return (
    <div>
      { loading === true ? <BLoading /> : null }
      { datosCargados && !loading ? <BTable columns={columns} data={datosGrid} options={options} token={auth.tokenFirebase} /> : null }
      <Dialog
        open={open}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Descartar Póliza</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Está seguro de descartar las Pólizas Nº <b>{seleccion.join(", ")}</b>?.<br/>
            Una vez descartadas no se podrá deshacer la acción.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>
            Cancelar
          </Button>
          <Button onClick={descartarPolizas} color="primary" autoFocus disabled={deleteAprobacionPending}>
            { deleteAprobacionPending ? <i className="fa fa-refresh fa-spin"></i> : null }
            {
                deleteAprobacionPending ? <span>&nbsp;&nbsp;Procesando...</span> :
                "Aceptar"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Aprobaciones;