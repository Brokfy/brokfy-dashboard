import React from 'react';
import BTable from '../../../components/btable';

const Clientes = () => {

  const columns = [
    {
      name: "name",
      label: "Name",
      type: "string",
      required: true,
      defaultValue: "",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "company",
      label: "Company",
      type: "string",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "eta",
      label: "ETA",
      type: "date",
      defaultValue: "2020-01-01",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "state",
      label: "State",
      type: "int",
      options: {
        filter: true,
        sort: true,
      }
    },
    
      {
        name: "city",
        label: "City",
        type: "list",
        data: [
          {text: "Santiago", value: 1},
          {text: "Caracas", value: 2},
          {text: "Bogota", value: 3},
          {text: "Trujillo", value: 4},
        ],
        options: {
          filter: true,
          sort: true,
        }
    },
  ];

  const data = [
    { name: "Joe James", company: "Test Corp", eta: "2020-01-01", state: "1", city: 4 },
    { name: "John Walsh", company: "Test Corp", eta: "2020-01-02", state: "5", city: 2 },
    { name: "Bob Herm", company: "Test Corp", eta: "2020-01-05", state: "66", city: 3 },
    { name: "James Houston", company: "Test Corp", eta: "2020-01-24", state: "8888", city: 1 },
  ];

  const options = {
    module: "usuario"
  };

  return (
    <BTable columns={columns} data={data} options={options} />
  );
}

export default Clientes;