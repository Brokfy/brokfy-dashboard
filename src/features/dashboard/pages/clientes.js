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
      name: "city",
      label: "City",
      type: "string",
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
  ];

  const data = [
    { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "1" },
    { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "5" },
    { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "66" },
    { name: "James Houston", company: "Test Corp", city: "Dallas", state: "8888" },
  ];

  const options = {
    module: "usuario"
  };

  return (
    <BTable columns={columns} data={data} options={options} />
  );
}

export default Clientes;