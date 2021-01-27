import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {userLoggedIn, logOutUser} from '../Redux/actions'
import styled from 'styled-components'



function Banner(props){

    return(
            <BannerPic src="http://localhost:3001/img/rollorhero.png"/>
        
    )
}

function mdp(dispatch){
    return{
        userLoggedIn: () => dispatch(userLoggedIn()),
        logOutUser: () => dispatch(logOutUser())
    }
}

export default connect(null, mdp)(Banner)

const BannerPic = styled.img`
    width: 100%;
    height: 100%;
`

{/* <Segment>
                <Header as='h1' color='brown' textAlign='center'>ROLL or HERO</Header>
            </Segment> */}