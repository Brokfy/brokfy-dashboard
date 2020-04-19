import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';

const BLoading = ({display, size, thickness, color}) => {

  const ColorCircularProgress = withStyles({
    root: {
      color: color,
    },
  })(CircularProgress);

  if( display )
    return (
      <ColorCircularProgress className="bloading" size={size} thickness={thickness} />
    );

  return null;
}

BLoading.defaultProps = {
  display: false,
  size: 30,
  thickness: 5,
  color: "#6097EF"
}

BLoading.propTypes = {
  display: PropTypes.bool.isRequired,
  size: PropTypes.number,
  thickness: PropTypes.number,
  color: PropTypes.string
}

export default BLoading;