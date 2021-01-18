import React from 'react'
import {connect} from "react-redux"

class EditReviewForm extends React.Component {
    
    
    state = {
        title: this.props.review.title,
        date: this.props.review.date,
        body: this.props.review.body,
        rating: this.props.review.rating
    }

    render() {
        console.log(this.props)
        return (
        <>
        <h3>Write A Review</h3>
            <form onSubmit={this.submitHandler}>
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.handleChange}/>
                <br></br>
                <input type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
                <br></br>
                <textarea name="body" placeholder="tell us about your experience" value={this.state.body} onChange={this.handleChange}></textarea><br></br>
                <input type="number" name="rating" value={this.state.rating} onChange={this.handleChange}/><br></br>
                <button>Submit</button>
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

export default connect(msp)(EditReviewForm)