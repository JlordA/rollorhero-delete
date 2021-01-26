import React from 'react'
import { connect } from 'react-redux'
import { renderSandwichForm, deliClick } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import SandwichListItem from './SandwichListItem'
import styled from 'styled-components'

class Deli extends React.Component {

    clickHandler = () => {
        this.props.renderSandwichForm()
    }

    delisClickHandler = () => {
        this.props.deliClicked()
    }

    sandwichesOfDeli = () => {
        return this.props.deli.sandwiches.map(sandEl => {
            return <SandwichListItem key={sandEl.id} sandwichObj={sandEl} />
        })
    }

    render() {
        console.log(this.props.deli.sandwiches)
        return (
            <DeliWrapper>
                <DeliDetails>
                    <h5>{this.props.deli.name}</h5>
                    Address:
                    <Detail>{this.props.deli.address}</Detail>
                    Style:
                    <Detail>{this.props.deli.style}</Detail>
                    Hours:
                    <Detail>{this.props.deli.hours_open}</Detail>
                    Neighborhood:
                    <Detail>{this.props.deli.neighborhood}</Detail>
                    Borough:
                    <Detail>{this.props.deli.bourough}</Detail>
                    <Button onClick={this.delisClickHandler}>All Delis</Button>
                    <Button onClick={this.clickHandler}>Add Sandwich</Button>
                </DeliDetails>
                <Associated>
                    <h5>Associated Sandwiches</h5>
                    <Detail>{this.props.deli.sandwiches.length === 0 ? null : this.sandwichesOfDeli()}</Detail>
                </Associated>
            </DeliWrapper>
        )
    }
}

function msp(state) {
    return {
        deli: state.deli
    }
}

function mdp(dispatch) {
    return {
        deliClicked: () => dispatch(deliClick()),
        renderSandwichForm: () => dispatch(renderSandwichForm())
    }
}

export default connect(msp, mdp)(Deli)

const Associated = styled.div`
    justify-content: right;
    border: 2px solid black;
`
const DeliDetails = styled.div`
    justify-content: left;
    border: 2px solid black;
`
const DeliWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    border: 2px solid black;
`

const Detail = styled.p`
    font-weight: bold;
`