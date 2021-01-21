import React from 'react'
import {connect} from 'react-redux'
import { getSandwich, likeSandwich } from '../Redux/actions'

class Sandwich extends React.Component{

    state = {
        sandwichId: 0
    }

    componentDidUpdate(){
        if(this.props.sandwich.id !== this.state.sandwichId){
            this.setState({ sandwichId: this.props.sandwich.id}, () => this.props.getSandwich(this.props.sandwich))
            }
    
        }
        
        likeHandler = () => {
            this.setState({ sandwichId: 0 }, () => {
                let newLike = {
                sandwich_id: this.props.sandwich.id,
                user_id: this.props.user.id
             }
             this.props.sendLike(newLike)
            })
    }

    render(){
        let sandwich = this.props.sandwich        
        return(
            <div>
                <h4>Name: {sandwich.name}</h4>
                <p>Description: {sandwich.description}</p>
                <p>Price: {sandwich.price}</p>
                <p>Style: {sandwich.style}</p>
                <p>Rating: {sandwich.rating}</p>
                <p>Likes: {this.props.sandwich.likes === undefined ? 0 : this.props.sandwich.likes.length}  <button onClick={this.likeHandler}>Like</button></p>
            </div>
        )
    }
}

function mdp(dispatch){
    return{
        sendLike: (newLike) => dispatch(likeSandwich(newLike)),
        getSandwich: (sandwichObj) => dispatch(getSandwich(sandwichObj))
    }
}

function msp(state){
    return{
        sandwich: state.sandwich,
        likes: state.likes,
        user: state.user
    }
}

export default connect(msp, mdp)(Sandwich)