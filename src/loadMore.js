import React,{useContext} from 'react';
import context from './context';
export default function LoadMore(props){
    const {recipes} = useContext(context);
    const renderMore=recipes.slice(6,props.click*6+6).map((item,index)=>(
            <div key={index} className='subContainer'>
                <h4>{item.recipe.label}</h4>
                <img src={item.recipe.image} alt=''/>
                <ul>
                     {item.recipe.ingredients.map((ingre,i)=>(
                    <li key={i}>{ingre.text}</li>
                    ))}
                </ul>
               <a href={item.recipe.url}>Link to Full recipe</a>
            </div>
        ))
    return(
        <section className="container">   
            {renderMore}
        </section>
    )
}