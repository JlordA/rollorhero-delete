import React from 'react'
import { connect } from 'react-redux'
import { loginUser, userLoggedIn } from '../Redux/actions'
import { Button } from 'semantic-ui-react'

class LoginForm extends React.Component {

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
        this.props.userLoggedIn()
    }

    render() {

        return (
            <div className="login-form">
                <form onSubmit={this.submitHandler}>
                    <h1>ROLL OR HERO</h1>
                    <h3>Login Form</h3>
                    <p><input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.changeHandler} /></p>
                    <p><input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.changeHandler} /></p>
                    <Button>Login</Button>
                </form>
            </div>
        )
    }
}

function mdp(dispatch) {
    return {
        currentUser: (userObj) => dispatch(loginUser(userObj)),
        userLoggedIn: () => dispatch(userLoggedIn())
    }
}

export default connect(null, mdp)(LoginForm)