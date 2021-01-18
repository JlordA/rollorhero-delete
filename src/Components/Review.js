import React from 'react'
import {connect} from 'react-redux'
import { reviewEditClicked } from '../Redux/actions'

class Review extends React.Component{

    clickHandler = () => {
        this.props.editReview()
    }

    renderButton = () => {
        if(this.props.user.id === this.props.review.user_id){
            return <button onClick={this.clickHandler}>Edit</button>
        }
    }

    render(){

        return(
            <>
            <h5>Title: {this.props.review.title}</h5>
            <p>Date: {this.props.review.date}</p>
            <p>Rating: {this.props.review.rating}</p>
            <p>Body: {this.props.review.body}</p>
            {this.renderButton()}
            </>
        )
    }
}

function msp(state){
    return{
        review: state.review,
        user: state.user
    }
}

function mdp(dispatch){
    return{
        editReview: () => dispatch(reviewEditClicked())
    }
}
export default connect(msp, mdp)(Review)