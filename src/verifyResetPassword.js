import React, { useRef } from 'react';
import config from './config';
import {useHistory} from 'react-router-dom';
import VisitorHeader from './visitorHeader/visitorHeader';
import ReactCodeInput from 'react-verification-code-input';

export default function VerifyResetPassword(props){
    const history = useHistory();
    const  user_id  = props.match.params.userid;
    const resetCode = e=>{
        e.preventDefault();
        const code={code: e.target['resetCode'].value};
        fetch(`${config.SERVER_ENDPOINT}/users/reset-password?user_id=${user_id}&code=${code.code}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',

            }
          })
            .then(res => {
              if (!res.ok){
                res.json().then(e=>alert(e.error.message))
                return res.json().then(e => Promise.reject(e))
              }
                
              return res.json()
            })
            .then(user => {
              history.push(`/users/reset/${user.id}/password`)
            })
            .catch(error => {
              
              console.error({ error })
            })

    };
    const handleComplete = vals=>{      
      fetch(`${config.SERVER_ENDPOINT}/users/reset-password?user_id=${user_id}&code=${vals}`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',

          }
        })
          .then(res => {
            if (!res.ok){
              res.json().then(e=>alert(e.error.message))
              return res.json().then(e => Promise.reject(e))
            }
              
            return res.json()
          })
          .then(user => {
            history.push(`/users/reset/${user.id}/password`)
          })
          .catch(error => {
            
            console.error({ error })
          })

  };
    const handleChange = (vals) => {
      if (vals.length >= 6) {
        console.log('complete, ', vals);
      } else if (vals.length === 0) {
        console.log('empty, ', vals);
      }
      console.log('filling', vals)
    };
    const input=useRef();
    return(
        <section className='reset'>
            <VisitorHeader/>
            <ReactCodeInput
          ref={input}
          type="text"
          className="custom-class"
          onChange={handleChange}
          onComplete={handleComplete}
        />
            <form onSubmit={resetCode} >
                <label htmlFor='resetCode'>Reset Code:</label>
                <input type='text' id='resetCode' name='resetCode' required></input>
                <button type='submit' className='restBtn'>Submit</button>

             </form>
        </section>
    )
}