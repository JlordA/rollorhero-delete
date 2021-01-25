import React from 'react'
import {connect} from 'react-redux'
import {renderSandwichForm} from '../Redux/actions'
import { Button } from 'semantic-ui-react'

class Deli extends React.Component{

    clickHandler = () => {
        this.props.renderSandwichForm()
     }
     
    render(){
        return(
            <div>
                <p>{this.props.deli.name}</p>
                <p>{this.props.deli.address}</p>
                <p>{this.props.deli.style}</p>
                <p>{this.props.deli.hours_open}</p>
                <p>{this.props.deli.neighborhood}</p>
                <p>{this.props.deli.bourough}</p>
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
        renderSandwichForm: () => dispatch(renderSandwichForm())
    }
}

export default connect(msp, mdp)(Deli)