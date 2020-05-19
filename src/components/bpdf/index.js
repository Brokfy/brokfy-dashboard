import React, { useState, useEffect } from 'react';
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

  const onLoaded = (args) => {
    setLoading(false);
    setPages(args);
    if( onDocumentComplete ) {
      onDocumentComplete();
    }
  }

  useEffect(() => {
    setLoading(true);
  }, [scale])

  return (
    <div>
      <div className="pdf-container MuiPaper-root MuiPaper-elevation1 MuiPaper-rounded">
        <div className="pdf-container-scroll" style={{overflow:'auto',height:"100%*(140/620)", minHeight: "757px", maxHeight: "757px"}}>
          { loading ? <div style={{position: "relative", marginTop: 0}}><BLoading /></div> : null }
          { scale === 0 ? 
              <RenderPDF key={1}
                page={page}
                scale={0.9}
                onLoaded={onLoaded}
                url={url}
              /> :
              scale === 1 ? 
                <RenderPDF key={2}
                  page={page}
                  scale={1.5}
                  onLoaded={onLoaded}
                  url={url}
                /> :
                scale === 2 ? 
                  <RenderPDF key={3}
                    page={page}
                    scale={2}
                    onLoaded={onLoaded}
                    url={url}
                  /> :
              null }
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