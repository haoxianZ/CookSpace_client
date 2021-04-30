import React,{useContext,useState,useEffect} from 'react';
import context from './context';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateTimePicker from '@material-ui/lab/DateTimePicker';
import Header from './header';
import config from './config'
import { useHistory } from 'react-router-dom';
import SelectRecipeForEvent from './selectRecipeForEvent';
export default function CreateEventNoRecipe(props){
  
    const history= useHistory()
    const [eventDate, setValue] = useState(new Date());
    const [eventRecipe, setEventRecipe]=useState(null)
    const Context = useContext(context)
    const  user_id  = props.match.params.userid;
    const event_id=parseInt(props.match.params.eventId);
    useEffect(()=>{
      async function fetchData(){
        const event = await fetch(`${config.SERVER_ENDPOINT}/events/event/${event_id}`);
       
        const jsonRecipe = await event.json();
        if(jsonRecipe) setEventRecipe(jsonRecipe.event_recipe_id);

      }
      fetchData()
      
    },[])
    const friendsList = Context.friends;
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
       
           event_date: eventDate
    }
    const handleSave=(e)=>{

        fetch(`${config.SERVER_ENDPOINT}/events/event/${event_id}`, {
            method: 'Put',
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
    const handleSetEventRecipe=(recipe)=>{
      setEventRecipe(recipe)

    }
    return(
        <div className="createEvent">
          <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />
            
            <SelectRecipeForEvent event_id={event_id} selected={eventRecipe} user_id={user_id} setEventRecipe={handleSetEventRecipe}/>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <br/>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="DateTimePicker"
        value={eventDate}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
      <button onClick={handleSave}>Save</button>
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