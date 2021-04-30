import React from 'react';
import VisitorHeader from './visitorHeader/visitorHeader';
import config from'./config'
import { useHistory } from 'react-router';

export default function ResetPassword(props){
    const  user_id  = props.match.params.userid;
    const history=useHistory()
    const handleSubmit=(e)=>{
        e.preventDefault();
        const newPassword={
            user_id:user_id,
            password:e.target['password'].value
        }
        fetch(`${config.SERVER_ENDPOINT}/users/reset-password`, {
            method: 'put',
            headers: {
              'content-type': 'application/json',

            },
            body: JSON.stringify(newPassword)
          })
            .then(res => {
              if (!res.ok){
                return res.json().then(e => 
                  
                  alert(e.error.message))
              }
                
            })
            .then(() => {
              alert('your passsword has been reset')
              history.push(`/signIn`)
            })
            .catch(error => {
              console.error({ error })
            })
    }
    return(
        <div>
            <VisitorHeader/>
             <form onSubmit={handleSubmit} >
                <label htmlFor='password'>New Password:</label>
                <input type='text' id='password' name='password' required></input>
                <button type='submit' className='restBtn'>Submit</button>

             </form>
        </div>
    )
}