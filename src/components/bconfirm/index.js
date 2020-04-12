import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const BConfirm = (props) => {

    return (
        <Dialog
            open={props.open}
            onClose={() => props.setConfirmOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.body}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setConfirmOpen(false)} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => props.confirmAction()} color="primary" autoFocus>
                    Continuar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default BConfirm;