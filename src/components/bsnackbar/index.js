import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const BSnackbars = (props) => {
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.dismiss({dismiss: true})
  };

  return (
    <div className={classes.root}>
      <Snackbar open={props.display} autoHideDuration={props.duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

BSnackbars.defaultProps = {
    severity: "info",
    duration: 2000,
    message: "informacion",
    display: true
}

BSnackbars.propTypes = {
    severity: PropTypes.oneOf(["error", "warning", "info", "success"]),
    duration: PropTypes.number,
    display: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    dismiss: PropTypes.func,
}

export default BSnackbars;