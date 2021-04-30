import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import config from './config'
import Header from './header';
export default function Events(props){
    const  user_id  = props.match.params.userid;
    const history = useHistory()
    const [events, setEvents]=useState([])
    useEffect(()=>{
        async function fetchData(){
          const savedEvents = await fetch(`${config.SERVER_ENDPOINT}/events/${user_id}`);
          const jsonEvents = await savedEvents.json();
         setEvents(jsonEvents)
        console.log(jsonEvents)
        }
        fetchData()
      },[])
    let displayEvents='There is no upcoming event'
    if(events!==[]){
        
        displayEvents = events.map((event,index)=>{
            let date = new Date(event.event_date)
            console.log(date
                )
        return (<div key={index}>
            <h5>{event.event_name?event.event_name:'No Event Name'}</h5> 
            <h6>{event.event_recipe_id.title?event.event_recipe_id.title:'No Recipe'}</h6>
            <p>Time: {date.toLocaleString()}</p>
            <Link to={`/users/${user_id}/videoCall/${event.id}`}  >
                <button>Start Event</button>

            </Link>
        </div>)
    })
    }
    const newEvent = {
        event_recipe_id:{},
        host_id: user_id,
        event_date:new Date(),
        event_name:''
      }
    const createNewEvent = ()=>{fetch(`${config.SERVER_ENDPOINT}/events`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body:JSON.stringify(newEvent)
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        console.log(responseJson)
        history.push(`/users/${user_id}/createEvent/${responseJson.id}`)})
      .catch(error => {
          console.error({ error })
        }); 
    }
    return(
        <div className="event">
          <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />
            <h3>Events</h3>
            
            <Button variant="contained" color='secondary' onClick={createNewEvent} > Create New Event</Button>
            {displayEvents}
        </div>
    )

}