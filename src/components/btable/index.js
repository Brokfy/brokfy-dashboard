import React, { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BModal from '../../components/bmodal';
import BConfirm from '../../components/bconfirm';
import './styles.css';

const BTable = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);
  let { columns, data, options } = props;

  const clickEdit = (selectedRows, displayData, setSelectedRows) => {
    setDataEdit(!selectedRows.data || selectedRows.data.length <= 0 || displayData.length <= 0 ? null :
      displayData.filter((x, i) => i === selectedRows.data[0].index)[0].data.map((m, im) => { return { name: columns[im].name, value: m } }));
    setModalOpen(true);
  }

  const clickDelete = (selectedRows, displayData, setSelectedRows) => {
    setDataDelete(!selectedRows.data || selectedRows.data.length <= 0 || displayData.length <= 0 ? null :
      displayData.filter((x, i) => i === selectedRows.data[0].index)[0].data.map((m, im) => { return { name: columns[im].name, value: m } }));
    setConfirmOpen(true);
  }

  const confirmDelete = () => {
    setConfirmOpen(false);
    alert("Registro eliminado");
  }

  const customToolbarSelect = (selectedRows, displayData, setSelectedRows) => {
    return (<div className="iconBar">
      {
        !selectedRows.data || selectedRows.data.length > 1 ? null :
          <IconButton onClick={() => clickEdit(selectedRows, displayData, setSelectedRows)} aria-label="edit">
            <EditIcon />
          </IconButton>
      }
      <IconButton onClick={() => clickDelete(selectedRows, displayData, setSelectedRows)} aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>)
  }

  const newRecord = () => {
    setDataEdit(null);
    setModalOpen(true);
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
      <BModal open={modalOpen} setOpen={setModalOpen} columns={columns} data={dataEdit} />
      <BConfirm open={confirmOpen} setOpen={setConfirmOpen} confirmAction={confirmDelete}  title="Desea continuar?" body="Esta apunto de eliminar varios registros, esta seguro?" />

      <MUIDataTable
        title={<Button onClick={() => newRecord()} variant="contained"><i className="fa fa-plus"></i> {"  "} Agregar</Button>}
        data={data}
        columns={columns}
        options={options}
      />
    </div>
  );
}

export default BTable;