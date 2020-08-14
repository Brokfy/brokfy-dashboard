import React, { useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Modal, Slide } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import BInput from '../binput'
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { getFormData } from '../../common/utils';

import { useGetToken } from '../../features/common/redux/hooks';

const BModal = (props) => {
    const [fechaFinInput, handleFechaFinInput] = useState(null);
    const [errors, setErrors] = useState({});
    const { auth } = useGetToken();
    const form = useRef();

    const getForm = () => form.current;

    // console.log(props)

    const getModalStyle = () => {
        const top = 5;
        const left = 25;

        return {
            top: `${top}%`,
            margin: 'auto',
            left: `${left}%`,
            transform: `translate(-${top}%, -${left}%)`,
            height: `80%`,
            overflow: 'hidden',
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

    const SubmitForm = (event) => {
        event.preventDefault();
        const form = getForm();
        const data = getFormData(form);

        // Validar
        const columnsRequired = Object.assign({}, ...props.columns.filter(i => i.required && data[i.name] === "").map(i => { return { [i.name]: "Campo requerido" } }));
        setErrors(columnsRequired);

        if( Object.keys(columnsRequired).length > 0 ) {
            return;
        }

        // Grabar
        if( props.isEditing ) {
            props.update.action({
                data,
                token: auth.tokenFirebase
            });
        } else {
            props.insert.action({
                data,
                token: auth.tokenFirebase
            });
        }
    }

    

    const classes = useStyles();
    const body = (
        <Slide direction="up" in={props.open} mountOnEnter unmountOnExit>
            <div style={getModalStyle()} className={classes.paper}>
                <h2 id="simple-modal-title">{!props.isEditing ? "Nuevo registro" : "Editar registro"}</h2>
                <p>Llene el siguiente formulario antes de continuar.</p>
                <hr />
                <form ref={form} onSubmit={(event) => SubmitForm(event)} id="simple-modal-description" className={classes.root} noValidate autoComplete="off" style={{ overflowX: 'hidden', overflowY: 'auto', height: 'calc(80% - (50px))' }}>
                    <Grid container spacing={3}>
                        {!props.columns || props.columns.length <= 0 ?
                            null : props.columns.map((col, index) => 
                                <Grid key={`grid_${index}_${col.name}`} item xs={4} hidden={col.visible !== true}>
                                    <BInput key={`col_${index}_${col.name}`} {...col} editValue={!props.data || props.data.length <= 0 ? null : props.data.filter(x => x.name === col.name)[0].value} error={errors[col.name] !== undefined && errors[col.name] !== null && errors[col.name] !== ""} errorMessage={errors[col.name]} />
                                </Grid>
                            )}
                    </Grid>
                </form>
                <hr />
                <Button color="primary" onClick={SubmitForm} disabled={props.update.pending || props.insert.pending}>
                    { props.update.pending ? <i className="fa fa-refresh fa-spin"></i> : null }
                    {
                        props.update.pending || props.insert.pending ? <span>&nbsp;&nbsp;Guardando...</span> :
                        !props.isEditing ? 
                            "Guardar" : 
                            "Actualizar"
                    }
                </Button>
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
            type: PropTypes.oneOf(['string', 'date', 'int', 'list', 'long', 'currency', 'tel']).isRequired,
            required: PropTypes.bool,
            defaultValue: PropTypes.string,
            options: PropTypes.shape({
                filter: PropTypes.bool,
                sort: PropTypes.bool,
            }),
            data: requiredIf(
                PropTypes.arrayOf(
                    PropTypes.shape({
                        text: PropTypes.any.isRequired,
                        value: PropTypes.any.isRequired
                    })
                ),
                props => props.type === 'list'
            ),
        })
    ),

    data: PropTypes.arrayOf(
        PropTypes.object.isRequired
    ),

    update: PropTypes.shape({
        action: PropTypes.func,
        pending: PropTypes.bool,
        error: PropTypes.string,
        display: PropTypes.bool,
        message: PropTypes.string
    }),

    insert: PropTypes.shape({
        action: PropTypes.func,
        pending: PropTypes.bool,
        error: PropTypes.string,
        display: PropTypes.bool,
        message: PropTypes.string
    }),
}

export default BModal;