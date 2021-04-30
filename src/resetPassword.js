import React from 'react';
import VisitorHeader from './visitorHeader/visitorHeader';


export default function ResetPassword(props){
    const  user_id  = props.match.params.userid;

    return(
        <div>
            <VisitorHeader/>
             <form  >
                <label htmlFor='password'>New Password:</label>
                <input type='text' id='password' name='password' required></input>
                <button type='submit' className='restBtn'>Submit</button>

             </form>
        </div>
    )
}