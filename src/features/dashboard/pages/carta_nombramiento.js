import React, { useEffect } from 'react';
import BTable from '../../../components/btable';

const CartaNombramiento = () => {

  const [columns, setColumns] = useState([
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
      type: "list",
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
    postData();
  }, [columns, data]);

  async function postData(url = 'https://localhost:44341/api/CartaNombramiento') {
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Authorization': 'Bearer ffx8gpzL9e0:APA91bHCdUC9lxBJbYNN_V6BFTGto7ieP7JyGHWlFpbaMdwRUI7VPWdPwmgq6ZKzJaQcpx1YVcYszypup2-MUhGmK7VBmnT2Z4GBgTZISgYCEuaOffEuEtte8CxlCw1euugc4zYRKCmS',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(json => console.log);
  }

  const options = {
    module: "usuario"
  };

  return (
    <BTable columns={columns} data={data} options={options} />
  );
}

export default CartaNombramiento;