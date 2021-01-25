import React from 'react'
import {connect} from 'react-redux'
import {postDeli, renderDeliForm, resetDeliLocation} from '../Redux/actions'
import { Button } from 'semantic-ui-react'

class AddDeliForm extends React.Component{

    state = {
        name: "",
        address: "",
        style: "",
        hours_open: "",
        neighborhood: "",
        borough: ""
    }

    changeHanler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        let deliObj = {
            name: this.state.name,
            address: this.state.address,
            style: this.state.style,
            hours_open: this.state.hours_open,
            neighborhood: this.state.neighborhood,
            borough: this.state.borough,
            lat: this.props.deliLocation.coordinates["lat"],
            lng: this.props.deliLocation.coordinates["lng"]
        }
        // console.log(deliObj)
        this.props.createDeli(deliObj)
        this.props.showDeliForm()
        this.props.clearDeliCache()
    }

    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <p><input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHanler}/></p>
                <p><input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.changeHanler}/></p>
                NEEDS TO BE DROPDOWN FOR STYLE
                <p><input type="dropdown" name="style" placeholder="style" value={this.state.style} onChange={this.changeHanler}/></p>
                <p><input type="text" name="hours_open" placeholder="hours" value={this.state.hours_open} onChange={this.changeHanler}/></p>
                <p><input type="text" name="neighborhood" placeholder="neighborhood" value={this.state.neighborhood} onChange={this.changeHanler}/></p>
                <p><input type="text" name="borough" placeholder="borough"value={this.state.borough} onChange={this.changeHanler}/></p>
                <Button>Add Deli</Button>
            </form>
        )
    }
}

function msp(state){
    return{
        deliLocation: state.deliLocation
    }
}
function mdp(dispatch){
    return{
        createDeli: (newDeli) => dispatch(postDeli(newDeli)),
        showDeliForm: () => dispatch(renderDeliForm()),
        clearDeliCache: () => dispatch(resetDeliLocation())
    }
}

export default connect(msp, mdp)(AddDeliForm)