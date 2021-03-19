import React,{useContext, useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
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
      } else if (cookTime > 180) {
        setCookTime(180);
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

    }
    const results=Context.recipes;
    let display;
    if(!results){
      display = null
        
    }
     else display = results.map((recipe,key)=>{ 
            return (<div className='subContainer' key={key}>
            <h3>{recipe.title}</h3>
            
           <Link to={`/users/${user_id}/${recipe.id}`} >
                <img src={recipe.image}
                            // onError={(e)=>{e.target.src='/404.jpg'}}
                            />

           </Link>

        </div>)

    })
    console.log(display)
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
        <div>
            <form onSubmit={handleSubmit}>
               <input type="text" id="keyWord" name="keyWord" placeholder="Search for Recipes">
               </input>
               <button type='submit' className='submitBtn'><SearchIcon/> </button>

               <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <FilterListIcon/>
                </Button>
              

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
                
      </Menu>
    
               
               
               
            

            </form>
            {display}
            <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>

        </div>
    )
}