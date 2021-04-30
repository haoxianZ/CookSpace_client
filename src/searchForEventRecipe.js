import React,{useContext, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import AccessTime from '@material-ui/icons/AccessTime';
import config from './config';
import context from './context';
import {useHistory, Link} from 'react-router-dom';
const useStyles = makeStyles({
    root: {
      width: 250,
    },
    input: {
      width: 42,
    },
  });
  
export default function SearchForEventRecipe(props){
    const Context = useContext(context);
    const event_id=props.event_id;
    const user_id= props.user_id
    const history = useHistory();
    const classes = useStyles();
    const [cookTime, setCookTime] = useState(30);
    const apiKey= process.env.REACT_APP_API_KEY;
    let eventRecipe;
    const [renderRecipe,setRenderRecipe]=useState(<div>test</div>)
    const handleSliderChange = (event, newValue) => {
      setCookTime(newValue);
    };
  
    const handleInputChange = (event) => {
      setCookTime(event.target.value === '' ? '' : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (cookTime < 0) {
        setCookTime(0);
      } else if (cookTime > 180) {
        setCookTime(180);
      }
    };
    const addRecipeEvent=(e)=>{
      e.preventDefault();
      const eventDetail={
        event_recipe_id:eventRecipe
      }
      fetch(`${config.SERVER_ENDPOINT}/events/event/${event_id}`,{
        method:'put',
        headers: {
          'content-type': 'application/json'
        },
        body:JSON.stringify(eventDetail)
      }).then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e))
        return res.json()
      }).then(recipe=>{
        alert('You have selected a recipe!')
        Context.handleSetEventRecipe(eventRecipe)
        history.push(`/users/${user_id}/createEvent/${event_id}`)

      }

      )
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        const searchWord = document.getElementById("keyWord").value;
        const includeIngredients= document.getElementById("includeIngredient").value;
        const excludeIngredients = document.getElementById("excludeIngredient").value;
        const cuisine = document.getElementById("cuisine").value;
        fetch(`${config.API_ENDPOINT}recipes/complexSearch?query=${searchWord}&includeIngredients=${includeIngredients}&maxReadyTime=${cookTime}&excludeIngredients=${excludeIngredients}&cuisine=${cuisine}&apiKey=${Context.spoonApi}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          })
            .then(res => {
              if (!res.ok) return res.json().then(e => Promise.reject(e))
              return res.json()
            })
            .then(recipes => {
              Context.addRecipe(recipes.results)
              })
            .catch(error => {
              console.error({ error })
            })

    }
    const showRecipeDetail=(recipe)=>{
      fetch(`${config.API_ENDPOINT}recipes/${recipe.id}/information?includeNutrition=false&apiKey=${apiKey}`, {
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
      eventRecipe=responseJson;
      let renderIngredients;
    let renderInstructions;
    let ingredients=eventRecipe.extendedIngredients;
    let cookingTime=eventRecipe.readyInMinutes
      if(eventRecipe.analyzedInstructions){ 
      const instructions = eventRecipe.analyzedInstructions[0].steps;
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
      setRenderRecipe(<form >
        <button type='submit' onClick={addRecipeEvent}>Add Recipe to Event</button>
        <h5>Cooking Time: {cookingTime}</h5>
        <h6>Ingredients:</h6><br/>
        {renderIngredients}
        <h6>Instruction:</h6><br/>
        {renderInstructions}
      </form>)
      return responseJson
      })
    }
    const results=Context.recipes;
    let display;

    if(!results){
      display = null
        
    }
     else display = results.map((recipe,key)=>{ 
            return (
              <div key={key}>  <h3  >{recipe.title}</h3>
                    <button className='subContainer' style={{border:'none'}}
            onClick={()=>showRecipeDetail(recipe)} >
            
              <img src={recipe.image} 
              // onError={(e)=>{e.target.src='/404.jpg'}}
                            />
              {renderRecipe}
            </button>
              </div>
        
          

        )

    })
    // if(recipe!=null){
    // let renderIngredients;
    // let renderInstructions;
    // let ingredients=recipe.extendedIngredients;
    // console.log(recipe)
    // let cookingTime=recipe.readyInMinutes
    //   if(recipe.analyzedInstructions){ 
    //   const instructions = recipe.analyzedInstructions[0].steps;
    //   renderInstructions=  instructions.map((step,index)=>{
    //     return(
    //       <li key={index}>
    //         {step.step}
    //       </li>
    //     )
        

    //   });
    //   renderIngredients=ingredients.map((ingredient,index)=>{
    //     return(
    //       <li key={index}>
    //         {ingredient.original}
    //       </li>
    //     )
        

    //   })}
    //   setRenderRecipe(<div>
    //     <h5>Cooking Time: {cookingTime}</h5>
    //     {renderIngredients}
    //     {renderInstructions}
    //   </div>)
    // }
    window.onload=function(){
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
    }
    
    
    // When the user clicks on the button, scroll to the top of the document
    function topFunction() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTo({top:0,behavior: 'smooth'}); // For Chrome, Firefox, IE and Opera
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
               <label htmlFor="keyWord">Find Recipes</label>
               <input type="text" id="keyWord" name="keyWord" placeholder="Search">
               </input>
               <label htmlFor="includeIngredient">Must Include: </label>
               <input type="text" id="includeIngredient" name="includeIngredient" placeholder="Peanut">
               </input>
               <br/>
               <label htmlFor="excludeIngredient">Do Not Include</label>
               <input type="text" id="excludeIngredient" name="excludeIngredient" placeholder="Peanut">
               </input>
               <label htmlFor="cuisine">Cuisine Type</label>
               <input type="text" id="cuisine" name="cuisine" placeholder="Italian">
               </input>
               <br/>
                <div className={classes.root} id="cookTimeFilter">
                <Typography id="input-slider" gutterBottom>
                    Cooking Time
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                    <AccessTime />
                    </Grid>
                    <Grid item xs>
                    <Slider
                        value={typeof cookTime === 'number' ? cookTime : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={0}
                        max={180}
                    />
                    </Grid>
                    <Grid item>
                    <Input
                        className={classes.input}
                        value={cookTime}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                        step: 1,
                        min: 0,
                        max: 180,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    /> mins
                    </Grid>
                </Grid>
                </div>
                <button type='submit' className='submitBtn'>Search</button>

            </form>
            {display}
            <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>

        </div>
    )
}