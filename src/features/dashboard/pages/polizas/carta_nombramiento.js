import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
import BTable from '../../../../components/btable';
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
// import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { useGetToken } from '../../../common/redux/hooks';
// import { useTipoPoliza } from '../../hooks';
// import axios from 'axios';
import { useFetchTipoPolizas } from '../../redux/fetchTipoPolizas';
import { useFetchCartasNombramiento } from '../../redux/fetchCartasNombramiento';
import BLoading from '../../../../components/bloading';
import { nowrapColumn } from '../../../../common/utils';
import { useFetchAseguradoras } from '../../redux/fetchAseguradoras';
import { IconButton } from "@material-ui/core";
import { LinkOutlined } from "@material-ui/icons";

const CartaNombramiento = () => {
  // const history = useHistory();
  // const [data, setData] = useState([]);
  // const [isLoading, setLoading] = useState(false);
  const { auth } = useGetToken();
  // const [tipoPoliza, TipoPolizaView, setInitialValue, listadoTipoPoliza] = useTipoPoliza();
  const { tipoPolizas: listadoTipoPoliza, fetchTipoPolizas } = useFetchTipoPolizas();
  const { cartasNombramiento: listadoCartasNombramiento, fetchCartasNombramiento, fetchCartasNombramientoPending } = useFetchCartasNombramiento();
  const { aseguradoras: listadoAseguradora, fetchAseguradoras } = useFetchAseguradoras();
  const [datosCargados, setDatosCargados] = useState(false);

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if( auth.tokenFirebase !== "" ) {
      fetchCartasNombramiento(auth.tokenFirebase);
      fetchTipoPolizas(auth.tokenFirebase);
    }
  }, [auth.tokenFirebase, fetchCartasNombramiento, fetchTipoPolizas]);

  useEffect(() => {
    if ( !datosCargados ) {
      fetchAseguradoras(auth.tokenFirebase);
      setDatosCargados(true);
      return;
    }

    if( listadoCartasNombramiento && listadoCartasNombramiento.length > 0 && listadoTipoPoliza && listadoTipoPoliza.length > 0 && listadoAseguradora) {
      setColumns([
        {
          name: "username",
          label: "Username",
          type: "string",
          required: true,
          defaultValue: "",
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: "fullName",
          label: "Nombre",
          type: "string",
          required: true,
          defaultValue: "",
          options: {
            filter: true,
            sort: true,
            ...nowrapColumn
          }
        },
        {
          name: "tipo",
          label: "Tipo",
          type: "list",
          data: [...listadoTipoPoliza.map(item => { return {text: item.tipo, value: item.id}; })],
          required: true,
          defaultValue: "",
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: "aseguradora",
          label: "Aseguradora",
          type: "list",
          data: [...listadoAseguradora.map(item => { return {text: item.nombre, value: item.idAseguradora}; })],
          required: true,
          defaultValue: "",
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: "fecha",
          label: "Fecha",
          type: "date",
          required: true,
          defaultValue: "",
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: "noPoliza",
          label: "Póliza",
          type: "string",
          required: true,
          defaultValue: "",
          options: {
            filter: true,
            sort: true,
          }
        },
        {
          name: "revisado",
          label: "Revisado",
          type: "string",
          required: true,
          defaultValue: "",
          options: {
            filter: true,
            display: false,
            sort: true,
          }
        },
        {
          name: "urlPoliza",
          label: "Documento",
          type: "string",
          required: true,
          defaultValue: "",
          options: {
            filter: false,
            sort: false,
            ...nowrapColumn,
            customBodyRender: (value, tableMeta, updateValue) => {
                if( value === null || value.toString().trim() === "" ) {
                    return null;
                }

                return (
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=> window.open(value, "_blank")}>
                        <LinkOutlined />
                    </IconButton>
                );
            }
          }
        },
        {
          name: "urlCartaNombramiento",
          label: "Carta Nombramiento",
          type: "string",
          required: true,
          defaultValue: "",
          options: {
            filter: false,
            sort: false,
            ...nowrapColumn,
            customBodyRender: (value, tableMeta, updateValue) => {
                if( value === null || value.toString().trim() === "" ) {
                    return null;
                }

                return (
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=> window.open(value, "_blank")}>
                        <LinkOutlined />
                    </IconButton>
                );
            }
          }
        }
      ]);
    }
  }, [auth, listadoTipoPoliza, listadoCartasNombramiento, fetchCartasNombramientoPending, fetchAseguradoras, datosCargados, listadoAseguradora]);

  // const updateSelected = ({data: [{index}]}, displayData, setSelectedRows, option, history) => {
  //   const { data } = displayData[index];
  //   const noPoliza = data[4];

  //   if( option === 1 ) {
  //     history.push(`/polizas/carta-nombramiento/aprobar?poliza=${noPoliza}`);  
  //   }
  // }


  const options = {
    module: "carta-nombramiento",
    selectableRows: "none",
    buttons: {
      hideCreate: true,
      hideEdit: true,
      hideDelete: true,
      customButtons: [
        // {
        //   title: "Aprobar",
        //   multiple: false,
        //   icon: <ThumbUpIcon />,
        //   action: (selectedRows, displayData, setSelectedRows) => updateSelected(selectedRows, displayData, setSelectedRows, 1, history)
        // },
        // {
        //   title: "Rechazar",
        //   multiple: true,
        //   icon: <ThumbDownIcon />,
        //   action: (selectedRows, displayData, setSelectedRows) => updateSelected(selectedRows, displayData, setSelectedRows, 0, history)
        // }
      ]
    },
    actions: {
      PUT: {
        action: () => {},
        pending: false,
        error: null,
        display: false,
        message: ""
      },
      POST: {
        action: () => {},
        pending: false,
        error: null,
        display: false,
        message: ""
      },
      DELETE: {
        action: () => {},
        pending: false,
        error: null,
        display: false,
        message: ""
      }
    }

  };

  if( columns.length > 0 ) {
    return (
      <BTable columns={columns} data={listadoCartasNombramiento} options={options} isLoading={false} refreshData={fetchCartasNombramiento} token={auth.tokenFirebase} />
    );
  } else {
    return <BLoading display={true}/>;
  }
}

export default CartaNombramiento;