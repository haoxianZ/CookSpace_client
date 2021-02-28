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
  
export default function SearchRecipe(props){
    const Context = useContext(context);
    const history = useHistory();
    const classes = useStyles();
    const [cookTime, setCookTime] = useState(30);
    const  user_id  = props.user_id;


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
    const handleSubmit=(e)=>{
        e.preventDefault();
        const searchWord = document.getElementById("keyWord").value;
        const includeIngredients= document.getElementById("includeIngredient").value;
        const excludeIngredients = document.getElementById("excludeIngredient").value;
        console.log(Context.spoonApi)
        fetch(`${config.API_ENDPOINT}recipes/complexSearch?query=${searchWord}&includeIngredients=${includeIngredients}&maxReadyTime=${cookTime}&excludeIngredients=${excludeIngredients}&apiKey=${Context.spoonApi}`, {
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
    const results=Context.recipes;
    console.log(results)
    let display;
    if(!results){
      display = null
        
    }
     else display = results.map((recipe,key)=>{ 
            return (<div className='subContainer' key={key}>
            <h3>{recipe.title}</h3>
            
           <Link to={`/users/${Context.user.id}/${recipe.id}`} >
                <img src={recipe.image}
                            // onError={(e)=>{e.target.src='/404.jpg'}}
                            />

           </Link>
        </div>)

    })
    console.log(display)
    return(
        <div>
            <form onSubmit={handleSubmit}>
               <label for="keyWord">Find Recipes</label>
               <input type="text" id="keyWord" name="keyWord" placeholder="Search">
               </input>
               <label for="includeIngredient">Must Include: </label>
               <input type="text" id="includeIngredient" name="includeIngredient" placeholder="Peanut">
               </input>
               <br/>
               <label for="excludeIngredient">Do Not Include</label>
               <input type="text" id="excludeIngredient" name="excludeIngredient" placeholder="Peanut">
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
                        step: 10,
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
        </div>
    )
}