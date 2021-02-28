import React, { useContext} from 'react';
import {Link} from 'react-router-dom';
import context from './context';
import config from './config';
import Display from './displayRecipe';
import {useHistory} from 'react-router-dom';

export default function ShoppingList(props){
    const history = useHistory();
    const Context = useContext(context);
    const {user}=Context;
    if (!user){return null};
    const  user_id  = props.match.params.userId;
    const handleSubmit=e=> {
        e.preventDefault()
        const newIngredient = {
          ingredient: e.target['newIngredient'].value,
          user_id: user.id
        }
        fetch(`${config.SERVER_ENDPOINT}/users/${user.id}/ingredients`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(newIngredient),
        })
          .then(res => {
            if (!res.ok) return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(note => {
            Context.handleAddIngredient(note);
            }).then(history.push(`/users/${user.id}`)
            )
          .catch(error => {
            console.error({ error })
          })
      }
      let renderPage;
      if(Context.Login===user_id){
        renderPage=<section className='userPage'>
            <form onSubmit={handleSubmit} className='addToFridge'>
            <label htmlFor='newIngredient'>Add ingredient to the shopping List:  </label>
            <input type='text' id='newIngredient' name='newIngredient' required/>
            <button type='submit' className='submitBtn'>Add</button>
            <br/>
            <br/>
            <nav>
                My Shopping List
            </nav> 
        </form>
        </section>
      }
      else renderPage=<h2 className='notLogin'>You have not Log in yet</h2>
    return (
            <div>
              <Link to='/' style={{ textDecoration: 'none' }}>
                <header>What Should I Make?</header>
              </Link>{renderPage}
              <Display ingredients = {Context.ingredients.ingredients}
                user_id={user_id}/>
                
            </div>
    )
}
