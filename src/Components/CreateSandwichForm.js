import React from 'react'
import {connect} from 'react-redux'
import { postSandwichAndDeliSandwich, renderSandwichForm, deliClick} from '../Redux/actions'
import { Button } from 'semantic-ui-react'

class CreateSandwichForm extends React.Component{

    state = {
        name: "",
        description: "",
        price: 0,
        style: "",
        rating: 0
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        console.log("working")
        let sandwichObj = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            style: this.state.style,
            rating: this.state.rating
        }
        this.props.postSandwich(sandwichObj, this.props.deli.id)
        this.props.renderSandwichForm()
        this.props.deliClicked()
    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <h3>Add A Sandwich</h3>
                <p><input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler}/></p>
                <p><input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.changeHandler}/></p>
                <p><input type="number" name="price" placeholder="price" value={this.state.price} onChange={this.changeHandler}/></p>
                <p><input type="text" name="style" placeholder="style" value={this.state.style} onChange={this.changeHandler}/></p>
                <p><input type="integer" name="rating" placeholder="rating" value={this.state.rating} onChange={this.changeHandler}/></p>
                <Button>Submit</Button>
            </form>
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
        postSandwich: (sandwichObj, deliId) => dispatch(postSandwichAndDeliSandwich(sandwichObj, deliId)),
        deliClicked: () => dispatch(deliClick()),
        renderSandwichForm: () => dispatch(renderSandwichForm())
    }
}
export default connect(msp, mdp)(CreateSandwichForm)