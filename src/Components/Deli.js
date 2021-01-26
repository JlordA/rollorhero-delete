import React from 'react'
import {connect} from 'react-redux'
import { renderSandwichForm, deliClick } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import SandwichListItem from './SandwichListItem'

class Deli extends React.Component{

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

    render(){
        console.log(this.props.deli.sandwiches)
        return(
            <div>
                <h5>{this.props.deli.name}</h5>
                <p>{this.props.deli.address}</p>
                <p>{this.props.deli.style}</p>
                <p>{this.props.deli.hours_open}</p>
                <p>{this.props.deli.neighborhood}</p>
                <p>{this.props.deli.bourough}</p>
                <h5>Associated Sandwiches</h5>
                <p>{this.props.deli.sandwiches.length === 0 ? null : this.sandwichesOfDeli() }</p>
                <Button onClick={this.delisClickHandler}>All Delis</Button>
                <Button onClick={this.clickHandler}>Add Sandwich</Button>
            </div>
        )
    }
}

function msp(state){
    return{
        deli: state.deli
    }
}

function mdp(dispatch){
    return{
        deliClicked: () => dispatch(deliClick()),
        renderSandwichForm: () => dispatch(renderSandwichForm())
    }
}

export default connect(msp, mdp)(Deli)