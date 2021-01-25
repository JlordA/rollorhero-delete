import React from 'react'
import { connect } from 'react-redux'
import DeliListItem from './DeliListItem'


class DeliList extends React.Component {

    renderDelis = () => {
        return this.props.currentDelis.map(deliEl => {
            return <DeliListItem key={deliEl.id} deliObj={deliEl} />
        })
    }

    render() {
        return (
            <div className="tab-div">
                <h3>Delis</h3>
                {this.renderDelis()}
            </div>
        )
    }
}

function msp(state) {
    return {
        currentDelis: state.delis,
    }
}
export default connect(msp)(DeliList)