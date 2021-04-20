import React, {useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import config from '../config';
import {useHistory} from 'react-router-dom';
import context from '../context'
import VisitorHeader from '../visitorHeader/visitorHeader';
import './signIn.css'
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


export default function SignInSide() {
  const history = useHistory()
  const Context = useContext(context);

  function handleSubmit(e){
    e.preventDefault()
      const user = {
        username: e.target['username'].value,
        password: e.target['password'].value
      };
      
      fetch(`${config.SERVER_ENDPOINT}/users`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
        .then(res => {
          if (!res.ok){
            return res.json().then(e => Promise.reject(e))
          }
          return res.json()
        })
        .then(user => {
          Context.loginUser(user);
          history.push(`/users/${user.id}`);
          return user
        })
        .then(user=>{
          fetch(`${config.SERVER_ENDPOINT}/users/${user.id}/friends`, {
            method: 'GET'
          }).then(friends=>{
            return friends.json()
          }).then(friends=>{
            Context.loginUserFriends(friends)
            console.log(friends)
          })
        })
  }
  return ( 
  <>
  <VisitorHeader/>

    <Grid container component="main" className='signIn'>
      
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          <form  onSubmit={handleSubmit} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="username Address"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
             
            >
              Sign In
            </Button>
            
    
          </form>
          <br/><br/>        
          <Grid container className="resetPassword">
              <Grid item xs>
                <Link href="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
        </div>
      </Grid>

    </Grid>
    </>
  );
}