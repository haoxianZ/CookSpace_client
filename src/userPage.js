import React, {useContext, useState, useEffect} from 'react';
import Header from './header';
import context from './context';
import SearchRecipe from './searchRecipe';
import config from './config'
export default function UserPage(props){
    const { randomRecipe} = useContext(context);
    const [user, setUser] = useState({})

    console.log(randomRecipe)
    const  user_id  = props.match.params.userid;
    useEffect(()=>{
        async function fetchData(){
          const savedUser = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}`);
          const jsonUser = await savedUser.json();
          setUser(jsonUser)
        }
        fetchData()
        
      },[])
    return(
        <div>
            <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />

            <h4>Welcome back {user.username}!</h4>
            <h5>What's cookin?</h5>
            <SearchRecipe user_id={user_id} />
            <h6>Recipe of the day</h6><br/>
            <h6>{randomRecipe.recipes? randomRecipe.recipes.recipes[0].title:null}</h6>
            <img src={randomRecipe.recipes? randomRecipe.recipes.recipes[0].image:null} alt="image of food" />
            
            <h6>Popular</h6>
        </div>
    )
}