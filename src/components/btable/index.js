import React, { useState, useEffect } from 'react';
import MUIDataTable from 'mui-datatables';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BModal from '../../components/bmodal';
import BConfirm from '../../components/bconfirm';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import './styles.css';
import BSnackbars from '../bsnackbar';
import { formatMoney } from '../../common/utils';

const BTable = (props) => {
  let { columns, data, options, isLoading, refreshData, token } = props;  

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [dataDelete, setDataDelete] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const columnList = columns.filter(item => item.type === 'list').map(item => {
      return { name: item.name, data: item.data };
    });
    const columnListName = columnList.map(item => item.name);

    setTableData(data.map((row) => {
      return Object.keys(row).map(key => {
        let descrip = columnList.filter(item => item.name === key).map(item => item.data.filter(d => d.value === row[key]).map(i => i.text))[0];
        let typeLong = columns.filter(item => item.name === key && item.type === "long").length > 0;
        let typeCurrency = columns.filter(item => item.name === key && item.type === "currency").length > 0;

        const tryFormatMoney = (valor) => {
          var resultado = "";
          try {
            resultado = formatMoney(parseFloat(valor).toFixed(2));
          } catch {
            resultado = "";
          }
          return resultado;
        }

        return columnListName.includes(key) ? 
          descrip[0] : 
            typeLong ? row[key].toFixed(2)  :
            typeCurrency ? tryFormatMoney(row[key])
              : row[key];
      });
    }));

    if( !options.actions.PUT.pending && !options.actions.POST.pending && !options.actions.DELETE.pending ){
      setModalOpen(false);
    }
  }, [data, columns, isLoading, options.actions.POST.display, options.actions.PUT.display, options.actions.DELETE.display, options.actions.PUT.pending, options.actions.POST.pending, options.actions.DELETE.pending])

  const clickEdit = (selectedRows, displayData, setSelectedRows) => {
    // console.log(selectedRows, displayData, setSelectedRows);
    setDataEdit(!selectedRows.data || selectedRows.data.length <= 0 || displayData.length <= 0 ? null :
      displayData.filter((x, i) => i === selectedRows.data[0].index)[0].data.map((m, im) => { return { name: columns[im].name, value: m } }));
    setModalOpen(true);
    setIsEditing(true);
  }

  const clickDelete = (selectedRows, displayData, setSelectedRows) => {
    if( selectedRows.data || selectedRows.data.length > 0 ) {      
      const columnId = columns.map((item, index) => item.options.display === false ? index : null).filter(item => item !== null)[0];
      const columnName = columns[columnId].name;

      let data = selectedRows.data.map(item => {
        return { [columnName]: displayData[item.index].data[columnId] };
      });

      setDataDelete(data);
    }

    setConfirmOpen(true);
  }

  const confirmDelete = (args) => {
    setConfirmOpen(false);
    options.actions.DELETE.action({data: dataDelete, token: token});
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

            return <IconButton key={`icon${but.title}`} onClick={(e) => {but.action(selectedRows, displayData, setSelectedRows);} } aria-label={but.title}>
              {but.icon}
            </IconButton>
          })
      }


    </div>)
  }

  const newRecord = () => {
    setIsEditing(false);
    setDataEdit(null);
    setModalOpen(true);
  }

  options = {
    ...options,
    filterType: "dropdown",
    responsive: "scroll",
    selectableRows: options.selectableRows ? options.selectableRows : "multiple",
    //selectableRowsHeader: false,
    customToolbarSelect,
    textLabels: {
      body: {
          noMatch: 'Sorry, there is no matching data to display'
      },
    },
  };

  return (
    <div>
      <BModal open={modalOpen} setOpen={setModalOpen} columns={columns} data={dataEdit} isEditing={isEditing} module={options.module} refreshData={() => {
        setModalOpen(false);
        refreshData();
      }} update={options.actions.PUT} insert={options.actions.POST} />
      <BConfirm open={confirmOpen} setOpen={setConfirmOpen} confirmAction={confirmDelete} title="Desea continuar?" body="Esta apunto de eliminar varios registros, esta seguro?" />
      
      {/* <div className="btable-loading">
        <BLoading display={isLoading} />
      </div> */}

      {
        !isLoading ? 
          <MUIDataTable
            title={!options.buttons.hideCreate ? <Button onClick={() => newRecord()} variant="contained"><i className="fa fa-plus"></i> &nbsp; Agregar</Button> : null}
            data={tableData}
            columns={columns}
            options={options}
          /> : 
          null
      }

      {/* snackbar PUT */}
      <BSnackbars 
          severity={ options.actions.PUT.error !== null ? "error" : "success" }
          display={ options.actions.PUT.display }
          message={ options.actions.PUT.message }
          dismiss={ options.actions.PUT.action }
      />
      {/* snackbar POST */}
      <BSnackbars 
          severity={ options.actions.POST.error !== null ? "error" : "success" }
          display={ options.actions.POST.display }
          message={ options.actions.POST.message }
          dismiss={ options.actions.POST.action }
      />
      {/* snackbar DELETE */}
      <BSnackbars 
          severity={ options.actions.DELETE.error !== null ? "error" : "success" }
          display={ options.actions.DELETE.display }
          message={ options.actions.DELETE.message }
          dismiss={ options.actions.DELETE.action }
      />
    </div>
  );
}

BTable.defaultProps = {
  isLoading: false
}

const accionesProps = PropTypes.shape({ 
  action: PropTypes.func,
  pending: PropTypes.bool,
  error: PropTypes.string,
  display: PropTypes.bool,
  message: PropTypes.string
});

BTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['string', 'date', 'int', 'long', 'byte', 'list', 'currency', 'tel']).isRequired,
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
            value: PropTypes.any.isRequired
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
    module: PropTypes.string.isRequired,
    buttons: PropTypes.shape({
      hideCreate: PropTypes.bool,
      hideEdit: PropTypes.bool,
      hideDelete: PropTypes.bool,
      customButtons: PropTypes.array
    }),
    actions: PropTypes.shape({
      PUT: accionesProps,
      POST: accionesProps,
      DELETE: accionesProps,
    })
  }),

  // isLoading: PropTypes.bool,

  refreshData: PropTypes.func,

  token: PropTypes.string,
}

export default BTable;