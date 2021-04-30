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
import Header from '../header';
import './signUp.css'
import config from '../config';
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
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width:'100%'
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
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function getSteps() {
  return ['1', '2','3'];
}



export default function SignUp(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [signUp, setSignUp] = useState(false);
  const [user_id, setUser_id] = useState(null);

  const steps = getSteps();
  const [name, setName]=useState('');
  const [email, setEmail]=useState('');
  const [confirmEmail, setConfirmEmail]=useState('');
  const [password, setPassword]=useState('');
  const [confirmPassword, setConfirmPassword]=useState('');
  const [bio, setBio]=useState('');
  const [profilePic, setProfilePic]=useState('');
  const [cookingLevel, setCookingLevel]=useState('');

  const [verification, setVerification]=useState(null);

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
    console.log('password', e.target.value)

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
  const handleVerificationCode=(e)=>{
    setVerification(e.target.value)
  }
  const handleVerify=(e)=>{
    e.preventDefault()
    console.log(verification, user_id)
     fetch(`${config.SERVER_ENDPOINT}/users/verify?user_id=${user_id}&code=${verification}`, {
          method: 'Get',
          headers: {
            'content-type': 'application/json'
          }
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(user => {
            props.history.push(`/users/${user.id}`);
            window.location.reload(true);
            alert('You have signed up!')
            })
          .catch(error => {
            console.error({ error })
          })
        
  }
function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
          <label htmlFor="username">Full Name *</label>
          <input type="text" id="username" placeholder="Joe Doe" onChange={handleName}
          required></input>

        </Grid>
        
        <Grid item xs={12}>
        <label htmlFor="email">Email *</label>
          <input type="email" id="email" placeholder="JoeDoe@abc.com"
          onChange={handleEmail}
          required></input>
        </Grid>
        {/* <Grid item xs={12}>
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
        </Grid> */}
        <Grid item xs={12}>
        <label htmlFor="password">Password *</label>
          <input type="password" id="password" placeholder="Password"
          onChange={handlePassword}
          required></input>

        </Grid>            
        <Grid item xs={12}>
        <label htmlFor="confirmPassword">Confirm Password *</label>
          <input type="password" id="confirmPassword" placeholder="Re-type Password"
          onChange={handleConfirmPassword}
          required></input>
          
        </Grid>
        </Grid>
      
      );
    case 1:
      return (
        <Grid container spacing={2} >
          <h5>Profile Picture</h5>
          <Avatar alt="username"className="signUpAvatar">{name?name[0].toUpperCase():null}</Avatar>
          <div className='profilePicUrl'>
            <label htmlFor="picture">URL of the Picture</label><br/>
          <input type="text" id="picture" placeholder="Change Profile Picture to your URL Image"
          onChange={handleProfilePic}
          required></input>
          </div>
          

        {/* <Grid item xs={12} sm={6}>
          <TextField
            name="profilePic"
            variant="outlined"
            fullWidth
            id="profilePic"
            label="Profile Picture URL"
            autoFocus
            onChange={handleProfilePic}
          />
        </Grid> */}
        <Grid item xs={12} sm={6}>
        <label htmlFor="cookingLevel">What is your cooking level? *</label>
          <input type="text" id="cookingLevel" placeholder="'Beginner', 'Intermediate','Advance'"
          onChange={handleCookingLevel}
          required></input>
          {/* <TextField
            variant="outlined"
            fullWidth
            id="cookingLevel"
            label="Cooking Level"
            name="cookingLevel"
            onChange={handleCookingLevel}

          /> */}
        </Grid>
        <Grid item xs={12}>
        <label htmlFor="bio">Write a fun bio!</label>
          <input type="text" id="bio"
          onChange={handleBio}
          ></input>
          {/* <TextField
            variant="outlined"
            fullWidth
            id="bio"
            label="My bio"
            name="bio"
            onChange={handleBio}

          /> */}
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
      case 2:
      return (
        <Grid container spacing={2} >
          <h5>We have sent you the verification code to your email</h5>
          <label htmlFor='verification'>Verification Code </label>
          <input type='text' required id='verification' onChange={handleVerificationCode}></input>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className="submit"
              onClick={handleVerify}
            >
              Verify
            </Button>
        </Grid>
      );
      // case 3:
      //   return (
      //     <Grid container spacing={2}>
      //     <h5>Your CookSpace account is complete.</h5>
      //     <p>Log in to start cooking!</p>
      //     <Link to="/signIn">
      //        <Button
      //         type="submit"
      //         fullWidth
      //         variant="contained"
      //         color="secondary"
      //         className="submit"

      //       >
      //         Log in
      //       </Button>
      //     </Link>
         
      //     </Grid>
      //   );
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
    console.log(password,confirmPassword)
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
            // props.history.push(`/`);
            setSignUp(true)
            setUser_id(user.id)
            // window.location.reload(true);
            // alert('You have signed up!')
            })
          .catch(error => {
            alert(error.error.message)
          })
        }
        
          
  }
  return (
    <Container component="main" maxWidth="xs">
      <Header/>
      
      <CssBaseline />
      
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create An Account
        </Typography>
        <br/>
        <br/>
        <Grid container className="signInLink">
            <Grid item>
              <Link href="/signIn" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel/>
          </Step>
        ))}
      </Stepper>
      <div className='signUpForm'>
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
            <div className='btnGroup'>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <div>
                 {activeStep === steps.length - 1 ? null : 
                 <Button variant="contained" color="secondary" onClick={handleNext} disabled={(activeStep===1 && !signUp)}>
                   Next
              </Button>}
              </div>
              
            </div>
          </div>
        )}
      </div>
    </div>
          

      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}