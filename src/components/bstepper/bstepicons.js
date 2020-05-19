import React from "react";
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
    Check
} from '@material-ui/icons';


const style = makeStyles(theme => ({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        background: '#6097ef',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        background: '#3fadb5'
    },
}));

const BStepIcons = props => {
    const classes = style();
    const { active, completed } = props;

    return <div
        className={clsx(classes.root, {
            [classes.active]: active,
            [classes.completed]: completed,
        })}
    >
        {completed ? <Check /> : String(props.icon)}
    </div>
}

BStepIcons.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
};

export default BStepIcons;