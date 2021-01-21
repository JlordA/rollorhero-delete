import React from 'react'
import { connect } from 'react-redux'
import { reviewEditClicked, reviewClick, getSandwiches } from '../Redux/actions'
import SandwichListItem from './SandwichListItem'

class Review extends React.Component {

    componentDidMount(){
        this.props.allSandwiches()
    }

    editClickHandler = () => {
        this.props.editReview()
    }

    reviewsClickHander = () => {
        this.props.clickedReview()
    }

    renderButton = () => {
        if (this.props.user.id === this.props.review.user_id) {
            return <button onClick={this.editClickHandler}>Edit</button>
        }
    }

    dateHandler = (date) => {
        let newDate = new Date(date)
        return newDate.toLocaleDateString()
    }

    renderSandwich = () => {
        console.log("clicked:")
    }

    sandwichOfDeliReview = () => {
        // console.log(this.props.sandwiches)
        return this.props.deli.sandwiches.map(deliSandwich => {
            return this.props.sandwiches.map(sandwich => {
                if(deliSandwich.name === sandwich.name){
                    return <SandwichListItem key={sandwich.id} sandwichObj={sandwich}/>
                }
            })
        })
    }
    

    render() {
        const deli = this.props.deli
        return (
            <>
            Deli:
                <h4>{this.props.deli.name}</h4>
            Title:
            <h4>{this.props.review.title}</h4>
            Date:
                <p>{this.dateHandler(this.props.review.date)}</p>
            Rating:
                <p>{this.props.review.rating}</p>
            Body:
                <p>{this.props.review.body}</p>
            Sandwiches Reviewed:
                <h5>{deli.length === 0 ? <p>fetching sandwiches</p> : this.sandwichOfDeliReview()}</h5>
                <button onClick={this.reviewsClickHander}>All Reviews</button>
                {this.renderButton()}
            </>
        )
    }
}

function msp(state) {
    return {
        review: state.review,
        user: state.user,
        deli: state.deli,
        sandwiches: state.sandwiches
    }
}

function mdp(dispatch) {
    return {
        clickedReview: () => dispatch(reviewClick()),
        editReview: () => dispatch(reviewEditClicked()),
        allSandwiches: () => dispatch(getSandwiches())
    }
}
export default connect(msp, mdp)(Review)