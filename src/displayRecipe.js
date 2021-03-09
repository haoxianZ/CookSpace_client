import React,{useContext, useState,useEffect} from 'react';
import context from './context';
import config from './config';
import LoadMore from './loadMore';
import Header from './header'
import {Link} from 'react-router-dom'

export default function DisplayRecipe(props){
  const [eventId,setEventId]= useState('');
  const Context = useContext(context);
  const recipe=Context.recipe
  const apiKey= process.env.REACT_APP_API_KEY;
  const  user_id  = props.match.params.userid;
  console.log(user_id)
const recipe_id= props.match.params.recipe_id;
  useEffect(()=>{
    async function getRecipe(){
       return fetch(`${config.API_ENDPOINT}recipes/${recipe_id}/information?includeNutrition=false&apiKey=${apiKey}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => {
        Context.handleRecipe(responseJson)
        return responseJson
        })
      .then(responseJson=>{
        if(user_id&& responseJson){
          console.log(user_id,responseJson)
          const newEvent = {
            event_recipe_id:responseJson,
            host_id: user_id,
            event_date:""
          }
          console.log(newEvent)
          fetch(`${config.SERVER_ENDPOINT}/events`, {
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
            setEventId(responseJson.id)})
          .catch(error => {
              console.error({ error })
            });
        }
      })
      .catch(error => {
          console.error({ error })
        });
  };
    getRecipe()
    
  },[])
  
    let renderRecipes;
    let renderIngredients;
    let renderInstructions;
    let ingredients;
    console.log(recipe)
    let cookingTime
    if(!recipe){
      renderRecipes = null
        
    }
    else {
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
        

      })}
      renderRecipes = 
        <div className='subContainer'>
            <h3>{recipe.title}</h3>
            <img src={recipe.image}/>
            
        </div>
    } 
    const newBookmark={
      user_id: user_id,
      api_recipe: recipe
    }
    const Bookmark=()=>{
      fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/bookmarks`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body:JSON.stringify(newBookmark)
      })
    .then(response => {
      if (response.ok) {
        alert('is bookmarked')
        return response.json();
      }
      throw new Error(response.statusText);
    }).catch(error => {
      console.error({ error })
    });
    }

    const addToShoppingList=()=>{
      ingredients.forEach(ingredient => {
        
              fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/ingredients`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body:JSON.stringify({ingredient})
      }).then(alert('they are added!'))
      });

    }
    return ( 
        <div className='recipes'>
          <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />
        <div className='container'>
          {renderRecipes}
          <button onClick={Bookmark} >Bookmark this recipe</button>
          <h5>Cooking Time: {cookingTime}</h5>
          <Link to={`/users/${user_id}/${recipe_id}/createEvent/${eventId}`} >Create Event</Link>
          <h4>Ingredients:</h4> <button onClick={addToShoppingList} >Add Ingredients to Shopping List</button>
          <br/>
          <ul>
            
            {renderIngredients}
          </ul>
          <h4>Instructions</h4>
          <ul>
            {renderInstructions}
          </ul>
        </div>
        
        

        </div>
    )
}
