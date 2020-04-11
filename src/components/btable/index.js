import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button } from '@material-ui/core';
import BModal from '../../components/bmodal';

const BTable = (props) => {  
  const [open, setOpen] = useState(false);
  const { columns, data, options } = props;
  
  /* const defaultOptions = {
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "none"
  }; */

  return (
    <div>
      <BModal open={open} setOpen={setOpen} columns={columns} data={null} />

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