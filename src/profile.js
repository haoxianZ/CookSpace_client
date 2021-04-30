import React, { useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom'
import Header from './header';
import config from './config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
 
  
export default function Profile(props){
    const [randomRecipe, setRandomRecipe]= useState({});
    const [bookmarks, setBookmarks] = useState([])
    const [friends, setUserFriends] = useState([])
    const [user, setUser] = useState({})
    const [allUsers, setAllUser] = useState([])
    const [matchingUsers, setMatchingUsers] = useState([])
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const  user_id  = props.match.params.userid;
    const deleteFriend=(e)=>{
      fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/friends/${e.target.value}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })
        .then(res => {
          if (!res.ok)
            return res.json().then(e => Promise.reject(e))
        })
        .then(() => {
          const newList = friends.filter(friend=>friend.friend_id!==parseInt(e.target.value) )
          setUserFriends(newList)
          alert('Friend has been deleted')
          })
        .catch(error => {
          console.error({ error })
        })
    }
    const displayFriends = friends.map((friend,key)=>{
        return (
            <li key={key}>
                {friend.email}
                {friend.username?friend.username:"You don't have a friend on the list yet!"}
                {friend.profile_pic?<Avatar alt="user's avatar" src={friend.profile_pic} />:<Avatar>{friend.username.substring(0,2).toUpperCase()}</Avatar>}

                <button onClick={deleteFriend} value={friend.friend_id}>remove</button>
            </li>
        )
    })
    useEffect(()=>{
        async function fetchData(){
          const savedRecipes = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/bookmarks`);
          const savedFriends = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/friends`);
          const savedUser = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}`);
          const allUsers= await fetch(`${config.SERVER_ENDPOINT}/users`);
          const recipe = await fetch(`${config.SERVER_ENDPOINT}/recipes/recipeOfTheDay`);
          const jsonRecipe = await recipe.json();    
          const jsonAllUsers = await allUsers.json();
          const jsonUser = await savedUser.json();
          const jsonRecipes = await savedRecipes.json();
          const jsonFriends= await savedFriends.json();
          setRandomRecipe(jsonRecipe);
         setBookmarks(jsonRecipes)
         setUserFriends(jsonFriends)
        setUser(jsonUser)
        setAllUser(jsonAllUsers)
        }
        fetchData()
        
      },[])
      const history = useHistory();
    const deleteBookmark=(e)=>{
        fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/bookmarks/${e.target.value}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(res => {
              if (!res.ok)
                return res.json().then(e => Promise.reject(e))
            })
            .then(() => {
              history.push(`/users/${user_id}/profile`);
              alert('Recipe Deleted')
              })
            .catch(error => {
              console.error({ error })
            })
          }
     
     const displayBookmarks = bookmarks.map((bookmark,index)=>{
         return(
        <div key={index}>
            {bookmark.api_recipe.title}
            <img src={bookmark.api_recipe.image} alt={bookmark.api_recipe.title} />
            <button value={bookmark.bookmark_id} onClick={
                deleteBookmark
                }>Remove</button>
        </div>)
     })
    const AddFriend=(e)=>{
        e.preventDefault();
        const friend = {
          user_id:user_id,
          username: e.target.value
        }
        fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/friends`, {
          method: 'Post',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(friend)
        })
          .then(res => {
            if (!res.ok){
              return res.json().then(e => Promise.reject(e))
            }
            return res.json()
          })
          .then(friends => {
            setUserFriends(friends)
            alert(`friend has been added. `)
          })

    }
    const friendsName= friends.map((friend)=>{
      return friend.username
    })

    const dispalyMatchingUsers = matchingUsers.map((user,index)=>{

            if(user!==''){
                return(
                    <li key={index}>
                        {user.username}
                        {user.profile_pic?<Avatar alt="user's avatar" src={user.profile_pic} />:<Avatar>{user.username.substring(0,2).toUpperCase()}</Avatar>}
                        {friendsName.includes(user.username)?
                        <button onClick={AddFriend} value={user.username} disabled>Add </button>:
                        <button onClick={AddFriend} value={user.username}>Add </button>}
                    </li>
                )
            }
        })
    const showMatchingUser=(e)=>{
        const matchingTempUsers=allUsers.map(user=>{
            if(user.username.includes(e.target.value)){
                return user
            }
            return ''
        })
        setMatchingUsers(matchingTempUsers)

        
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
            <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} 
        aria-label="simple tabs example"
        indicatorColor="secondary"
        textColor="secondary"
        centered>
          <Tab label="Friends" {...a11yProps(0)} />
          <Tab label="Saved Recipes" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <h5>My friends</h5>
      {displayFriends}

<label htmlFor="friendName">Add Friend: </label>
   <input type="text" id="friendName" name="friendName" placeholder="username" onChange={showMatchingUser}>
   </input>

<ul>
    {dispalyMatchingUsers}

</ul>

      </TabPanel>
      <TabPanel value={value} index={1}>
      <h6>
                Saved recipes
            </h6>
            {displayBookmarks}
      </TabPanel>

    </div>
           

            <h6>Recipe of the day: {randomRecipe.recipes? randomRecipe.recipes.recipes[0].title:null}</h6><br/>
            <Link to={randomRecipe.recipes?`/users/${user_id}/${randomRecipe.recipes.recipes[0].id}`:'/'} >
             <h6>{randomRecipe.recipes? randomRecipe.recipes.recipes[0].title:null}</h6>
            <img src={randomRecipe.recipes? randomRecipe.recipes.recipes[0].image:null} alt="image of food" />
        </Link>
           
            
            <h6>Popular</h6>
        </div>
    )
}