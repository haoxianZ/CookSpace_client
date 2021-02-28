import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import SignInSide from '../signIn'
import context from '../context';
import Header from '../header'

export default function LandingPage(params) {
      const { randomRecipe} = useContext(context);
        console.log(randomRecipe)
    return(
        <div>
            <Header/>
            <h5>Recipe of the day</h5><br/>
            <h6>{randomRecipe.recipes? randomRecipe.recipes.recipes[0].title:null}</h6>
            <img src={randomRecipe.recipes? randomRecipe.recipes.recipes[0].image:null} alt="image of food" />
            <SignInSide></SignInSide>
           <div class="fb-share-button" 
           data-href="https://source.unsplash.com/random" 
           data-layout="button" data-size="large">
        <a target="_blank" 
        href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fsource.unsplash.com%2Frandom%2F&amp;src=sdkpreparse" 
        class="fb-xfbml-parse-ignore">
            Share</a>
        </div>
        </div>
    )
}

