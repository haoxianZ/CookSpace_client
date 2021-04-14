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
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,

  },
  nested: {
    paddingLeft: theme.spacing(4),
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
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [voiceCommand, setVoiceCommand] = useState(false);
  const handleVoiceCommand=()=>{
    if(!voiceCommand) SpeechRecognition.startListening({continuous:true})
    else SpeechRecognition.stopListening() 
    setVoiceCommand(!voiceCommand)
  }
  const event= props.event;
  let instructions;
  let renderInstructions=[];
  if(event){
    instructions=event.event_recipe_id.analyzedInstructions[0].steps;
    renderInstructions=instructions.map(step=>
    step.step
  )
  }
  
  const maxSteps = renderInstructions.length;

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

    return (
      <div>
        {/* let user click to start voice command */}
      
      <div className={classes.root}>
        <div className="instructions">
          <Tooltip title={voiceCommand?"Disable Voice Command":"Enable Voice Command"}>

<button onClick={handleVoiceCommand}><RecordVoiceOverIcon/> </button>

</Tooltip>
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Instructions" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
        
<SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        autoPlay={false}
      >
        
        {renderInstructions.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <p>{renderInstructions[activeStep]?renderInstructions[activeStep]:null}</p>
              
            ) : null}
          </div>
        ))}
      </SwipeableViews>

          </ListItem>
        </List>
      </Collapse>
        
      </div>

      
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        nextButton={activeStep===maxSteps-1?(
          <Link to={`/users/${props.user_id}/review/${event.id}`}><Button size="small" >
            Finish
          </Button>
          </Link>
          
        ):(
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>)
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