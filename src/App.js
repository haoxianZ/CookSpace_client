import React, { useState, useEffect } from 'react'
import {Route, Switch} from 'react-router-dom'
import {Jutsu} from 'react-jutsu'
import VideoCall from './videoCall'
import LandingPage from './landingPage/landingPage'
import SignInSide from './signIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './signUp'
import ShoppingList from './shoppingList'
import MyTimer from './timer'
import VoiceControl from './voiceCommand'
import config from './config';
import context from './context';
import SearchRecipe from './searchRecipe'
import UserPage from './userPage'
import DisplayRecipe from './displayRecipe'
import CreateEvent from './createEvent'
function App() {
  const [Login,setLogin]=useState(null);
  const [user, setUser]=useState({})
  const [recipes, setRecipes]=useState([])

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
  console.log(ingredients)
  const loginUser=(user)=>{
      setUser(user)
      setLogin(user)
    }
    const addRecipe=(recipes)=>{
      setRecipes(recipes)
    }
   const contextValue = {
    randomRecipe,
    user,
    ingredients,
    recipes,
    handleAddIngredient,
    loginUser,
    spoonApi,
    addRecipe
  }
  return (
    <context.Provider value={contextValue}>

    <div className="App">
      <Switch>
        <Route path="/videoCall" component={VideoCall} />
        <Route path="/signIn" component={SignInSide} />
        <Route path="/signUp" component={SignUp} />
        <Route path="/users/:userid/list" component={ShoppingList} />
        <Route path="/users/:userid/:recipe_id" component={DisplayRecipe} />
        <Route exact path="/users/:userid" component={UserPage} />
        <Route exact Path="users/:userid/:recipe_id/createEvent" component={CreateEvent} />
        <Route path="/voice" component={VoiceControl} />
        <Route path="/search" component={SearchRecipe} />

        <Route exact path="/" component={LandingPage} />

      </Switch>
    </div>
        </context.Provider>

  );
}

export default App;
