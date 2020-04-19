import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import './styles.css';

const ColorCircularProgress = withStyles({
  root: {
    color: '#6097EF',
  },
})(CircularProgress);

const BPDFLoading = (props) => {
  return (
    <ColorCircularProgress className="pdf-loading" size={30} thickness={5} />
  );
}

export default BPDFLoading;