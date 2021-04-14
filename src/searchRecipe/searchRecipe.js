import React,{useContext, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import AccessTime from '@material-ui/icons/AccessTime';
import config from '../config';
import context from '../context';
import {useHistory, Link} from 'react-router-dom';
import './searchRecipe.css';
import FilterListIcon from '@material-ui/icons/FilterList';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
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
    const [cookTime, setCookTime] = useState(10000);
    const  user_id  = props.user_id;
    console.log(user_id)
    const [anchorEl, setAnchorEl] = useState(null);
    const [recipeReviews, setRecipeReview] = useState([]);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      alert('Search again with your filters!')
    };
  

    const handleSliderChange = (event, newValue) => {
      setCookTime(newValue);
    };
  
    const handleInputChange = (event) => {
      setCookTime(event.target.value === '' ? '' : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (cookTime < 0) {
        setCookTime(0);
      } else if (cookTime > 10000) {
        setCookTime(10000);
      }
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const searchWord = document.getElementById("keyWord").value;
        const includeIngredients= document.getElementById("includeIngredient").value;
        const excludeIngredients = document.getElementById("excludeIngredient").value;
        const cuisine = document.getElementById("cuisine").value;

        console.log(Context.spoonApi)
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

            fetch(`${config.SERVER_ENDPOINT}/recipes`, {
              method: 'GET',
              headers: {
                'content-type': 'application/json'
              }
            })
              .then(res => {
                if (!res.ok) return res.json().then(e => Promise.reject(e))
                return res.json()
              })
              .then(recipesReview => {
                setRecipeReview(recipesReview)
                })
              .catch(error => {
                console.error({ error })
              })

    }
    const results=Context.recipes;
    const api_id=recipeReviews.map(review=>review.api_id)
    console.log(api_id)
    const resultsReview= results.map(result=>{
      let recipeId;
      let comment;
      let rating=[];
      let ratingNum=0;
      let commentedUser;
      if(recipeReviews[api_id.indexOf(`${result.id}`)]){
        console.log(recipeReviews)
         recipeId=recipeReviews[api_id.indexOf(`${result.id}`)].api_id;
         comment=recipeReviews[api_id.indexOf(`${result.id}`)].comment;
         recipeReviews.map(review=>{
           if(review.api_id===recipeId){
             rating.push(review.liked)
           }
         })
         ratingNum=rating.length
         rating = rating.reduce((a, b) => a + b) / ratingNum;
         
         commentedUser=recipeReviews[api_id.indexOf(`${result.id}`)].user_id;
      }
        
        return {
          ...result,
          recipeId,
          comment,
          rating,
          commentedUser,
          ratingNum

        }
    })
    
    console.log(results,'this is the result, need to add review to them',resultsReview)
    let display;
    if(!results){
      display = null
        
    }
     else display = resultsReview.map((recipe,key)=>{
            return (<div className='subContainer' key={key}>
            <h3>{recipe.title}</h3>
            
           <Link to={`/users/${user_id}/${recipe.id}`} >
                <img src={recipe.image}
                            // onError={(e)=>{e.target.src='/404.jpg'}}
                            />
                {/* add review here and once click in show comments */}

           </Link>
          {recipe.rating?<Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"> ({recipe.ratingNum})</Typography>
        <Rating name="read-only" value={recipe.rating} precision={0.5} readOnly />
       
      </Box>:<Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">It has not been rated yet</Typography>
        <Rating name="read-only" value={null} readOnly />
      </Box>}
        </div>)

    })
    window.onload=function(){
      let mybutton = document.getElementById("myBtn");

    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = function() {scrollFunction()};
    
    const  scrollFunction=()=> {
      console.log('scrolling running')
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
      <>
        <div className="searchBar">
                <form onSubmit={handleSubmit}>
               <input type="text" id="keyWord" name="keyWord" placeholder="Search for Recipes">
               </input>
               <button type='submit' className='submitBtn'><SearchIcon/> </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        
         <label htmlFor="includeIngredient">Must Include: </label>
               <input type="text" id="includeIngredient" name="includeIngredient" placeholder="Peanut">
               </input>
        <br/>
        <label htmlFor="excludeIngredient">Do Not Include</label>
               <input type="text" id="excludeIngredient" name="excludeIngredient" placeholder="Peanut">
               </input>

               <br/>
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
                        max={300}
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
                        max: 1000,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    /> mins
                    </Grid>
                </Grid>
                

              </div>
                <button type='submit' className='submitBtn' onClick={handleClose}>Apply Filter</button>
      </Menu>
    
               
               
               
            

            </form>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <TuneIcon/>
            </Button>
            </div>
            <div className="display">
              {display}
            </div>
            <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>
</>
        
    )
}