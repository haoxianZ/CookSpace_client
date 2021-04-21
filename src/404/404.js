import React from 'react';
import { Link } from 'react-router-dom';
import VisitorHeader from '../visitorHeader/visitorHeader'
import './404.css'
export default function NotFound(){

    return(
        <div >
            <VisitorHeader/>
            <div className="pageNotFound">
                 <h4>Oops!</h4>
            <p>We can't seem to find the page you are looking for.</p>
            <Link to='/' ><button>Return Home</button></Link>
            </div>
           
            
        </div>
    )
}