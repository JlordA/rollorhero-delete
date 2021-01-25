import React from 'react'
import {connect} from 'react-redux'
import { currentDeli, deliClick } from '../Redux/actions'
 
class DeliListItem extends React.Component{
    
    clickHandler = () => {
        this.props.deliClicked()
        this.props.currentDeli(this.props.deliObj)
    }

    render(){
        return(
            <ul className="ul">
                <li onClick={this.clickHandler}>{this.props.deliObj.name} - {this.props.deliObj.address}</li>
            </ul>
        )
    }
}

function mdp(dispatch){
    return{
        deliClicked: () => dispatch(deliClick()),
        currentDeli: (deliObj) => dispatch(currentDeli(deliObj))
    }
}
export default connect(null, mdp)(DeliListItem)