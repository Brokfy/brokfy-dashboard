import React from 'react';

const Wrapper = Component => props => {
    return (
        <div className="wrapper wrapper-content animated fadeInRight">
            <Component {...props } />
        </div>
    );
};

export default Wrapper;