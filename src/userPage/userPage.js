import React, { useState, useEffect} from 'react';
import Header from '../header';
import SearchRecipe from '../searchRecipe/searchRecipe';
import config from '../config';
import {Link} from 'react-router-dom'
import "./userPage.css"
export default function UserPage(props){
    const [user, setUser] = useState({})
    const [popularRecipes, setPopularRecipes]= useState([])
    const [randomRecipe, setRandomRecipe]= useState({});
    const  user_id  = props.match.params.userid;
    useEffect(()=>{
        async function fetchData(){
          const recipe = await fetch(`${config.SERVER_ENDPOINT}/recipes/recipeOfTheDay`);
          const jsonRecipe = await recipe.json();

          const savedUser = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}`);
          const jsonUser = await savedUser.json();
          const popularRecipes = await fetch(`${config.SERVER_ENDPOINT}/recipes/popularRecipes`);
          const jsonRecipes = await popularRecipes.json();
          setPopularRecipes(jsonRecipes)
          setUser(jsonUser)
          setRandomRecipe(jsonRecipe)
        }
        fetchData()
        
      },[])


    const renderPopular=popularRecipes.map((recipe,index)=>{
        return (<div key={index}>
          <Link to={`/users/${user_id}/${recipe.recipe.id}`} >
            <h6>{recipe.recipe.title}</h6>
            <img src={recipe.recipe.image}></img>
          </Link>
          

        </div>)
      })
    let recipeOfTheDay;
    if(randomRecipe.recipes){
      recipeOfTheDay= <Link to={`/users/${user_id}/${randomRecipe.recipes.recipes[0].id}`}>
      <h6>{randomRecipe.recipes.recipes[0].title}</h6>
      <img src={randomRecipe.recipes.recipes[0].image} alt="image of food" />
      </Link>
                  
    }  
     
    return(
        <div>
            <Header 
            user_id={user_id}
            home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />
            <SearchRecipe user_id={user_id}/>

            <h4>Welcome back {user.username}!</h4>
            <div className="userPage">
              <h5>What's cookin?</h5>
            <h5>Recipe of the day：{randomRecipe.recipes?randomRecipe.recipes.recipes[0].title:null}</h5>
            {recipeOfTheDay}
            <br/>
            <h6>Popular</h6>
            {renderPopular}
            </div>
            
        </div>
    )
}