import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { PDFReader } from 'reactjs-pdf-reader';
import BPDFControls from './bpdfcontrols';
import BPDFLoading from './bpdfloading';
import './styles.css';

const BPDF = ({url, onDocumentComplete}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  // const [scale, setScale] = useState(0);

  const onLoaded = (args) => {
    setLoading(false);
    setPages(args);
    if( onDocumentComplete ) {
      onDocumentComplete();
    }
  }

  return (
    <div>
      <div className="pdf-container">
        { loading ? <BPDFLoading /> : null }
        {/* <div style={{overflow:'auto',height:720}}> */}
          <PDFReader 
            url={url} 
            onDocumentComplete={onLoaded} 
            width={"560"}
            page={page}
            // scale={scale}
          />
        {/* </div> */}
        <BPDFControls 
          page={page} 
          setPage={setPage} 
          pages={pages} 
          // scale={scale} setScale={setScale} 
        />
      </div>
    </div>
  );
}

BPDF.propTypes = {
  url: PropTypes.string.isRequired,
  onDocumentComplete: PropTypes.func
}

export default BPDF;