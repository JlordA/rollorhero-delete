import React from 'react'
import {connect} from 'react-redux'
import { reviewClick, renderReview } from '../Redux/actions'

class ReviewListItem extends React.Component{

    clickHandler = () => {
        console.log("clicked")
        this.props.clickedReview()
        this.props.showReview(this.props.reviewObj)
    }

    render(){
        return(
            <ul>
                <li onClick={this.clickHandler}>Title: {this.props.reviewObj.title} Rating: {this.props.reviewObj.rating}</li>
            </ul>
        )
    }
}


function mdp(dispatch){
    return{
        clickedReview: () => dispatch(reviewClick()),
        showReview: (reviewObj) => dispatch(renderReview(reviewObj))
    }
}

export default connect(null, mdp)(ReviewListItem)