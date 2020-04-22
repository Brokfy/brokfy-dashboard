import React, { useEffect, useState } from 'react';
import BTable from '../../../components/btable';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const CartaNombramiento = () => {

  const [columns] = useState([
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
      name: "tipo",
      label: "Tipo",
      type: "int",
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
      type: "string",
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
      label: "NoPoliza",
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
        sort: true,
      }
    },
    {
      name: "urlPoliza",
      label: "UrlPoliza",
      type: "string",
      required: true,
      defaultValue: "",
      options: {
        filter: true,
        sort: true,
      }
    }
  ]);
  const [data, setData] = useState([]);

  useEffect(() => {


    fetch('https://localhost:44341/api/CartaNombramiento', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ffx8gpzL9e0:APA91bHCdUC9lxBJbYNN_V6BFTGto7ieP7JyGHWlFpbaMdwRUI7VPWdPwmgq6ZKzJaQcpx1YVcYszypup2-MUhGmK7VBmnT2Z4GBgTZISgYCEuaOffEuEtte8CxlCw1euugc4zYRKCmS',
        'Content-Type': 'application/json',
      },
      //body: JSON.stringify(data) 
    })
      .then(response => response.json())
      .then(response => {

        setData(response);
      });

  }, []);

  const updateSelected = (selectedRows, displayData, setSelectedRows, option) => {
    // if(option === 1) // aprobar
    // asdadas
    // else if(option === 0) // rechazar
    // asdadasd

    // crearPoliza(selection.noPoliza)
    console.log({selectedRows, displayData, setSelectedRows, option})
  }


  const options = {
    module: "carta-nombramiento",
    buttons: {
      hideCreate: false,
      hideEdit: true,
      hideDelete: false,
      customButtons: [
        {
          title: "Aprobar",
          multiple: false,
          icon: <ThumbUpIcon />,
          action: (selectedRows, displayData, setSelectedRows) => updateSelected(selectedRows, displayData, setSelectedRows, 1)
        },
        {
          title: "Rechazar",
          multiple: true,
          icon: <ThumbDownIcon />,
          action: (selectedRows, displayData, setSelectedRows) => updateSelected(selectedRows, displayData, setSelectedRows, 0)
        }
      ]
    }

  };



  return (
    <BTable columns={columns} data={data} options={options} />
    //<div>hola</div>
  );
}

export default CartaNombramiento;