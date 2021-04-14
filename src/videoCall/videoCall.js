import React, { useEffect, useState } from 'react';
import {Jutsu} from 'react-jutsu'
import VoiceControl from '../voiceCommand'
import Header from '../header'
import config from '../config'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Tooltip from '@material-ui/core/Tooltip';
import './videoCall.css'
import { useHistory } from 'react-router';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function VideoCall(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [voiceCommand, setVoiceCommand] = useState(false);
  const handleVoiceCommand=()=>{
    setVoiceCommand(!voiceCommand)
  }
  const handleClick = () => {
    setOpen(!open);
  };

let roomName =props.match.params.userid
let userFullName = ''
const  user_id  = props.match.params.userid;
const event_id = props.match.params.event_id;
let renderIngredients;
    let renderInstructions;
    let ingredients;
    let cookingTime;
    let recipe={};
    let eventName;
    let recipe_id;
    let username='';
const [event, setEvent]=useState(null)
useEffect(()=>{
    async function fetchData(){
      const savedEvents = await fetch(`${config.SERVER_ENDPOINT}/events/event/${event_id}`);
      const jsonEvents = await savedEvents.json();
     setEvent(jsonEvents)
    console.log(jsonEvents)
    }
    fetchData()
    
  },[])
  
  if(event!==null){
    userFullName=event.event_recipe_id.title
    recipe = event.event_recipe_id
    eventName=event.event_name
    recipe_id=event.event_recipe_id.id
    username=event.username
    console.log(recipe_id)
  }

  
   
    if(recipe) {
      cookingTime=recipe.readyInMinutes
      ingredients = recipe.extendedIngredients;
      if(recipe.instructions){ 
      const instructions = recipe.analyzedInstructions[0].steps;
      renderInstructions=  instructions.map((step,index)=>{
        return(
          <li key={index}>
            {step.step}
          </li>
        )
        

      });
      renderIngredients=ingredients.map((ingredient,index)=>{
        return(
          <li key={index}>
            {ingredient.original}
          </li>
        )
        

      })}}
  const history = useHistory()
  return (
    <div className="videoCall">
      <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />

      <h2>{eventName}</h2>
      {/* <iframe allow="camera; microphone; fullscreen; display-capture" src={`https://meet.jit.si/${user_id}`}
      style={{height: "100%",width: "100%", border: "0px",}}>

      </iframe> */}
      <Jutsu
      roomName={roomName}
      displayName={username}
      
      />

    <VoiceControl event={event} user_id={user_id}/>
      
      <div className="ingredients">
      <ListItem button onClick={handleClick} className={classes.root}>
        <ListItemText primary="Ingredients" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.root}>
          <ListItem button className={classes.nested}>
        <ul>
          {renderIngredients}

        </ul>

          </ListItem>
        </List>
      </Collapse>
        
      </div>
    </div>
  );
}

export default VideoCall;
