import React, { useEffect, useState } from 'react';
import {Jutsu} from 'react-jutsu'
import VoiceControl from './voiceCommand'
import Header from './header'
import config from './config'

function VideoCall(props) {
let roomName =props.match.params.userid
let userFullName = ''
const  user_id  = props.match.params.userid;
const event_id = props.match.params.event_id;
let renderIngredients;
    let renderInstructions;
    let ingredients;
    let cookingTime;
    let recipe={}
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
  return (
    <div className="videoCall">
      <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />

      <h2>{userFullName}'s Room</h2>
      {/* <iframe allow="camera; microphone; fullscreen; display-capture" src={`https://meet.jit.si/${user_id}`}
      style={{height: "100%",width: "100%", border: "0px",}}>

      </iframe> */}
      <Jutsu
      roomName={roomName}
      />
      {/* let user click to start voice command */}
      <button>Start</button>
      <VoiceControl event={event}/>
      <div>
        
      </div>
      <div className="ingredients">
        <h6>Ingredients</h6>
        <ul>
        {renderIngredients}
        </ul>

        
      </div>
    </div>
  );
}

export default VideoCall;
