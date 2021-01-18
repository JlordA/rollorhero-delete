import React from 'react'
import {connect} from 'react-redux'
import {getReviews} from '../Redux/actions'
import Review from './Review'
import ReviewListItem from './ReviewListItem'

class Reviews extends React.Component{


    componentDidMount(){
        this.props.reviewList()
    }

    renderReviewList = () => {
        return this.props.reviews.map(reviewEl => {
            return <ReviewListItem key={reviewEl.id} reviewObj={reviewEl}/>
        })
    }

    renderReviewItem = () => {}

    render(){
        return(
        <>
        <h3>Reviews</h3>
        {this.renderReviewList()}
        </>
        )
    }
}

function msp(state){
    return{
        reviews: state.reviews
    }
}

function mdp(dispatch){
    return {
        reviewList: () => dispatch(getReviews())
    }
}

export default connect(msp, mdp)(Reviews)