import React from 'react'
import {connect} from 'react-redux'
import { reviewClick, renderReview, getDeliOfReview } from '../Redux/actions'

class ReviewListItem extends React.Component{

    clickHandler = () => {
        // console.log("clicked", this.props.reviewObj.deli_id)
        this.props.clickedReview()
        this.props.showReview(this.props.reviewObj)
        this.props.getDeli(this.props.reviewObj.deli_id)
    }

    render(){
        return(
            <ul className="ul">
                <li onClick={this.clickHandler}>{this.props.reviewObj.title}   -    Deli: {this.props.reviewObj.deli.name}     /     Rating: {this.props.reviewObj.rating} </li>
            </ul>
        )
    }
}


function mdp(dispatch){
    return{
        clickedReview: () => dispatch(reviewClick()),
        showReview: (reviewObj) => dispatch(renderReview(reviewObj)),
        getDeli: (deli_id) => dispatch(getDeliOfReview(deli_id))

    }
}

export default connect(null, mdp)(ReviewListItem)