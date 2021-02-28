import React from 'react';

export default function CreateEvent(props){
    const  user_id  = props.match.params.userId;
    const recipe_id= props.match.params.recipe_id;
    console.log(user_id,recipe_id)
    return(
        <div className="createEvent">

        </div>
    )    
}