import React,{useContext,useState} from 'react';
import context from './context';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import Header from './header';
import config from './config'
import { useHistory } from 'react-router-dom';
export default function CreateEvent(props){
    const history= useHistory()

    const [eventDate, setValue] = useState(new Date());

    const Context = useContext(context)
    const recipe = Context.recipe
    const [eventName, setEventName] = useState(recipe.title);

    const  user_id  = props.match.params.userid;
    const recipe_id= props.match.params.recipe_id;
    const event_id=props.match.params.eventId;
    console.log(user_id,recipe_id)
    console.log(user_id,recipe_id)
    const friendsList = Context.friends;
    const handleChange=(e)=>{
      console.log(e.target.value)
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
    console.log(friendsList)
    console.log(Context.recipes)
    const event ={
          event_name:eventName ,
           event_date: eventDate
    }
    const handleSave=(e)=>{
        fetch(`${config.SERVER_ENDPOINT}/events/event/${event_id}`, {
            method: 'PATCH',
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
              history.push(`/users/${event.host_id}`);
              return event
            })
    }
    return(
        <div className="createEvent">
            <Header/>
            <button onClick={handleSave}>Save</button>
            <h4>{recipe.title}</h4>
            <label htmlFor='eventName' >Event Name:</label>
            <input type='text'id='eventName' name='eventName' onChange={handleChange}></input>
            <img src={recipe.image} alt={recipe.title} />
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
            <ul>
                {displayFriends}
            </ul>
        </div>
    )    
}