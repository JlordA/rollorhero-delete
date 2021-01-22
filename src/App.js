import './App.css';
import React from 'react'
import HomeContainer from './Containers/HomeContainer';
import LoginForm from './Components/LoginForm'
import {connect} from 'react-redux'
import { loginUser } from './Redux/actions';


class App extends React.Component{

  componentDidMount = () => {
    const user = localStorage.getItem("USER_DATA")
    if(user){ this.props.loginUser(user)}
  }

  render(){

    return (
      <>
        <LoginForm/>
        <HomeContainer />
      </>
    );
  }
}

function mdp(dispatch){
  return{
    loginUser: (userObj) => dispatch(loginUser(userObj))
  }
}

export default connect(null, mdp)(App);

