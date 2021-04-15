import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Header from './header'
import config from './config'
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['1', '2'];
}



export default function SignUp(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [confirmEmail, setConfirmEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [bio, setBio]=useState('');
  const [profilePic, setProfilePic]=useState('');
  const [cookingLevel, setCookingLevel]=useState('');


  const handleName = (e)=>{
    setName(e.target.value)
  }
    

  const handleEmail = (e)=>{
    setEmail(e.target.value)
  }
    

  const handleConfirmEmail = (e)=>{
    setConfirmEmail(e.target.value)
  }
    

  const handlePassword = (e)=>{
    setPassword(e.target.value)
  }
  const handleConfirmPassword = (e)=>{
    setConfirmPassword(e.target.value)
  }
  const handleBio = (e)=>{
    setBio(e.target.value)
  }
  const handleProfilePic = (e)=>{
    setProfilePic(e.target.value)
  }
  const handleCookingLevel = (e)=>{
    setCookingLevel(e.target.value)
  }
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            autoComplete="fname"
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="Username"
            autoFocus
            onChange={handleName}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleEmail}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="confirmEmail"
            label="Confirm Email Address"
            name="confirmEmail"
            autoComplete="email"
            onChange={handleConfirmEmail}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}

          />
        </Grid>            
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="confirmPassword"
            label="confirm your password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            onChange={handleConfirmPassword}

          />
        </Grid>
        </Grid>
      
      );
    case 1:
      return (
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="profilePic"
            variant="outlined"
            fullWidth
            id="profilePic"
            label="Profile Picture URL"
            autoFocus
            onChange={handleProfilePic}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            fullWidth
            id="cookingLevel"
            label="Cooking Level"
            name="cookingLevel"
            onChange={handleCookingLevel}

          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            id="bio"
            label="My bio"
            name="bio"
            onChange={handleBio}

          />
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Grid>
      );
 
    default:
      return 'Unknown stepIndex';
  }
}

  const handleNext = (e) => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSignUp=(e)=>{
    e.preventDefault()
        const newUser = {
          username: name,
         email: email,
         password: password,
         bio: bio,
         profile_pic: profilePic,
         cooking_level: cookingLevel,
        }
        if(confirmPassword!==newUser.password){
          alert('Passwords do not match!')
        }
        else if(confirmEmail!==newUser.email){
          alert('Passwords do not match!')
        }
        else{
          fetch(`${config.SERVER_ENDPOINT}/users`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newUser),
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(user => {
            props.history.push(`/`);
            window.location.reload(true);
            alert('You have signed up!')
            })
          .catch(error => {
            console.error({ error })
          })
        }
        
          
  }
  return (
    <Container component="main" maxWidth="xs">
      <Header/>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel/>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
          </div>
        ) : (
          <div>
            <div className={classes.instructions}>
              <form className={classes.form} noValidate >

              {getStepContent(activeStep)}
              </form>

              </div>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <div>
                 {activeStep === steps.length - 1 ? null : 
                 <Button variant="contained" color="primary" onClick={handleNext}>
                   Next
              </Button>}
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
          
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}