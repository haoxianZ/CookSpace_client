import React, {useContext} from 'react';
import Header from './header';
import context from './context';
import SearchRecipe from './searchRecipe'
export default function UserPage(props){
    const { randomRecipe} = useContext(context);
    console.log(randomRecipe)
    const  user_id  = props.match.params.userId;

    return(
        <div>
            <Header/>
            <h4>Welcome back </h4>
            <h5>What's cookin?</h5>
            <SearchRecipe user_id={user_id} />
            <h6>Recipe of the day</h6><br/>
            <h6>{randomRecipe.recipes? randomRecipe.recipes.recipes[0].title:null}</h6>
            <img src={randomRecipe.recipes? randomRecipe.recipes.recipes[0].image:null} alt="image of food" />
            
            <h6>Popular</h6>
        </div>
    )
}