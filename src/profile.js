import React, {useContext, useState, useEffect} from 'react';
import Header from './header';
import context from './context';
import config from './config'
export default function Profile(props){
    const { randomRecipe} = useContext(context);
    const [bookmarks, setBookmarks] = useState([])
    const [friends, setUserFriends] = useState([])
    const [user, setUser] = useState({})

    console.log(randomRecipe)

    
    const  user_id  = props.match.params.userid;
    const displayFriends = friends.map((friend,key)=>{
        return (
            <li key={key}>
                {friend.email}
                {friend.username}
                <button  >remove</button>
            </li>
        )
    })
    useEffect(()=>{
        async function fetchData(){
          const savedRecipes = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/bookmarks`);
          const savedFriends = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/friends`);
          const savedUser = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}`);
          const jsonUser = await savedUser.json();
          const jsonRecipe = await savedRecipes.json();
          const jsonFriends= await savedFriends.json();
         setBookmarks(jsonRecipe)
         setUserFriends(jsonFriends)
        setUser(jsonUser)
        console.log(jsonRecipe)
        }
        fetchData()
        
      },[])
    console.log(user,user_id,bookmarks)
     const displayBookmarks = bookmarks.map((bookmark,index)=>{
         return(
        <div key={index}>
            {bookmark.api_recipe.title}
            <img src={bookmark.api_recipe.image} alt={bookmark.api_recipe.title} />
        </div>)
     })
    const AddFriend=(e)=>{
        e.preventDefault();

    }
    return(
        <div>
            <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`}/>
            <h4>Welcome back {user.username}</h4>
            <img src={user.profile_pic} /> 
            <h5>my bio</h5>
            {user.bio}
            <h5>my Skill level</h5>
            {user.cooking_level}
            <h5>My friends</h5>
            <form onSubmit={AddFriend} >
            <label for="friendName">Add Friend: </label>
               <input type="text" id="friendName" name="friendName" placeholder="username">
               </input>
               <button type='submit' className='submitBtn'>Add Friend</button>
            </form>
            {displayFriends}
            <h6>
                Saved recipes
            </h6>
            {displayBookmarks}
            <h6>Recipe of the day</h6><br/>
            <h6>{randomRecipe.recipes? randomRecipe.recipes.recipes[0].title:null}</h6>
            <img src={randomRecipe.recipes? randomRecipe.recipes.recipes[0].image:null} alt="image of food" />
            
            <h6>Popular</h6>
        </div>
    )
}