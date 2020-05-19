import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './styles.css';

const BPDFControls = ({page, setPage, pages
  , scale, setScale
}) => {
  const [pagina, setPagina] = useState(page);

  const cambiarPagina = event => {
    const valor = event.target.value;
    try {
      const valor_int = parseInt(valor);
      if( valor_int < 0 || valor_int > pages ) {
        event.target.value = page;
      } else {
        setPage(valor_int);
      }
    } catch {
      event.target.value = page;
    }
  }

  return (
    <React.Fragment>

      <div className="text-center pdf-toolbar" style={{marginTop: "10px"}}>
        <div className="btn-group">
          <button id="prev" className="btn btn-white" onClick={() => {
              setPage(page - 1); setPagina(page - 1);
            }} disabled={page === 1}>
            <i className="fa fa-long-arrow-left"></i> <span className="d-none d-sm-inline">Previous</span>
          </button>
          <button id="next" className="btn btn-white" onClick={() => {
              setPage(page + 1); setPagina(page + 1);
            }} disabled={page === pages}>
            <i className="fa fa-long-arrow-right"></i> <span className="d-none d-sm-inline">Next</span>
          </button>
          <button id="zoomin" className="btn btn-white" onClick={() => setScale(scale + 1)} disabled={scale === 2}>
            <i className="fa fa-search-plus"></i> <span className="d-none d-sm-inline">Zoom In</span>
          </button>
          <button id="zoomout" className="btn btn-white" onClick={() => setScale(scale - 1)} disabled={scale === 0}>
            <i className="fa fa-search-minus"></i> <span className="d-none d-sm-inline">Zoom Out</span>
          </button>
          <button id="zoomfit" className="btn btn-white" onClick={() => setScale(0)}> 100%</button>
          <span className="btn btn-white hidden-xs">Page: </span>

          <div className="input-group">
            <input type="number" min={0} max={pages} className="form-control" id="page_num" 
              value={pagina}
              onChange={event => setPagina(parseInt(event.target.value))}
              onBlur={cambiarPagina}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  cambiarPagina(event);
                }
              }}
              onKeyPress={event => {
                
              }}/>
            <div className="input-group-append">
              <button type="button" className="btn btn-white" id="page_count" onClick={() => {
                setPage(pages); setPagina(pages);
              }}>/ {pages}</button>
            </div>
          </div>

        </div>
      </div>
    </React.Fragment>
  );
}

BPDFControls.propTypes = {
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  pages: PropTypes.number.isRequired,
  scale: PropTypes.number.isRequired,
  setScale: PropTypes.func.isRequired,
}

export default BPDFControls;