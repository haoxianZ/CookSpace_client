import React,{useContext, useState} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme)=>({
    root: {
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
      display:'flex',
      flexDirection:'column'
    },
    input: {
      width: 60,
    },
  }));
  
export default function SearchRecipe(props){
  const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
  const IOSSlider = withStyles({
    root: {
      color: '#3880ff',
      height: 2,
      padding: '15px 0',
    },
    thumb: {
      height: 28,
      width: 28,
      backgroundColor: '#fff',
      boxShadow: iOSBoxShadow,
      marginTop: -14,
      marginLeft: -14,
      '&:focus, &:hover, &$active': {
        boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          boxShadow: iOSBoxShadow,
        },
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 12px)',
      top: -22,
      '& *': {
        background: 'transparent',
        color: '#000',
      },
    },
    track: {
      height: 2,
    },
    rail: {
      height: 2,
      opacity: 0.5,
      backgroundColor: '#bfbfbf',
    },
    mark: {
      backgroundColor: '#bfbfbf',
      height: 8,
      width: 1,
      marginTop: -3,
    },
    markActive: {
      opacity: 1,
      backgroundColor: 'currentColor',
    },
  })(Slider);

    const Context = useContext(context);
    const history = useHistory();
    const classes = useStyles();
    const [status, setStatus]= useState(false)
    const [cookTime, setCookTime] = useState(10000);
    const [vegan, setVegan]= useState(false)
    const [vegetarian, setVegetarian]= useState(false)
    const [paleo, setPaleo]= useState(false)
    const [healthy, setHealthy]= useState(false)
    const [glutenFree, setGlutenFree]= useState(false)
    const [dairyFree, setDairyFree]= useState(false)
    const [popular, setPopular]= useState(true)

    const  user_id  = props.user_id;
    console.log(user_id)
    const [anchorEl, setAnchorEl] = useState(null);
    const [recipeReviews, setRecipeReview] = useState([]);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    const handleSliderChange = (event, newValue) => {
      if(newValue>120) newValue=10000
      setCookTime(newValue);
    };
    const handleInputChange = (event) => {
      setCookTime(event.target.value === '' ? '' : Number(event.target.value));
    };
  
    const handleBlur = () => {
      if (cookTime < 0) {
        setCookTime(0);
      } else if (cookTime > 120) {
        setCookTime(10000);
      }
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        setAnchorEl(null);
        setStatus(true)
        const searchWord = document.getElementById("keyWord").value;
        const includeIngredients= document.getElementById("includeIngredient").value;
        const excludeIngredients = document.getElementById("excludeIngredient").value;
        // const cuisine = document.getElementById("cuisine").value;
        let intolerance;
        if(dairyFree) intolerance="Dairy";
        if(glutenFree) intolerance=intolerance+',Gluten';
        let diet;
        let sort="";
        if(vegan) diet="Vegan"
        if(vegetarian) diet+=",Vegetarian"
        if(paleo) diet+=",Paleo"
        if(popular) sort="popularity"
        if(healthy) sort+=",healthiness"
        
        console.log(Context.spoonApi)
        fetch(`${config.API_ENDPOINT}recipes/complexSearch?query=${searchWord}
        &veryHealthy=${healthy}&includeIngredients=${includeIngredients}&instructionsRequired=true&sort=${sort}&sortDirection=asc
        &maxReadyTime=${cookTime}&excludeIngredients=${excludeIngredients}&diet=${diet}&intolerances=${intolerance}
        &number=25&apiKey=${Context.spoonApi}`, {
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
              console.log(recipes.results)
              if(recipes.results.length===0) alert('Ooops! That returned no result')
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
                setStatus(false)

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
       console.log(recipe.rating)
            return (<div className='subContainer' key={key}>
           <Link to={user_id?`/users/${user_id}/${recipe.id}`:`./recipe/${recipe.id}`} >
             <h3>{recipe.title}</h3>
                <img src={recipe.image}
                            // onError={(e)=>{e.target.src='/404.jpg'}}
                            />
                {/* add review here and once click in show comments */}

           </Link>
          {recipe.ratingNum?<Box component="fieldset" mb={3} borderColor="transparent">
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
    const marks = [
      {
        value: 0,
        label: '0 min',
      },
      {
        value: 30,
        label: '30 min',
      },
      {
        value: 60,
        label: '60 min',
      },
      {
        value: 90,
        label: '90 min',
      },
      {
        value: 121,
        label: 'any',
      },
    ];
    return(
      <> 
        <div className="searchBar">

                <form onSubmit={handleSubmit}>
               <input type="text" id="keyWord" name="keyWord" placeholder="Search for Recipes">
               </input>
               <button type='submit' className='searchBtn'><SearchIcon/> </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className='filterIngredients'>
        <FormGroup row>
        <FormControlLabel
        control={<Switch checked={popular} onClick={()=>{setPopular(!popular)}} name="checkedA" />}
        label="Sort By Popularity"
      />
      </FormGroup>
         <label htmlFor="includeIngredient">Include Ingredients: </label>
               <input type="text" id="includeIngredient" name="includeIngredient" placeholder="Enter Ingredient">
               </input>
        <label htmlFor="excludeIngredient">Exclude Ingredients: </label>
               <input type="text" id="excludeIngredient" name="excludeIngredient" placeholder="Enter Ingredient">
               </input>
        </div> 

                        <div className={classes.root} id="cookTimeFilter">
                <Typography id="input-slider" gutterBottom>
                    Cooking Time
                </Typography>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                    <AccessTime />
                    </Grid>
                    <Grid item xs>
                    <IOSSlider
                        value={typeof cookTime === 'number' ? cookTime : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="ios slider"
                        min={0}
                        max={121}
                        valueLabelDisplay="off"
                        marks={marks}
                        scale={(x) => x>=121?x * 100:x}

                    />
                    </Grid>
                    <Grid item>
                    <Input
                        className={classes.input}
                        value={cookTime>120?cookTime*100:cookTime}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                        step: 1,
                        min: 0,
                        max: Infinity,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    /> mins
                    </Grid>
                </Grid>
                <h5>Category</h5>
                <section className='categories'>
                  <div className='checkbox'> 
                  <label htmlFor="categoryVegan">Vegan</label>
                  <input type="checkbox" id="categoryVegan" name="categoryVegan"
                  onClick={()=>{setVegan(!vegan)}}
                  />
                  <label htmlFor="categoryVegetarian">Vegetarian</label>
                  <input type="checkbox" id="categoryVegetarian" 
                  name="categoryVegetarian"
                  onClick={()=>{setVegetarian(!vegetarian)}}/>
                  <label htmlFor="categoryPaleo">Paleo</label>
                  <input type="checkbox" id="categoryPaleo" 
                  onClick={()=>{setPaleo(!paleo)}}
                  name="categoryPaleo"/>
                 </div>
                 <div className='checkbox'>
                   <label htmlFor="categoryHealthy">Healthy</label>
                  <input type="checkbox" id="categoryHealthy" 
                  onClick={()=>{setHealthy(!healthy)}}
                  name="categoryHealthy"/>
                  <label htmlFor="categoryDairyFree">Dairy Free</label>
                  <input type="checkbox" id="categoryDairyFree" 
                  onClick={()=>{setDairyFree(!dairyFree)}}
                  name="categoryDairyFree"/>
                  <label htmlFor="categoryGlutenFree">Gluten Free</label>
                  <input type="checkbox" id="categoryGlutenFree"
                  onClick={()=>{setGlutenFree(!glutenFree)}}
                  name="categoryGlutenFree"/>
                  </div> 
                </section>
              </div>
                <button type='submit' className='submitBtn' onClick={handleSubmit}>Apply Filter</button>
      </Menu>
    
               
               
               
            

            </form>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <TuneIcon/>
            </Button>
            </div>
            <div className="display">
              {display}
            </div>
            <div>
      <Backdrop className={classes.backdrop} open={status}>
        <h3>Seaching...</h3>
        <p>One moment, please</p>
        <CircularProgress color="secondary" />
      </Backdrop>
    </div>
            <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>
</>
        
    )
}