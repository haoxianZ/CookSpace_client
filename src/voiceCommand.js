import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';




const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
}));

export default function VoiceControl(props){
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const event= props.event;
  let instructions;
  let tutorialSteps=[];
  if(event){
    instructions=event.event_recipe_id.analyzedInstructions[0].steps;
    tutorialSteps=instructions.map(step=>
    step.step
  )
  }
  
  const maxSteps = tutorialSteps.length;

  console.log(event)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
    const [message, setMessage] = useState('')
    const commands = [
      {
        command: 'next',
        callback: () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
      },
      {
        command: 'back',
        callback: () => setActiveStep((prevActiveStep) => prevActiveStep - 1)
      },
  
    ]
  
    const { transcript, resetTranscript } = useSpeechRecognition({commands})
  
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }
    SpeechRecognition.startListening({ continuous: true })

    return (
      <div>
        <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        {/* <Typography>{tutorialSteps[activeStep]?tutorialSteps[activeStep]:null}</Typography> */}
      </Paper>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        autoPlay={false}
      >
        
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <p>{tutorialSteps[activeStep]?tutorialSteps[activeStep]:null}</p>
              
            ) : null}
          </div>
        ))}
      </SwipeableViews>

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </div>

        <h4>rubbish</h4>
        <p>{transcript}</p>
      </div>
    )

}