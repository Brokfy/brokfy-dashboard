import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button } from '@material-ui/core';
import BModal from '../../components/bmodal';
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const BTable = (props) => {
  const [open, setOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  let { columns, data, options } = props;


  const customToolbarSelect = (selectedRows, displayData, setSelectedRows) => {
    console.log({ selectedRows, displayData, setSelectedRows })

    return (<div className="iconBar">
      {
        !selectedRows.data || selectedRows.data.length > 1 ? null :
          <IconButton aria-label="edit">
            <EditIcon fontSize="medium" />
          </IconButton>
      }

      <IconButton aria-label="delete">
        <DeleteIcon fontSize="medium" />
      </IconButton>


    </div>)
  }

  options = {
    ...options,
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: "multiple",
    //selectableRowsHeader: false,
    customToolbarSelect,
  };

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