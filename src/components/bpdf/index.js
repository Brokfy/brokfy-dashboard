import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import BPDFControls from './bpdfcontrols';
import BLoading from '../bloading';
import RenderPDF from './render_pdf';
import './styles.css';

const BPDF = ({url, onDocumentComplete}) => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [scale, setScale] = useState(0);
  const [realScale, setRealScale] = useState(0.9);
  const [render, setRender] = useState(0);

  const onLoaded = (args) => {
    setLoading(false);
    setPages(args);
    if( onDocumentComplete ) {
      onDocumentComplete();
    }
  }

  const incrementRender = useCallback(() => {
    setRender(render => render + 1);
  }, []);

  const updateRealScale = useCallback((newScale) => {
    setRealScale(newScale);
  }, []);

  useEffect(() => {
    setLoading(true);
    incrementRender();

    let newScale = 0.9;
    switch (scale) {
      case 0: newScale = 0.9;
        break;
      case 1: newScale = 1.5;
        break;
      case 2: newScale = 2.0;
        break;
      default: newScale = 0.9;
    }

    updateRealScale(newScale);
  }, [scale, incrementRender, updateRealScale]);


  return (
    <div>
      <div className="pdf-container MuiPaper-root MuiPaper-elevation1 MuiPaper-rounded">
        <div className="pdf-container-scroll" style={{overflow:'auto',height:"100%*(140/620)", minHeight: "757px", maxHeight: "757px"}}>
          { loading ? <div style={{position: "relative", marginTop: 0}}><BLoading /></div> : null }
          <RenderPDF key={render}
            page={page}
            scale={realScale}
            onLoaded={onLoaded}
            url={url}
          />
        </div>
        { !loading ? <BPDFControls 
          page={page} 
          setPage={setPage} 
          pages={pages} 
          scale={scale} setScale={setScale} 
        /> : null}
      </div>
    </div>
  );
}



BPDF.propTypes = {
  url: PropTypes.string.isRequired,
  onDocumentComplete: PropTypes.func
}

export default BPDF;