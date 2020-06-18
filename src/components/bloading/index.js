import React from 'react';
import PropTypes from 'prop-types';
import { FoldingCube } from 'styled-spinkit';
import './styles.css';

const BLoading = ({ mensaje, secundario }) => {
  if( secundario ) {
    return (
      <div className="bloading-container-secundario">
        <FoldingCube color={"#6097EF"} size={36}/>
        <div className="bloading-mensaje">{mensaje}</div>
      </div>
    );
  }
  return (
    <div className="bloading-container">
      <FoldingCube color={"#6097EF"} size={64}/>
      <div className="bloading-mensaje">{mensaje}</div>
    </div>
  );
}

BLoading.defaultProps = {
  mensaje: 'Cargando...'
}

BLoading.propTypes = {
  mensaje: PropTypes.string
}

export default BLoading;