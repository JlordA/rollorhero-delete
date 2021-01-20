import React from 'react'
import {connect} from 'react-redux'

function Sandwich(props){

    const likeHandler = () => {
        let newLike = {
            sandwich_id: props.sandwich.id,
            user_id: props.user.id
         }
         props.likeSandwich(newLike)
         fetch(`http://localhost:3000/api/likes/`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLike),
          })
          .then(response => response.json())
          .then(newLike => {
            console.log('Success:', newLike);
          })
    }

    return(
        <div>
            <h4>Name: {props.sandwich.name}</h4>
            <p>Description: {props.sandwich.description}</p>
            <p>Price: {props.sandwich.price}</p>
            <p>Style: {props.sandwich.style}</p>
            <p>Rating: {props.sandwich.rating}</p>
            {/* <p>Rating: {console.log(props.sandwich)}</p> */}
            <p>Likes: {props.sandwich.likes.length === 0 ? 0 : props.sandwich.likes.length}  <button onClick={likeHandler}>Like</button></p>
        </div>
    )
}
function msp(state){
    return{
        sandwich: state.sandwich,
        user: state.user
    }
}

export default connect(msp)(Sandwich)