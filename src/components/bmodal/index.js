import React from 'react';
import { Button, Modal, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import BInput from '../binput'
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

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
            width: theme.spacing(120),
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4),
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
                        null : props.columns.map((col, index) => <BInput key={`col_${index}_${col.name}`} {...col} editValue={!props.data || props.data.length <= 0 ? null : props.data.filter(x => x.name === col.name)[0].value} />)}
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

BModal.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['string', 'date', 'int', 'list']).isRequired,
            required: PropTypes.bool,
            defaultValue: PropTypes.string,
            options: PropTypes.shape({
                filter: PropTypes.bool,
                sort: PropTypes.bool,
            }),
            data: requiredIf(
                PropTypes.arrayOf(
                    PropTypes.shape({
                        text: PropTypes.string.isRequired, 
                        value: PropTypes.number.isRequired
                    })
                ),
                props => props.type === 'list'
            ),
        })
    ),

    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ),
}

export default BModal;