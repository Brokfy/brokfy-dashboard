import React from 'react';
import { PDFReader } from 'reactjs-pdf-reader';

const RenderPDF = ({url, onLoaded, page, scale}) => {
    return (
        <PDFReader
            url={url} 
            onDocumentComplete={(args) => {
                onLoaded(args);
            }} 
            width={"700"}   
            page={page}
            scale={scale}
        />
    );
}

export default RenderPDF;