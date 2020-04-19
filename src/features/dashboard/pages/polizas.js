import React from 'react';
import { useParams } from 'react-router-dom';
import BPDF from '../../../components/bpdf';

const Polizas = () => {
  let { tipo } = useParams();
  return(
    <React.Fragment>
      <h1>Polizas {tipo} </h1>
      <hr />
      
      <BPDF url={'https://arxiv.org/pdf/quant-ph/0410100.pdf'} />
    </React.Fragment>
  );
}

export default Polizas;