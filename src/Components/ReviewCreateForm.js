import React from 'react'
import { Button, Form, Input, Radio, TextArea } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import { connect } from 'react-redux'
import { postReview } from '../Redux/actions';

class ReviewForm extends React.Component {


    state = {
        title: "",
        date: "",
        body: "",
        rating: ""
    }
    // handleChange = (e, { value }) => this.setState({ value })

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })

    }
    // render() {
    //     return (
    //         <>

    submitHandler = (e) => {
        e.preventDefault()
        console.log(this.props.user.id)
        console.log(this.props.deli.id)

        // console.log(this.state)
        let reviewObj = {
            title: this.state.title,
            date: this.state.date,
            body: this.state.body,
            rating: parseInt(this.state.rating),
            user_id: this.props.user.id,
            deli_id: this.props.deli.id
        }
        this.props.sendForm(reviewObj)
    }
    render() {
        // const { value } = this.state
        return (
        //     <Form onSubmit={this.submitHandler}>
        //         <Form.Group widths='equal'>
        //             <Form.Field
        //                 control={Input}
        //                 label='Title'
        //                 name='title'
        //                 placeholder='Title'
        //                 value={this.state.title}
        //                 onChange={this.handleChange}
        //             />
        //             <br></br>
        //             <DateInput
        //                 name='date'
        //                 placeholder='Date'
        //                 value={this.state.date}
        //                 iconPosition='left'
        //                 onChange={this.handleChange}
        //             />
        //         </Form.Group>
        //         <Form.Group inline>
        //             <label>Rating</label>
        //             <Form.Field
        //                 control={Radio}
        //                 label='One⭐️'
        //                 value={this.state.rating}
        //                 name='rating'
        //                 checked={'1'}
        //                 onChange={this.handleChange}
        //             />
        //             <Form.Field
        //                 control={Radio}
        //                 label='Two⭐️'
        //                 value={this.state.rating}
        //                 name='rating'
        //                 checked={'2'}
        //                 onChange={this.handleChange}
        //             />
        //             <Form.Field
        //                 control={Radio}
        //                 label='Three⭐️'
        //                 value={this.state.rating}
        //                 name='rating'
        //                 checked={'3'}
        //                 onChange={this.handleChange}
        //             />
        //             <Form.Field
        //                 control={Radio}
        //                 label='Four⭐️'
        //                 value={this.state.rating}
        //                 name='rating'
        //                 checked={'4'}
        //                 onChange={this.handleChange}
        //             />
        //             <Form.Field
        //                 control={Radio}
        //                 label='Five⭐️'
        //                 value={this.state.rating}
        //                 name='rating'
        //                 checked={'5'}
        //                 onChange={this.handleChange}
        //             />
        //         </Form.Group>
        //         <Form.Field
        //             control={TextArea}
        //             label='Details'
        //             placeholder='Tell us about your experience...'
        //             value={this.state.body}
        //             name='body'
        //             onChange={this.handleChange}
        //         />
        //         <Form.Field control={Button}>Submit</Form.Field>
        //     </Form>
        // )
        <>
            <h3>Write A Review</h3>
            <form onSubmit={this.submitHandler}>
                <input type="text" name="title" placeholder="title" value={this.state.title} onChange={this.handleChange}/>
                <br></br>
                <input type="date" name="date" value={this.state.date} onChange={this.handleChange}/>
                <br></br>
                <textarea name="body" placeholder="tell us about your experience" value={this.state.body} onChange={this.handleChange}></textarea><br></br>
                <input type="number" name="rating" value={this.state.rating} onChange={this.handleChange}/><br></br>
                <button>Submit</button>
            </form>
        </>
        )
    }
}

function msp(state){
    return{
        user: state.user,
        deli: state.deli
    }
}

function mdp(dispatch) {
    return {
        sendForm: (reviewObj) => dispatch(postReview(reviewObj))
    }
}

export default connect(msp, mdp)(ReviewForm)