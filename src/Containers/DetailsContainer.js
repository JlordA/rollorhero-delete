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
import SandwichList from '../Components/SandwichList'

class DetailsContainer extends React.Component {

    state = {
        tab: "review"
    }

    reviewTabRender = () => {
        if (this.props.reviewFormClicked === true) {
            return <ReviewCreateForm />
        } else if (this.props.reviewEditClicked === true) {
            return <EditReviewForm />
        } else if (this.props.reviewBeenClicked === true) {
            return <Review />
        } else {
            return <Reviews />
        }
    }

    deliTabRender = () => {
        if (this.props.deliFormClicked === true) {
            return <AddDeliForm />
        } else if (this.props.deliClicked === true) {
            return <Deli />
        } else {
            return <DeliList />
        }
    }

    sandwichTabRender = () => {
        if (this.props.sandwichFormClicked === true) {
            return <CreateSandwichForm />
        } else if (this.props.sandwichBeenClicked === true) {
            return <Sandwich />
        } else {
            return <SandwichList />
        }
    }

    clickHandler = (e) => {
        // console.log("working", e.target.id)
        this.setState({ tab: e.target.id })
    }

    tabRender = () => {
        if (this.state.tab === "review") {
            return this.reviewTabRender()
        } else if (this.state.tab === "deli") {
            return this.deliTabRender()
        } else {
            return this.sandwichTabRender()
        }
    }
    render() {
        // console.log(this.state.tab)
        return (
            <div>
                <div className="tab-parent" >
                    <div id="review" className="child" onClick={this.clickHandler}>
                        <span>REVIEWS</span>
                    </div>
                    <div id="deli" className="child" onClick={this.clickHandler}>
                        <span>DELIS</span>
                    </div>
                    <div id="sandwich" className="child" onClick={this.clickHandler}>
                        <span>SANDWICHES</span>
                    </div>
                </div>
                <div>
                    {this.tabRender()}
                    {/* {this.detailsRender()} */}
                </div>
            </div>
        )
    }
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

