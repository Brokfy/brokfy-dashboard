import React from 'react';
import { Button, Modal, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import BInput from '../binput'

const BModal = (props) => {

    const getModalStyle = () => {
        const top = 5;
        const left = 25;

        return {
            top: `${top}%`,
            margin: 'auto',
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: theme.spacing.unit * 120,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing.unit * 4,
        },
    }));

    const classes = useStyles();
    const body = (
        <Slide direction="up" in={props.open} mountOnEnter unmountOnExit>
            <div style={getModalStyle()} className={classes.paper}>
                <h2 id="simple-modal-title">{!props.data ? "Nuevo registro" : "Editar registro"}</h2>
                <p>Llene el siguiente formulario y presione el boton Continuar.</p>
                <hr />
                <form id="simple-modal-description" className={classes.root} noValidate autoComplete="off">
                    {!props.columns || props.columns.length <= 0 ?
                        null : props.columns.map(col => <BInput key={`col_${col.name}`} {...col} editValue={!props.data || props.data.length <= 0 ? null : props.data.filter(x => x.name === col.name)[0].value} />)}
                    <hr />
                    <Button color="primary">Continuar</Button>
                </form>
            </div>
        </Slide>
    );

    return (
        <Modal
            open={props.open}
            onClose={() => props.setOpen(false)}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    )
}

export default BModal;