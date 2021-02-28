import React,{useContext, useState,useEffect} from 'react';
import context from './context';
import config from './config';
import LoadMore from './loadMore';
import Header from './header'
import {Link} from 'react-router-dom'

export default function DisplayRecipe(props){
  const [recipe, setRecipe]=useState({});
  const Context = useContext(context);
  const apiKey= process.env.REACT_APP_API_KEY;
  const  user_id  = props.match.params.userId;
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
      .then(responseJson => setRecipe(responseJson))
      .catch(error => {
          console.error({ error })
        });
  };
    getRecipe()
    
  },[])
    let renderRecipes;
    let renderIngredients;
    let renderInstructions;
    console.log(recipe)
    let cookingTime
    if(recipe.length===0){
      renderRecipes = null
        
    }
    else {
      cookingTime=recipe.readyInMinutes
      const ingredients = recipe.extendedIngredients;
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

    let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

const  scrollFunction=()=> {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
    return ( 
        <div className='recipes'>
          <Header/>
        <div className='container'>
          {renderRecipes}
          <h5>Cooking Time: {cookingTime}</h5>
          <Link to={`/users/${user_id}/${recipe_id}/createEvent`} >Create Event</Link>
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
        
        
        <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>

        </div>
    )
}
