import React from 'react';
import BPDF from '../../../components/bpdf';

const Polizas = () => {
  return(
    <React.Fragment>
      <h1>Polizas</h1>
      <hr />

      <BPDF url={'https://arxiv.org/pdf/quant-ph/0410100.pdf'} />
    </React.Fragment>
  );
}

export default Polizas;