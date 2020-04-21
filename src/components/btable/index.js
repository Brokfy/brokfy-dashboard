import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button } from '@material-ui/core';
import { IconButton, Avatar } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BModal from '../../components/bmodal';
import BConfirm from '../../components/bconfirm';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import './styles.css';

const BTable = (props) => {
  let { columns, data, options } = props;

  console.log(options)

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [dataDelete, setDataDelete] = useState(null);
  const [tableData, setTableData] = useState([]);
  // const [tableData] = useState(data.length <= 0 ? null :
  //   data.map((row, irow) => {
  //     return columns.filter(c => c.type === 'list').length <= 0 ? row :
  //       columns.filter(c => c.type === 'list').map(c => {
  //         row[c.name] = c.data.filter(v => v.value === row[c.name])[0].text;
  //         console.log(row, c.data.filter(v => v.value === row[c.name]))
  //         return (row);
  //       });
  //   }));

  useEffect(() => {
    const columnList = columns.filter(item => item.type === 'list').map(item => {
      return { name: item.name, data: item.data };
    });
    const columnListName = columnList.map(item => item.name);

    setTableData(data.map((row) => {
      return Object.keys(row).map(key => {
        let descrip = columnList.filter(item => item.name === key).map(item => item.data.filter(d => d.value === row[key]).map(i => i.text))[0];
        return columnListName.includes(key) ? descrip[0] : row[key];
      });
    }));
  }
    , [data, columns])

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
        !selectedRows.data || selectedRows.data.length > 1 || options.buttons.hideEdit ? null :
          <IconButton onClick={() => clickEdit(selectedRows, displayData, setSelectedRows)} aria-label="edit">
            <EditIcon />
          </IconButton>
      }
      {!options.buttons.hideDelete ?
        <IconButton onClick={() => clickDelete(selectedRows, displayData, setSelectedRows)} aria-label="delete">
          <DeleteIcon />
        </IconButton> : null}

      {
        options.buttons.customButtons.length <= 0 ? null :
          options.buttons.customButtons.map(but => {

            if (!but.multiple && selectedRows.data.length > 1)
              return null;

            return <IconButton key={`icon${but.title}`} onClick={but.action} aria-label={but.title}>
              {but.icon}
            </IconButton>
          })
      }


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
      <BConfirm open={confirmOpen} setOpen={setConfirmOpen} confirmAction={confirmDelete} title="Desea continuar?" body="Esta apunto de eliminar varios registros, esta seguro?" />
      
      <MUIDataTable
        title={!options.buttons.hideCreate ? <Button onClick={() => newRecord()} variant="contained"><i className="fa fa-plus"></i> &nbsp; Agregar</Button> : null}
        data={tableData}
        columns={columns}
        options={options}
      />
    </div>
  );
}

BTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['string', 'date', 'int', 'long', 'byte', 'list']).isRequired,
      required: PropTypes.bool,
      defaultValue: PropTypes.string,
      options: PropTypes.shape({
        filter: PropTypes.bool,
        sort: PropTypes.bool,
      }),
      data: requiredIf(
        PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired
          })
        ),
        props => props.type === 'list'
      ),
    })
  ),

  data: PropTypes.arrayOf(
    PropTypes.object.isRequired
  ),

  options: PropTypes.shape({
    module: PropTypes.string.isRequired
  })
}

export default BTable;