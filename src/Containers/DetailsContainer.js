import React from 'react'
import ReviewCreateForm from '../Components/ReviewCreateForm'
import { connect } from 'react-redux'
import Reviews from '../Components/ReviewsList'
import Review from '../Components/Review'
import EditReviewForm from '../Components/EditReviewForm'
import Sandwich from '../Components/Sandwich'
import AddDeliForm from '../Components/AddDeliForm'
import DeliList from '../Components/DeliList'
import Deli from '../Components/Deli'
import CreateSandwichForm from '../Components/CreateSandwichForm'

function DetailsContainer(props) {

    const detailsRender = () => {
        if (props.reviewFormClicked === true) {
            return <ReviewCreateForm />
        } else if (props.deliFormClicked === true) {
            return <AddDeliForm />
        } else if (props.sandwichBeenClicked === true) {
            return <Sandwich />
        } else if (props.reviewEditClicked === true) {
            return <EditReviewForm />
        } else if (props.reviewBeenClicked === true) {
            return <Review />
        } else if (props.sandwichFormClicked === true) {
            return <CreateSandwichForm />
        } else if (props.deliClicked === true) {
            return <Deli />
        } else if (props.deliList === true) {
            return <DeliList />
        } else {
            return <Reviews />
        }
    }

    const reviewTabRender = () => {
        if (props.reviewFormClicked === true) {
            return <ReviewCreateForm />
        } else if (props.reviewEditClicked === true) {
            return <EditReviewForm />
        } else if (props.reviewBeenClicked === true) {
            return <Review />
        } else {
            return <Reviews />
        }
    }

    const deliTabRender = () => {
        if (props.deliFormClicked === true) {
            return <AddDeliForm />
        } else if (props.deliClicked === true) {
            return <Deli />
        } else {
            return <DeliList />
        }
    }

    return (
        <>
            <div className="tab-parent">
                <div onClick={reviewTabRender}className="child-tab">
                    <p>REVIEWS</p>
                </div>
                <div onClick={deliTabRender} className="child-tab">
                    <p>DELIS</p>
                </div>
                <div className="child-tab">
                    <p>SANDWICHES</p>
                </div>
            </div>
            <div>
                {detailsRender()}
            </div>
        </>
    )
}

function msp(state) {
    return {
        reviewFormClicked: state.reviewFormClicked,
        reviewBeenClicked: state.reviewBeenClicked,
        reviewEditClicked: state.reviewEditClicked,
        deliFormClicked: state.deliFormClicked,
        sandwichBeenClicked: state.sandwichBeenClicked,
        deliList: state.deliList,
        deliClicked: state.deliClicked,
        sandwichFormClicked: state.sandwichFormClicked
    }
}

export default connect(msp)(DetailsContainer)