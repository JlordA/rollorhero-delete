import React from 'react'
import { connect } from 'react-redux'
import { postDeli, renderDeliForm, resetDeliLocation } from '../Redux/actions'
import { Form, Input, Button, Select } from 'semantic-ui-react'
import styled from 'styled-components'

class AddDeliForm extends React.Component {

    state = {
        name: "",
        address: "",
        style: "",
        hours_open: "",
        neighborhood: "",
        borough: ""
    }

    deliStyleOptions = [
        { key: '', text: '', value: '' },
        { key: 'Bodega', text: 'Bodega', value: 'Bodega' },
        { key: 'Diner', text: 'Diner', value: 'Diner' },
        { key: 'Jewish Deli', text: 'Jewish Deli', value: 'Jewish Deli' },
        { key: 'Restaurant', text: 'Restaurant', value: 'Restaurant' },
        { key: 'Italian Deli', text: 'Italian Deli', value: 'Italian Deli' },
        { key: 'Vietnamese Deli', text: 'Vietnamese Deli', value: 'Vietnamese Deli' },
    ]

    changeHandler = (e) => {
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    styleHandler = (e, data) => {
        console.log(data.value)
        this.setState({ style: data.value})
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
        console.log(deliObj)
        this.props.createDeli(deliObj)
        this.props.showDeliForm()
        this.props.clearDeliCache()
    }

    render() {
        return (
            // <form onSubmit={this.submitHandler}>
            //     <p><input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.changeHanler}/></p>
            //     <p><input type="text" name="address" placeholder="address" value={this.state.address} onChange={this.changeHanler}/></p>
            //     NEEDS TO BE DROPDOWN FOR STYLE
            //     <p><input type="dropdown" name="style" placeholder="style" value={this.state.style} onChange={this.changeHanler}/></p>
            //     <p><input type="text" name="hours_open" placeholder="hours" value={this.state.hours_open} onChange={this.changeHanler}/></p>
            //     <p><input type="text" name="neighborhood" placeholder="neighborhood" value={this.state.neighborhood} onChange={this.changeHanler}/></p>
            //     <p><input type="text" name="borough" placeholder="borough"value={this.state.borough} onChange={this.changeHanler}/></p>
            //     <Button>Add Deli</Button>
            // </form>
            <FormWrapper>
                <h1>Add A Deli</h1>
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
                        // id='form-input-control-last-name'
                        control={Input}
                        label='Address'
                        name='address'
                        value={this.state.address}
                        placeholder='Address'
                        onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Field
                        control={Select}
                        label={{ children: 'Style', htmlFor: 'form-select-control-gender' }}
                        name='style'
                        options={this.deliStyleOptions}
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
                            label='Hours'
                            name='hours_open'
                            value={this.state.hours_open}
                            placeholder='Hours Open'
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Field
                            // id='form-input-control-last-name'
                            control={Input}
                            label='Neighborhood'
                            name='neighborhood'
                            value={this.state.neighborhood}
                            placeholder='Neighborhood'
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    <Form.Group >
                        <Form.Field
                            // id='form-input-control-last-name'
                            control={Input}
                            label='Borough'
                            name='borough'
                            value={this.state.borough}
                            placeholder='Borough'
                            onChange={this.changeHandler}
                        />
                    </Form.Group>
                    {/* <Form.Field
                        content='Confirm'
                        label='Add Deli'
                    /> */}
                    <Form.Field control={Button}>Add Deli</Form.Field>
                </Form>
            </FormWrapper>
        )
    }
}

function msp(state) {
    return {
        deliLocation: state.deliLocation
    }
}
function mdp(dispatch) {
    return {
        createDeli: (newDeli) => dispatch(postDeli(newDeli)),
        showDeliForm: () => dispatch(renderDeliForm()),
        clearDeliCache: () => dispatch(resetDeliLocation())
    }
}

export default connect(msp, mdp)(AddDeliForm)

const FormWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    margin-top: 40px;
`