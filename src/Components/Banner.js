import React from 'react'
import { Button, Header, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {userLoggedIn, logOutUser} from '../Redux/actions'



function Banner(props){

    const clickHandler = () => {
        props.logOutUser()
        props.userLoggedIn()
    }

    return(
        <div>
            <Segment>
                <Header as='h1' color='brown' textAlign='center'>ROLL OR HERO</Header>
                <Button onClick={clickHandler}>Log Out</Button>
            </Segment>
        </div>
    )
}

function mdp(dispatch){
    return{
        userLoggedIn: () => dispatch(userLoggedIn()),
        logOutUser: () => dispatch(logOutUser())
    }
}

export default connect(null, mdp)(Banner)

