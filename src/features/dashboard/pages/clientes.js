import React, { useState } from 'react';
import MUIDataTable from "mui-datatables";
import { Button, Modal } from '@material-ui/core';


const Clientes = () => {

  const [open, setOpen] = useState(false)

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
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div>
          <h2 id="transition-modal-title">Transition modal</h2>
          <p id="transition-modal-description">react-transition-group animates me.</p>
        </div>
      </Modal>
      
      <MUIDataTable
        title={<Button onClick={() => setOpen(true)} variant="contained"><i className="fa fa-plus"></i> {"  "} Agregar</Button>}
        data={data}
        columns={columns}
        options={options}
      />

      
    </div>
  );
}

export default Clientes;