import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from "react-redux"
import { getDelis } from '../Redux/actions'
import { renderReviewForm } from '../Redux/actions'
import InfoWindowEx from './InfoWindoEx'
import {currentDeli} from '../Redux/actions'

class MapDisplay extends React.Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    componentDidMount() {
        this.props.fetchDelis()
    }

    markers = () => {
        const filteredDeliArray = this.props.currentDelis.filter(deliEl => deliEl.style === this.props.deliFilter )
        const filteredSandwichArray = this.props.currentDelis.filter(deliEl => deliEl.sandwiches[0].style === this.props.sandwichFilter )
        if(filteredDeliArray.length > 0 ){
            return filteredDeliArray.map(deliEl => {
                    const lat = deliEl.lat
                    const lng = deliEl.lng
                    return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{lat: lat, lng: lng}} />
                })
        } else if(filteredSandwichArray.length > 0 ) {
            return filteredSandwichArray.map(deliEl => {
                    const lat = deliEl.lat
                    const lng = deliEl.lng
                    // console.log(deliEl)
                    return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{lat: lat, lng: lng}} />
                })
        } else {
            return this.props.currentDelis.map(deliEl => {
                    const lat = deliEl.lat
                    const lng = deliEl.lng
                    // console.log(deliEl)
                    return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{lat: lat, lng: lng}} />
                })
        }
    }

    /// MAP ACTIONS ///
    onMarkerClick = (props, marker) => {
        // console.log("props:", props, "marker", marker)
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props
        })
    }

    centerMoved(mapProps, map) {
        // console.log(mapProps, map)
    }

    mapClicked(mapProps, map, clickEvent) {
        // console.log("Map props: ", mapProps, "map", map, "clickevent:", clickEvent)
    }

    renderReviewFormHandler = () => {
        // console.log(this.state.selectedPlace.name)
        this.props.fetchForm()
        this.props.currentDelis.map(deliEl => {
            if(deliEl.name === this.state.selectedPlace.name){
                this.props.setDeli(deliEl)
            }
        })
    }

    windowHasClosed = () => {
        this.props.fetchForm()
    }

    render() {
        return (
            <div>
                <Map
                    style={{ width: '600px', height: '400px' }}
                    google={this.props.google}
                    zoom={13}
                    initialCenter={{
                        lat: 40.683436,
                        lng: -73.941249
                    }}
                    onDragend={this.centerMoved}
                    onClick={this.mapClicked}>
                    {this.props.currentDelis.length > 0 
                    ? 
                    this.markers()
                    : 
                    <h1>Loading</h1>
                    }    
                    <InfoWindowEx 
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.windowHasClosed}>
                        <div >
                            <h3>{this.state.selectedPlace.name}</h3>
                            <p>Address: {this.state.selectedPlace.address}</p>
                            <p>Hours: {this.state.selectedPlace.hours}</p>
                            <button type="button" onClick={this.renderReviewFormHandler}>Review Me</button>
                        </div>
                    </InfoWindowEx>
                </Map>
            </div>
        )
    }
}

function msp(state) {
    return {
        currentDelis: state.delis,
        reviewForm: state.reviewFormClicked,
        sandwichFilter: state.sandwichFilter,
        deliFilter: state.deliFilter
    }
}

function mdp(dispatch) {
    return {
        fetchDelis: () => dispatch(getDelis()),
        fetchForm: () => dispatch(renderReviewForm()),
        setDeli: (deliObj) => dispatch(currentDeli(deliObj))
    }
}

export default connect(msp, mdp)(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_KEY)
})(MapDisplay))



