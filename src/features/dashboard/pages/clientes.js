import React from 'react';
import MUIDataTable from "mui-datatables";
import { Button, Modal } from '@material-ui/core';
import BTable from '../../../components/btable';

const Clientes = () => {

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "city",
      label: "City",
      options: {
        filter: true,
        sort: true,
      }
    },
    {
      name: "state",
      label: "State",
      options: {
        filter: true,
        sort: true,
      }
    },
  ];

  const data = [
    { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
    { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
    { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
    { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
  ];

  const options = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "none"
  };

  return (
    <BTable columns={columns} data={data} options={options} />
  );
}

export default Clientes;