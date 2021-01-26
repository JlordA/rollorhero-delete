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
        rating: 0,
        image: ""
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
            rating: this.state.rating,
            image: this.state.image
        }
        this.props.postSandwich(sandwichObj, this.props.deli.id)
        this.props.renderSandwichForm()
        this.props.deliClicked()
    }
    render(){
        return(
            <form onSubmit={this.submitHandler}>
                <h3>Add A Sandwich</h3>
                <p>Name</p>
                <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler}/>
                <p>Description</p>
                <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.changeHandler}/>
                <p>Price</p>
                <input type="number" name="price" placeholder="price" value={this.state.price} onChange={this.changeHandler}/>
                {/* <p>Style</p>
                <input type="text" name="style" placeholder="style" value={this.state.style} onChange={this.changeHandler}/> */}
                <p>Style</p>
                <select name="style">
                    <option value={this.state.style}>Burger</option>
                    <option value={this.state.style}>Cheese Steak</option>
                    <option value={this.state.style}>Melt</option>
                    <option value={this.state.style}>Breakfast</option>
                    <option value={this.state.style}>SUB</option>
                    <option value={this.state.style}>Club</option>
                    <option value={this.state.style}>Cutlet</option>
                </select>
                <p>Rating</p>
                <input type="integer" name="rating" placeholder="rating" value={this.state.rating} onChange={this.changeHandler}/>
                <p>Image</p>
                <input type="text" name="image" placeholder="image" value={this.state.image} onChange={this.changeHandler}/>
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