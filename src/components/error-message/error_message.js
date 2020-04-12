import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({mensaje, classes = "alert alert-danger error"}) => {

    switch (mensaje) {
        case "Bad credentials":
            mensaje = "Usuario o contraseña incorrectos"
            break;
        default:
            break;
    }

    return (
        <p className={classes}>
            {mensaje}
        </p>
    );
}

ErrorMessage.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default ErrorMessage;