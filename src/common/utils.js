import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import NumberFormat from 'react-number-format';

const inputParsers = {
  text(input) {
    return input;
  },
  number(input) {
    return parseFloat(input);
  },
  date(input) {
    return input;
  },
  email(input) {
    return input;
  },
  url(input) {
    return input;
  },
  hidden(input) {
    return input;
  },
  checkbox(input) {
    return input;
  }
};

const getFormData = (form) => {
  let data = {};

  for (const [index, input] of Array.from(form).entries()) {
    const { name, value, type, checked } = input;
    if (type === "text" || type === "number" || type === "date" || type === "email" || type === "url" || type === "hidden" || type === "checkbox") {
      let parser = inputParsers[type];

      data = {
        ...data,
        [name]: parser(type !== "checkbox" ? value : checked)
      }
    }
  }
  return data;
}

const getCRUDConfig = (
  name,
  updateFn = () => { }, updatePending = false, updateError = '', updateNotify = false,
  insertFn = () => { }, insertPending = false, insertError = '', insertNotify = false,
  deleteFn = () => { }, deletePending = false, deleteError = '', deleteNotify = false,
) => {
  return {
    module: name,
    buttons: {
      hideCreate: false,
      hideEdit: false,
      hideDelete: false,
      customButtons: []
    },
    actions: {
      PUT: {
        action: updateFn,
        pending: updatePending,
        error: updateError,
        display: updateNotify &&
          (updatePending === false ?
            (updateError !== null ?
              updateError :
              "Registro actualizado exitosamente")
            : "") !== "",
        message: updatePending === false ?
          (updateError !== null ?
            updateError :
            "Registro actualizado exitosamente")
          : ""
      },
      POST: {
        action: insertFn,
        pending: insertPending,
        error: insertError,
        display: insertNotify && (insertPending === false ?
          (insertError !== null ?
            insertError :
            "Registro ingresado exitosamente")
          : "") !== "",
        message: insertPending === false ?
          (insertError !== null ?
            insertError :
            "Registro ingresado exitosamente")
          : ""
      },
      DELETE: {
        action: deleteFn,
        pending: deletePending,
        error: deleteError,
        display: deleteNotify && (deletePending === false ?
          (deleteError !== null ?
            deleteError :
            "Registro eliminado exitosamente")
          : "") !== "",
        message: deletePending === false ?
          (deleteError !== null ?
            deleteError :
            "Registro eliminado exitosamente")
          : ""
      }
    }
  }
};


const nowrapColumn = {
  setCellHeaderProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
  setCellProps: (value) => ({ style: { whiteSpace: 'nowrap' } }),
}

const checkboxRender = (controlName, value, tableMeta, updateValue) => {
  var bl_value = null;

  if (value === null) {
    bl_value = false;
  }

  if (typeof value === "boolean" && bl_value === null) {
    bl_value = value;
  }

  if (typeof value === "string" && bl_value === null) {
    bl_value = value.trim().length === 0 || (value.trim().length === 2 && value === "No") ? false : true;
  }

  if (bl_value === null) {
    bl_value = false;
  }

  return (
    <FormControlLabel
      label={bl_value ? "Si" : "No"}
      value={bl_value ? "Si" : "No"}
      control={
        <Checkbox checked={bl_value} value={bl_value ? "Si" : "No"} onChange={(event) => { event.preventDefault(); }} name={controlName} data={`${value}`} />
      }
      onChange={event => event.preventDefault()}
    />
  );
}

const NumberFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

const getDateFormated = (fecha = null) => {
  let dateNow = new Date();

  if (fecha !== null) {
    dateNow = new Date(fecha);
  }

  const year = dateNow.getFullYear();
  const month_int = dateNow.getMonth() + 1;
  const month = month_int.toString().length < 2 ? `0${month_int}` : month_int;
  const date = dateNow.getDate().toString().length < 2 ? `0${dateNow.getDate()}` : dateNow.getDate();
  const materialDateInput = `${year}-${month}-${date}`;

  return materialDateInput;
}

const getEstadoPolizaLabel = (idEstadoPoliza) => {
  let estadoPoliza = '';
  switch (idEstadoPoliza) {
    case 1: estadoPoliza = 'ACTIVA';
      break;
    case 2: estadoPoliza = 'CANCELADA';
      break;
    case 3: estadoPoliza = 'SINIESTRO';
      break;
    default: estadoPoliza = '';
  }
  return estadoPoliza
}

const formatMoney = (amount, decimalCount = 2, decimal = ".", thousands = ",") => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
  } catch (e) {
    return amount;
  }
};

const listEstadoPoliza =
  [
    { value: 1, text: 'ACTIVA' },
    { value: 2, text: 'CANCELADA' },
    { value: 3, text: 'SINIESTRO' },
  ];


export {
  inputParsers,
  getFormData,
  getCRUDConfig,
  nowrapColumn,
  checkboxRender,
  NumberFormatCustom,
  getDateFormated,
  getEstadoPolizaLabel,
  formatMoney,
  listEstadoPoliza
}