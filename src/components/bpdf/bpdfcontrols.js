import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import './styles.css';

const BPDFControls = ({page, setPage, pages
  // , scale, setScale
}) => {
  return (
    <React.Fragment>
      <div className="pdf-controls">
        <IconButton aria-label="back" component="span" onClick={() => setPage(page - 1)} disabled={page === 1}>
          <i className="fa fa-chevron-left"></i>
        </IconButton>
          <span className="pdf-pages-info">&nbsp;{page}&nbsp;/&nbsp;{pages}&nbsp;</span>
        <IconButton aria-label="next" component="span" onClick={() => setPage(page + 1)} disabled={page === pages}>
          <i className="fa fa-chevron-right"></i>
        </IconButton>      
      </div>

      {/* <div className="pdf-controls-zoom">
        <IconButton aria-label="back" component="span" onClick={() => setScale(scale - 1)} disabled={scale === 0}>
          <i className="fa fa-search-minus"></i>
        </IconButton>
        <span className="pdf-pages-info">&nbsp;x1&nbsp;</span>
        <IconButton aria-label="next" component="span" onClick={() => setScale(scale + 1)} disabled={scale === 10}>
          <i className="fa fa-search-plus"></i>
        </IconButton>      
      </div> */}
    </React.Fragment>
  );
}

BPDFControls.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  // scale: PropTypes.number.isRequired,
  // setScale: PropTypes.func.isRequired,
}

export default BPDFControls;