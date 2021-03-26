import React,{useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import config from "./config";
import { useHistory } from 'react-router';
import Header from './header';
export default function Review(props){
    const [rating, setRating] = useState(3);
    const history = useHistory();
    const  user_id  = props.match.params.userid;
    const recipe_id = props.match.params.recipe_id;
    const handleReview=(e)=>{
        e.preventDefault();
        console.log(e.target['comment'].value)
        const review = {
            api_id: recipe_id,
            comment:e.target['comment'].value,
            liked:rating,
            user_id:user_id

        }
        fetch(`${config.SERVER_ENDPOINT}/recipes`, {
            method: 'Post',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(review)
          })
            .then(res => {
              if (!res.ok){
                return res.json().then(e => Promise.reject(e))
              }
              return res.json()
            })
            .then(event => {
              history.push(`/users/${user_id}`);
              return event
            })
    }

    
    return(
        <div className="review">
            <Header home={`/users/${user_id}`} profile={`/users/${user_id}/profile`} events={`/users/${user_id}/events`} list={`/users/${user_id}/list`}/>
            <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend">Rating</Typography>
                <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
                />
            </Box>
            <form onSubmit={handleReview}>
                <input type="text" id="comment" maxLength="140">
                </input>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}