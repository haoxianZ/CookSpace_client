import React, { useRef } from 'react';
import {Link} from 'react-router-dom';
import config from '../config';
import {useHistory} from 'react-router-dom';
import VisitorHeader from '../visitorHeader/visitorHeader';
import './forgetPassword.css';
export default function ForgotPassword(){
  const history = useHistory();

    const sendEmail = e=>{
        e.preventDefault();
        const email={email: e.target['email'].value};
        
        fetch(`${config.SERVER_ENDPOINT}/users/forget-password`, {
            method: 'put',
            headers: {
              'content-type': 'application/json',

            },
            body: JSON.stringify(email)
          })
            .then(res => {
              if (!res.ok){
                return res.json().then(e => 
                  
                  alert(e.error.message))
              }
                
              return res.json()
            })
            .then(user => {
              history.push(`/users/reset/${user.id}`)
            })
            .catch(error => {
              console.error({ error })
            })

    }
   
    return(
        <div>
          <VisitorHeader/>
         
            <form onSubmit={sendEmail} className='forgotPassword'>
                
                <label htmlFor='email'>Email:</label><br/>
                <input type='email' id='email' name='email' required></input>
                <button type='submit'>Send Reset Password Code</button>
            </form>
        </div>
    )
}