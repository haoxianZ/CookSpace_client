import React,{useContext,useState} from 'react';
import context from '../context';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import Header from '../header';
import config from '../config'
import { useHistory } from 'react-router-dom';
import './createEvent.css'
export default function CreateEvent(props){
    const history= useHistory()

    const [eventDate, setValue] = useState(new Date());

    const Context = useContext(context)
    const recipe = Context.recipe
    const [eventName, setEventName] = useState(recipe.title);

    const  user_id  = props.match.params.userid;
    const recipe_id= props.match.params.recipe_id;
    const event_id=props.match.params.eventId;
    const friendsList = Context.friends;
    const handleChange=(e)=>{
      setEventName(e.target.value)
    }
    const displayFriends = friendsList.map((friend,key)=>{
        return (
            <li key={key}>
                {friend.email}
                {friend.username}
                <button>Invite</button>
            </li>
        )
    })
    const event ={
          event_name:eventName ,
           event_date: eventDate
    }
    const handleSave=(e)=>{
        fetch(`${config.SERVER_ENDPOINT}/events/event/${event_id}`, {
            method: 'put',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(event)
          })
            .then(res => {
              if (!res.ok){
                return res.json().then(e => Promise.reject(e))
              }
              return res.json()
            })
            .then(event => {
              alert('Your event has been created')
              history.push(`/users/${event.host_id}`);
              return event
            })
    }
    return(
        <div className="createEvent">
            <Header/>
            <button onClick={handleSave}>Save</button>
            <div className="eventDetails">
              <h4>{recipe.title}</h4>
              <label htmlFor='eventName' >Event Name:</label>
              <input type='text'id='eventName' name='eventName' onChange={handleChange}></input>
              <img src={recipe.image} alt={recipe.title} />
              <br/>
              <br/>
              <br/>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={eventDate}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
              />
              </LocalizationProvider>
              <h4>
                  Host: {Context.user.username}
              </h4>
            </div>
            
            <ul>
                {displayFriends}
            </ul>
        </div>
    )    
}