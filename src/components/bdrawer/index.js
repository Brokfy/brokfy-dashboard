import React from 'react';
import Drawer from '@material-ui/core/Drawer';

const BDrawer = ({ open, setOpen, body }) => {


    return (
        <Drawer
            anchor='right'
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
        >
            {body}
        </Drawer>
    );

}

export default BDrawer;