import React, { useState, useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import {Jutsu} from 'react-jutsu'
import VideoCall from './videoCall/videoCall'
import LandingPage from './landingPage/landingPage'
import SignInSide from './signIn/signIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './signUp/signUp'
import ShoppingList from './shoppingList/shoppingList'
import MyTimer from './timer'
import VoiceControl from './voiceCommand'
import config from './config';
import context from './context';
import SearchRecipe from './searchRecipe/searchRecipe'
import UserPage from './userPage/userPage'
import DisplayRecipe from './displayRecipe'
import CreateEvent from './createEvent/createEvent'
import Profile from './profile'
import Events from './events'
import DisplayRecipeOfTheDay from './displayRecipeOfTheDay'
import CreateEventNoRecipe from './createEventNoRecipe'
import Review from './review'
import NotFound from './404/404'
import ForgotPassword from './forgetPassword/forgetPassword'
import VerifyResetPassword from './verifyResetPassword'
import ResetPassword from './resetPassword'
function App() {
  const [Login,setLogin]=useState(null);
  const [user, setUser]=useState({})
  const [recipes, setRecipes]=useState([])
  const [friends, setUserFriends]=useState([])
  const [recipe, setRecipe]=useState(null);
  const [eventRecipe, setEventRecipe]=useState(null)

  const [ingredients, setIngredients]=useState([]);
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  const [randomRecipe, setRandomRecipe]= useState({});
  const [spoonApi,setSpoonApi]= useState({})
     useEffect(()=>{
    async function fetchData(){
      const recipe = await fetch(`${config.SERVER_ENDPOINT}/recipes/recipeOfTheDay`);
      const spoonAPI=await fetch(`${config.SERVER_ENDPOINT}/recipes/api`);
      const jsonRecipe = await recipe.json();
      const spoonApi = await spoonAPI.json();

     setRandomRecipe(jsonRecipe);
     setSpoonApi(spoonApi.spoonApi)
    console.log(randomRecipe, jsonRecipe)
    }
    fetchData()
    
  },[])
  const handleAddIngredient=(ingredient)=>{
   
    setIngredients(
     [
        ...ingredients,
        ingredient.ingredient
      ]
    )
  }
  const handleSetEventRecipe=(recipe)=>{
    setEventRecipe(recipe)

  }
  const handleDeleteIngredient=(id)=>{
    id = parseInt(id);
   const newArray = ingredients.filter(ingredient=>ingredient.ingredient_id!==id)
    setIngredients(
      newArray
    )
  }

  console.log(ingredients)
  const loginUser=(user)=>{
      setUser(user)
      setLogin(user)
    }
    const loginUserFriends=(arrayOfFriend)=>{
      setUserFriends(arrayOfFriend)
    }
    const addRecipe=(recipes)=>{
      setRecipes(recipes)
    }
    const handleRecipe=(recipe)=>{
      setRecipe(recipe)
    }
   const contextValue = {
    randomRecipe,
    recipe,
    user,
    friends,
    ingredients,
    recipes,
    eventRecipe,
    handleRecipe,
    handleAddIngredient,
    handleDeleteIngredient,
    loginUser,
    loginUserFriends,
    spoonApi,
    addRecipe,
    handleSetEventRecipe
  }
  return (
    <context.Provider value={contextValue}>

    <div className="App">
      <Switch>
        <Route exact path="/signIn" component={SignInSide} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/forgetPassword" component={ForgotPassword} />
        <Route exact path="/users/reset/:userid/password" component={ResetPassword} />
        <Route exact path="/users/reset/:userid" component={VerifyResetPassword} />

        <Route exact path="/users/:userid/list" component={ShoppingList} />
       
        <Route exact path="/users/:userid" component={UserPage} />
        <Route exact path="/users/:userid/videoCall/:event_id" component={VideoCall} />
        <Route exact path="/users/:userid/review/:event_id/" component={Review} />
        
        <Route exact path="/users/:userid/events" component={Events} />
        <Route exact path="/users/:userid/profile" component={Profile} />
        <Route exact path="/users/:userid/list" component={ShoppingList} />
        <Route exact path="/users/:userid/:recipe_id" component={DisplayRecipe} />
        <Route exact path="/recipe/:recipe_id" component={DisplayRecipe} />

        <Route exact path="/recipeOfTheDay/:recipe_id" component={DisplayRecipeOfTheDay} />
        
        <Route exact path="/users/:userid/:recipe_id/createEvent/:eventId" component={CreateEvent} />
        <Route exact path="/users/:userid/createEvent/:eventId" component={CreateEventNoRecipe} />

        <Route  exact path="/voice" component={VoiceControl} />
        <Route exact path="/search" component={SearchRecipe} />

        <Route exact path="/" component={LandingPage} />
        <Route component={NotFound} />

      </Switch>
    </div>
        </context.Provider>

  );
}

export default App;
