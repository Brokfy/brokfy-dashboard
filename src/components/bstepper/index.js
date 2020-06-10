import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
} from '@material-ui/core';
import BStepIcons from "./bstepicons";
import BStepConnector from './bstepconnector';
import './styles.css';

const style = makeStyles(theme => ({
  mainBox: {
    position: "relative",
    padding: "10px 20px",
    borderBottomRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    background: theme.palette.background.default,
    border: "solid 2px #efefef",
    WebkitBoxShadow: "2px 2px 5px 0px rgba(205,205,205,0.75)",
    MozBoxShadow: "2px 2px 5px 0px rgba(205,205,205,0.75)",
    boxShadow: "2px 2px 5px 0px rgba(205,205,205,0.75)",
  },
  stepper: {
      height: "calc(10vh - 0px)",
      minHeight: "55px"
  },
  button: {
    marginRight: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%"
  },
  botonera: {
    marginBottom: '16px',
  },
  formContainer: {
    minHeight: "150px", 
    maxHeight: "650px", 
    marginTop: "10px", 
    marginBottom: "8px",
  },
}));

const BStepper = (props) => {
  const classes = style();
  // const [activeStep, setActiveStep] = useState(0);
  const form = useRef();

  const getForm = () => form.current;

  const handleNext = (evt) => {
    const response = props.stepContent[props.activeStep].handleSubmit(getForm());
    if( response ) {
      props.setActiveStep(props.activeStep + 1)
    }
  };
  const handleBack = () => props.setActiveStep(props.activeStep - 1);
  
  const StepContent = ({ step }) => {
    return (
      <div style={{ padding: '20px 40px', width: '100%' }}>
        {props.stepContent[step].renderView}
      </div>
    );
  }

  return (
    <div>
      <Stepper alternativeLabel className={classes.stepper} connector={<BStepConnector />} activeStep={props.activeStep}>
        {
          props.stepContent.map(e => 
            <Step key={e}>
              <StepLabel StepIconComponent={BStepIcons}/>
            </Step>
          )
        }
      </Stepper>
      <Box className={classes.mainBox}>
        <Grid container spacing={3} direction="column" justify="space-around" alignItems="center" className={classes.formContainer}>
          <form className={classes.form} ref={form} autoComplete="off">
            <Grid container spacing={3}>
              <StepContent step={props.activeStep} />
              {
                props.activeStep <= props.stepContent.length - 1 ?
                  <Grid container item justify="flex-end" className={classes.botonera}>
                    <Button disabled={props.activeStep === 0} className={classes.button} onClick={handleBack}>
                      Anterior
                    </Button>
                    <Button variant="contained" color="primary" className={classes.button} onClick={handleNext} disabled={!props.stepContent[props.activeStep].canSubmit}>
                      {props.activeStep === props.stepContent.length - 1 ? props.labelAction : 'Siguiente'}
                    </Button>
                  </Grid> :
                  null
              }
            </Grid>
          </form>
        </Grid>
      </Box>
    </div>
  );
}

BStepper.defaultProps = {
  stepContent: [<></>],
  labelAction: 'Finalizar',
  submitAction: () => {},  
}

BStepper.propTypes = {
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  stepContent: PropTypes.arrayOf(
    PropTypes.shape({
      handleSubmit: PropTypes.func.isRequired, 
      canSubmit: PropTypes.bool.isRequired,
      renderView: PropTypes.any.isRequired
    })
  ),
  labelAction: PropTypes.string.isRequired,
}

export default BStepper;