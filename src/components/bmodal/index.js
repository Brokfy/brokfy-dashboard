import React from 'react';
import { Button, Input, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';

const BModal = (props) => {
    const [modalStyle] = React.useState(getModalStyle);
    
    const rand = () => {
        return Math.round(Math.random() * 20) - 10;
    }

    const getModalStyle = () => {
        const top = 50 + rand();
        const left = 50 + rand();

        return {
            top: `${top}%`,
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 800,
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(2, 4, 3),
            
        },
    }));

    const classes = useStyles();
    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
            <BModal />
        </div>
    );

    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className='bmodal'
        >
            {body}
        </Modal>
    )
}

export default BModal;