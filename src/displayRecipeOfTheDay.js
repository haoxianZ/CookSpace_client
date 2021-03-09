import React,{useContext, useState,useEffect} from 'react';
import context from './context';
import config from './config';
import LoadMore from './loadMore';
import Header from './header'
import {Link} from 'react-router-dom'

export default function DisplayRecipeOfTheDay(props){
  const Context = useContext(context);
  const recipe=Context.recipe
  const apiKey= process.env.REACT_APP_API_KEY;
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

    return ( 
        <div className='recipes'>
          <Header />
        <div className='container'>
          {renderRecipes}
          <h5>Cooking Time: {cookingTime}</h5>
          <h4>Ingredients:</h4> 
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
