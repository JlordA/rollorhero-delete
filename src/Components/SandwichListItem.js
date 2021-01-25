import React from 'react'
import { connect } from 'react-redux'
import { getSandwich, sandwichBeenClicked } from '../Redux/actions'

class SandwichListItem extends React.Component {

    clickHandler = () => {
        this.props.getSandwich(this.props.sandwichObj)
        this.props.sandwichBeenClicked()
    }

    render() {
        return (
            <ul className="ul">
                <li onClick={this.clickHandler}>{this.props.sandwichObj.name}</li>
            </ul>
        )
    }
}

function mdp(dispatch) {
    return {
        getSandwich: (sandwichObj) => dispatch(getSandwich(sandwichObj)),
        sandwichBeenClicked: () => dispatch(sandwichBeenClicked())
    }
}

export default connect(null, mdp)(SandwichListItem)