import React from 'react'
import ReviewCreateForm from '../Components/ReviewCreateForm'
import {connect} from 'react-redux'
import Reviews from '../Components/ReviewsList'
import Review from '../Components/Review'
import EditReviewForm from '../Components/EditReviewForm'


function DetailsContainer(props){

    const detailsRender = () => {
        if (props.reviewFormClicked === true){
            return <ReviewCreateForm />
        } else if (props.reviewEditClicked === true){
            return <EditReviewForm/>
        } else if (props.reviewBeenClicked === true){
            return <Review/>
        } else {
            return <Reviews />
        }
    }

    return(
        <>
            {detailsRender()}
        </>
    )
}

function msp(state){
    return { 
        reviewFormClicked: state.reviewFormClicked,
        reviewBeenClicked: state.reviewBeenClicked,
        reviewEditClicked: state.reviewEditClicked
    }
}

export default connect(msp)(DetailsContainer)