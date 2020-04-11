import React, { useState } from './node_modules/react';
import MUIDataTable from "./node_modules/mui-datatables";
import { Button, Modal } from './node_modules/@material-ui/core';

const BTable = (props) => {

  const [open, setOpen] = useState(false);
  const {columns, data, options} = props;

  const defaultOptions = {
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

export default BTable;