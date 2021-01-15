import React from 'react'
import {connect} from 'react-redux'
import {loginUser} from '../Redux/actions' 

class LoginForm extends React.Component{

    state = {
        username: "",
        password: ""
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = (e) => {
        e.preventDefault()
        this.props.currentUser(this.state)
    }

    render(){

        return(
            <form onSubmit={this.submitHandler}>
                <h3>Login Form</h3>
                <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler}/>
                <input type="text" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler}/>
                <button>Login</button>
            </form>
        )
    }
}

function mdp(dispatch){
    return{
        currentUser: (userObj) => dispatch(loginUser(userObj))
    }
}

export default connect(null, mdp)(LoginForm)