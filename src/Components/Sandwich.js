import React from 'react'
import { connect } from 'react-redux'
import { getSandwich, likeSandwich, sandwichBeenClicked } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

class Sandwich extends React.Component {

    state = {
        sandwichId: 0
    }

    componentDidUpdate() {
        if (this.props.sandwich.id !== this.state.sandwichId) {
            this.setState({ sandwichId: this.props.sandwich.id }, () => this.props.getSandwich(this.props.sandwich))
        }

    }

    likeHandler = () => {
        this.setState({ sandwichId: 0 }, () => {
            let newLike = {
                sandwich_id: this.props.sandwich.id,
                user_id: this.props.user.id
            }
            this.props.sendLike(newLike)
        })
    }

    allSandwichRender = () => {
        this.props.sandwichBeenClicked()
    }

    render() {
        console.log(this.props.sandwich)
        let sandwich = this.props.sandwich
        return (
            <SandwichWrapper>
                <SandwichDetails>
                    <h4>Name: {sandwich.name}</h4>
                    <p>Description: {sandwich.description}</p>
                    <p>Price: {sandwich.price}</p>
                    <p>Style: {sandwich.style}</p>
                    <p>Rating: {sandwich.rating}</p>
                    <p>Likes: {this.props.sandwich.likes === undefined ? 0 : this.props.sandwich.likes.length}  <Button onClick={this.likeHandler}>Like</Button></p>
                    <Button onClick={this.allSandwichRender}>All Sandwiches</Button>
                </SandwichDetails>
                <SandwichPic>
                    <img src={this.props.sandwich.image} alt={this.props.sandwich.name} width="200" height="300" />
                </SandwichPic>
            </SandwichWrapper>
        )
    }
}

function mdp(dispatch) {
    return {
        sendLike: (newLike) => dispatch(likeSandwich(newLike)),
        getSandwich: (sandwichObj) => dispatch(getSandwich(sandwichObj)),
        sandwichBeenClicked: () => dispatch(sandwichBeenClicked())
    }
}

function msp(state) {
    return {
        sandwich: state.sandwich,
        likes: state.likes,
        user: state.user
    }
}

export default connect(msp, mdp)(Sandwich)

const SandwichPic = styled.div`
    justify-content: right;
    border: 2px solid black;
`
const SandwichDetails = styled.div`
    justify-content: left;
    border: 2px solid black;
`

const SandwichWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-content: space-around;
    border: 2px solid black;
`