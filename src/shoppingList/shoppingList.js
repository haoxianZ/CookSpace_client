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
    const [ingredients, setIngredients]= useState([])
    useEffect(()=>{
      async function fetchData(){
        const savedIngredients = await fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/ingredients`);
        const jsonIngredients = await savedIngredients.json();
       setIngredients(jsonIngredients)
      console.log(jsonIngredients)
      }
      fetchData()
      
    },[])
    if (!user_id){return null};
   const handleDeleteIngredient=(id)=>{
    id = parseInt(id);
   const newArray = ingredients.filter(ingredient=>ingredient.ingredient_id!==id)
    setIngredients(
      newArray
    )
  }

    const handleSubmit=e=> {
        e.preventDefault()
        const newIngredient = {
          ingredient: {name:e.target['newIngredient'].value},
          }
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
            })
          .catch(error => {
            console.error({ error })
          })
      }
      let renderPage;

        renderPage=<section className='userPage'>
            {/* <form onSubmit={handleSubmit} className='addToFridge'>
            <label htmlFor='newIngredient'>Add ingredient to the shopping List:  </label>
            <input type='text' id='newIngredient' name='newIngredient' required/>
            <button type='submit' className='submitBtn'>Add</button>
            <br/>
            <br/> */}
            <nav>
                My Shopping List
            </nav> 
        {/* </form> */}
        </section>
      const handleDelete = (e)=>{
        const ingredient_id=e.target.value;
        fetch(`${config.SERVER_ENDPOINT}/users/${user_id}/ingredients/${ingredient_id}`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          }})
          .then(res => {
            if (!res.ok) return res.json().then(e => Promise.reject(e))
          handleDeleteIngredient(ingredient_id)
          })
          .catch(error => {
            console.error({ error })
          })

      }
      const renderList = ingredients.map((ingredient,index)=>{
        const JsonifyIngrerdient = JSON.parse(ingredient.ingredient)
        return(
          <tr key={index}>
            <td style={{verticalAlign:'center'}}>
               <input type="checkbox"
            id={JsonifyIngrerdient.name} name={JsonifyIngrerdient.name} value={JsonifyIngrerdient.name}/>
            <label for={JsonifyIngrerdient.name}> {JsonifyIngrerdient.name} </label>
            </td>
           <td>
              {JsonifyIngrerdient.amount?JsonifyIngrerdient.amount:null}
           </td>
           <td>{JsonifyIngrerdient.unit?JsonifyIngrerdient.unit:null}</td>
           <td>
             <button value={ingredient.ingredient_id} onClick={handleDelete} >remove</button>
            </td>
           <br></br>
            
          </tr>
        )
      })
    return (
            <div>
            <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`} />

             {renderPage}
              <table style={{width:100+'%'}}>
                 {renderList}
              </table>
               
              
                
            </div>
    )
}
