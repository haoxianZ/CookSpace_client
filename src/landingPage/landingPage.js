import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import context from '../context';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FacebookIcon from '@material-ui/icons/Facebook';
import Button from '@material-ui/core/Button';
import VisitorHeader from '../visitorHeader/visitorHeader';
import SearchRecipe from '../searchRecipe/searchRecipe';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import config from '../config';
import { bindKeyboard, autoPlay } from 'react-swipeable-views-utils';
import './landingPage.css'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    textAlign:"center",
    margin:"auto"
  }
}));
export default function LandingPage(props) {
    const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [popularRecipes, setPopularRecipes]= useState([])
  useEffect(()=>{
    async function fetchData(){
      const popularRecipes = await fetch(`${config.SERVER_ENDPOINT}/recipes/popularRecipes`);
      const jsonRecipes = await popularRecipes.json();
      setPopularRecipes(jsonRecipes)
    }
    fetchData()
    
  },[])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const BindKeyboardSwipeableViews = bindKeyboard(autoPlay(SwipeableViews));

  const handleChangeIndex = (index) => {
    setActiveStep(index);
  };
      const { randomRecipe} = useContext(context);
        console.log(randomRecipe)
    let linkToRecipe;
    let imgURL =randomRecipe.recipes? randomRecipe.recipes.recipes[0].image:null
    let sourceURL=randomRecipe.recipes? randomRecipe.recipes.recipes[0].sourceUrl:null
    if(randomRecipe.recipes){

        linkToRecipe=<Link to={`/recipeOfTheDay/${randomRecipe.recipes.recipes[0].id}`} >
            <h6>{randomRecipe.recipes? randomRecipe.recipes.recipes[0].title:null}</h6>
        <img src={imgURL} alt="image of food" />
        </Link>
        
    }
    const renderPopular=popularRecipes.map((recipe,index)=>{
        return (<div key={index}>
          <Link to={`/recipeOfTheDay/${recipe.recipe.id}`} >
            <h6>{recipe.recipe.title}</h6>
            <img src={recipe.recipe.image}></img>
          </Link>
          

        </div>)
      })
    
    return(
        <div>
            <VisitorHeader/>
            <h3>Weclome to Cook Space!</h3>
            <div >
                <BindKeyboardSwipeableViews className={classes.root}
                index={activeStep}
                onChangeIndex={handleChangeIndex}	>
                  <div className="intro">
                    <h5>Weclome to Cook Space!</h5>
                    <p>Connnect and cook with others all online</p>
                    <Link to="/signUp">
                        <Button variant="contained" color="primary">Sign Up! </Button>
                    </Link>
                  </div>
                  <div className="content">
                    {linkToRecipe}
                  
                    <div className="fb-share-button" 
                      data-href={sourceURL}
                      data-layout="button" data-size="large">
                        <a target="_blank" 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${sourceURL}&amp;src=sdkpreparse`} 
                        className="fb-xfbml-parse-ignore">
                        <FacebookIcon>Share</FacebookIcon></a>
                    </div>
                  </div>
                </BindKeyboardSwipeableViews>
                <MobileStepper
                variant="dots"
                steps={2}
                position="static"
                activeStep={activeStep}
                // nextButton={
                //   <Button size="small" >
                    
                //   </Button>
                // }
                // backButton={
                //   <Button size="small">
                    
                //   </Button>
                // }
                  />
            </div>
            <h5>Popular</h5>
            <div className="recipes">{renderPopular}</div>
            
      </div>
    )
}

