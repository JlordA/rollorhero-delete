import React from 'react'
import ReviewCreateForm from '../Components/ReviewCreateForm'
import {connect} from 'react-redux'
import Reviews from '../Components/ReviewsList'
import Review from '../Components/Review'
import EditReviewForm from '../Components/EditReviewForm'
import Sandwich from '../Components/Sandwich'
import AddDeliForm from '../Components/AddDeliForm'


function DetailsContainer(props){

    const detailsRender = () => {
        if (props.reviewFormClicked === true){
            return <ReviewCreateForm />
        } else if (props.deliFormClicked === true){
            return <AddDeliForm />
        } else if (props.sandwichBeenClicked === true){
            return <Sandwich/>
        }else if (props.reviewEditClicked === true){
            return <EditReviewForm/>
        } else if (props.reviewBeenClicked === true){
            return <Review/>
        } else {
            return <Reviews />
        }
    }
    // console.log(props.deliFormClicked)
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
        reviewEditClicked: state.reviewEditClicked,
        deliFormClicked: state.deliFormClicked,
        sandwichBeenClicked: state.sandwichBeenClicked
    }
}

export default connect(msp)(DetailsContainer)