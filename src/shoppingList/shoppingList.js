import React, { useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import context from '../context';
import config from '../config';
import {useHistory} from 'react-router-dom';
import Header from '../header'
import './shoppingList.css';
export default function ShoppingList(props){
    const history = useHistory();
    const Context = useContext(context);
    const  user_id  = props.match.params.userid;
    const [ingredients, setIngrerdients]= useState([])
    useEffect(()=>{
      async function fetchData(){
        const savedIngredients = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/ingredients`);
        const jsonIngredients = await savedIngredients.json();
       setIngrerdients(jsonIngredients)
      console.log(jsonIngredients)
      }
      fetchData()
      
    },[])
    if (!user_id){return null};
   
    const handleSubmit=e=> {
        e.preventDefault()
        const newIngredient = {
          ingredient: e.target['newIngredient'].value}
        fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/ingredients`, {
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
            }).then(history.push(`/users/${user_id}/list`)
            )
          .catch(error => {
            console.error({ error })
          })
      }
      let renderPage;

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
      const renderList = ingredients.map((ingredient,index)=>{
        const JsonifyIngrerdient = JSON.parse(ingredient.ingredient)
        return(
          <li key={index}>
            <input type="checkbox"
            id={JsonifyIngrerdient.name} name={JsonifyIngrerdient.name} value={JsonifyIngrerdient.name}/>
            <label for={JsonifyIngrerdient.name}> {JsonifyIngrerdient.name}
            {JsonifyIngrerdient.amount}
            {JsonifyIngrerdient.unit}
            </label><br></br>
           
          </li>
        )
      })
    return (
            <div>
            <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />

             {renderPage}
              <ul>
                {renderList}
              </ul>
                
            </div>
    )
}
