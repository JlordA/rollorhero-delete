import React from 'react'
import { connect } from 'react-redux'
import { reviewEditClicked, reviewClick, getSandwiches } from '../Redux/actions'
import SandwichListItem from './SandwichListItem'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

class Review extends React.Component {

    componentDidMount() {
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
            return <Button onClick={this.editClickHandler}>Edit</Button>
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
                if (deliSandwich.name === sandwich.name) {
                    return <SandwichListItem key={sandwich.id} sandwichObj={sandwich} />
                }
            })
        })
    }


    render() {
        const deli = this.props.deli
        return (
            <ReviewWrapper>
                <ReviewDetails>
                    <h4>{this.props.review.title}</h4>
                    <p>{this.dateHandler(this.props.review.date)}</p>
                    <h4>{this.props.deli.name}</h4>
                    <p>{this.props.review.rating}</p>
                    <p>{this.props.review.body}</p>
                    <Button onClick={this.reviewsClickHander}>All Reviews</Button>
                    {this.renderButton()}
                </ReviewDetails>
                <Associated>
                    Sandwiches Reviewed:
                    <h5>{deli.length === 0 ? <p>fetching sandwiches</p> : this.sandwichOfDeliReview()}</h5>
                </Associated>
            </ReviewWrapper>
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

const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    border: 2px solid black;
`
const ReviewDetails = styled.div`
    justify-content: left;
    border: 2px solid black;
    word-wrap: normal;
`

const Associated = styled.div`
    justify-content: right;
    border: 2px solid black;
`