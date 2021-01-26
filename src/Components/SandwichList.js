import React from 'react'
import { connect } from 'react-redux'
import { getSandwiches } from '../Redux/actions'
import SandwichListItem from './SandwichListItem'

class SandwichList extends React.Component {

    componentDidMount() {
        this.props.sandwichList()
    }

    renderSandwichList = () => {
        return this.props.sandwiches.map(sandEl => {
            return <SandwichListItem key={sandEl.id} sandwichObj={sandEl} />
        })
    }

    render() {
        return (
            <div className="tab-div">
                <h3>Sandwiches</h3>
                {this.renderSandwichList()}
            </div>
        )
    }
}

function msp(state) {
    return {
        sandwiches: state.sandwiches
    }
}

function mdp(dispatch) {
    return {
        sandwichList: () => dispatch(getSandwiches())
    }
}
export default connect(msp, mdp)(SandwichList)