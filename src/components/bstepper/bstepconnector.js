
import { withStyles, StepConnector } from "@material-ui/core";

const BStepConnector = withStyles(theme => ({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            background: '#6097ef'
        },
    },
    completed: {
        '& $line': {
            background: '#3fadb5'
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
}))(StepConnector);

export default BStepConnector;