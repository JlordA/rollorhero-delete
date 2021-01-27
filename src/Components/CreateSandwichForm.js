import React from 'react'
import {connect} from 'react-redux'
import { postSandwichAndDeliSandwich, renderSandwichForm, deliClick} from '../Redux/actions'
import { Form, Input, Button, Select, TextArea } from 'semantic-ui-react'
import styled from 'styled-components'

class CreateSandwichForm extends React.Component{

    state = {
        name: "",
        description: "",
        price: 0,
        style: "",
        rating: 0,
        image: ""
    }

    sandwichStyleOptions = [
        { key: '', text: '', value: '' },
        { key: 'Burger', text: 'Burger', value: 'Burger' },
        { key: 'Cheese Steak', text: 'Cheese Steak', value: 'Cheese Steak' },
        { key: 'Melt', text: 'Melt', value: 'Melt' },
        { key: 'Breakfast', text: 'Breakfast', value: 'Breakfast' },
        { key: 'SUB', text: 'SUB', value: 'SUB' },
        { key: 'Club', text: 'Club', value: 'Club' },
        { key: 'Cutlet', text: 'Cutlet', value: 'Cutlet' },
    ]

    styleHandler = (e, data) => {
        console.log(data.value)
        this.setState({ style: data.value})
    }

    ratingHandler = (e, { value }) => {
        this.setState({ rating: value })
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
            // <form onSubmit={this.submitHandler}>
            //     <h3>Add A Sandwich</h3>
            //     <p>Name</p>
            //     <input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHandler}/>
            //     <p>Description</p>
            //     <input type="text" name="description" placeholder="description" value={this.state.description} onChange={this.changeHandler}/>
            //     <p>Price</p>
            //     <input type="number" name="price" placeholder="price" value={this.state.price} onChange={this.changeHandler}/>
            //     {/* <p>Style</p>
            //     <input type="text" name="style" placeholder="style" value={this.state.style} onChange={this.changeHandler}/> */}
            //     <p>Style</p>
            //     <select name="style">
            //         <option value={this.state.style}>Burger</option>
            //         <option value={this.state.style}>Cheese Steak</option>
            //         <option value={this.state.style}>Melt</option>
            //         <option value={this.state.style}>Breakfast</option>
            //         <option value={this.state.style}>SUB</option>
            //         <option value={this.state.style}>Club</option>
            //         <option value={this.state.style}>Cutlet</option>
            //     </select>
            //     <p>Rating</p>
            //     <input type="integer" name="rating" placeholder="rating" value={this.state.rating} onChange={this.changeHandler}/>
            //     <p>Image</p>
            //     <input type="text" name="image" placeholder="image" value={this.state.image} onChange={this.changeHandler}/>
            //     <Button>Submit</Button>
            // </form>
            <FormWrapper>
                <h1>Add A Sandwich</h1>
                <Form onSubmit={this.submitHandler}>
                    <Form.Group >
                        <Form.Field
                        // id='form-input-control-first-name'
                        control={Input}
                        label='Name'
                        name='name'
                        value={this.state.name}
                        placeholder='Name'
                        onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group >
                    <Form.Field
                        control={TextArea}
                        label='Description:'
                        placeholder='How was it...'
                        value={this.state.description}
                        name='description'
                        onChange={this.handleChange}
                    />
                    </Form.Group>
                    <Form.Group >
                        <Form.Field
                        control={Select}
                        label={{ children: 'Style', htmlFor: 'form-select-control-gender' }}
                        name='style'
                        options={this.sandwichStyleOptions}
                        placeholder='Style'
                        search
                        searchInput={{ id: 'form-select-control-gender' }}
                        onChange={this.styleHandler}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Field
                            // id='form-input-control-first-name'
                            control={Input}
                            label='Price'
                            name='price'
                            value={this.state.price}
                            placeholder='Price'
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group inline>
                        <label>Rating:</label>
                        <Form.Radio
                            label='One⭐️'
                            value='1'
                            name='rating'
                            checked={this.state.rating === '1'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Two⭐️'
                            value='2'
                            name='rating'
                            checked={this.state.rating === '2'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Three⭐️'
                            value='3'
                            name='rating'
                            checked={this.state.rating === '3'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Four⭐️'
                            value='4'
                            name='rating'
                            checked={this.state.rating === '4'}
                            onChange={this.ratingHandler}
                        />
                        <Form.Radio
                            label='Five⭐️'
                            value='5'
                            name='rating'
                            checked={this.state.rating === '5'}
                            onChange={this.ratingHandler}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Field
                            // id='form-input-control-last-name'
                            control={Input}
                            label='Image'
                            name='image'
                            value={this.state.image}
                            placeholder='Image'
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Field control={Button}>Add Deli</Form.Field>
                </Form>
            </FormWrapper>
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

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    margin-top: 40px;
`