import React from 'react'
import {connect} from "react-redux"
import { patchReview, reviewEditClicked } from '../Redux/actions'
import { Button } from 'semantic-ui-react'

class EditReviewForm extends React.Component {
    
    
    state = {
        id: this.props.review.id,
        title: this.props.review.title,
        date: this.props.review.date,
        body: this.props.review.body,
        rating: this.props.review.rating
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitHandler = (e) => {
        e.preventDefault()
        this.props.reviewUpdate(this.state)
        this.props.editReview()
    }

    render() {
        console.log(this.props.review.id)
        return (
        <>
        <h3>Write A Review</h3>
            <form onSubmit={this.submitHandler}>
                <p>Title</p>
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.handleChange}/>
                <p>Date</p>
                <input type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
                <p>Body</p>
                <textarea name="body" placeholder="tell us about your experience" value={this.state.body} onChange={this.handleChange}></textarea>
                <p>Rating</p>
                <input type="number" name="rating" value={this.state.rating} onChange={this.handleChange}/><br></br>
                <Button>Submit</Button>
            </form>
        </>
        )
    }
}

function msp(state){
    return{
        review: state.review
    }
}

function mdp(dispatch){
    return{
        reviewUpdate: (reviewObj) => dispatch(patchReview(reviewObj)),
        editReview: () => dispatch(reviewEditClicked())
    }
}

export default connect(msp, mdp)(EditReviewForm)