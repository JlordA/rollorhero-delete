import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from "react-redux"
import { getDelis } from '../Redux/actions'
import { renderReviewForm } from '../Redux/actions'
import InfoWindowEx from './InfoWindoEx'
import { currentDeli } from '../Redux/actions'


class MapDisplay extends React.Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        name: "",
        address: "",
        hours: ""
    }

    componentDidMount() {
        this.props.fetchDelis()
    }

    allMarkers = () => {
        const filteredDeliArray = this.props.currentDelis.filter(deliEl => deliEl.style === this.props.deliFilter)
        const filteredSandwichArray = this.props.currentDelis.filter(deliEl => deliEl.sandwiches[0].style === this.props.sandwichFilter)
        if (filteredDeliArray.length > 0) {
            return filteredDeliArray.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        } else if (filteredSandwichArray.length > 0) {
            return filteredSandwichArray.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                // console.log(deliEl)
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        } else {
            return this.props.currentDelis.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                // console.log(deliEl)
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        }
    }

    searchMarker = () => {
        const titleArray = this.props.deliLocation.place.split( "," )
        const name = titleArray[0]
        if(this.state.name === ""){
            this.setState({ name: name })
        }
        const proxyurl = "https://cors-anywhere.herokuapp.com/"
        const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&fields=formatted_address,name,opening_hours&key=`
        fetch(proxyurl + url + process.env.REACT_APP_API_KEY)
        .then(r => r.json())
        .then(data => {
                // console.log(data.candidates[0]["opening_hours"])
                if(this.state.address === ""){

                    this.setState({ address: data.candidates[0]["formatted_address"], hours: data.candidates[0]["hours_open"] })
                }
                // const address = data.candidates[0]["formatted_address"] 
                // const hours = data.candidates[0]["hours_open"]
            })
            const lat = this.props.deliLocation.coordinates["lat"]
            const lng = this.props.deliLocation.coordinates["lng"]
            return <Marker name={name} address={this.state.address} hours={this.state.hours} onClick={this.onMarkerClick} position={{ lat: lat, lng: lng }}/>
    }

    // searchMarker = () => {
    //     function => fetch(place) =>obj
    //     console.log(this.props.deliLocation.coordinates["lat"])
    //     const name = this.props.deliLocation.place
    //     const lat = this.props.deliLocation.coordinates["lat"]
    //     const lng = this.props.deliLocation.coordinates["lng"]
    //     return <Marker name={name} resultobj={this.props.resultobj} hours={this.props.resultobj.hrs} onClick={this.onMarkerClick} position={{ lat: lat, lng: lng }}/>
    // }

    /// MAP ACTIONS ///
    onMarkerClick = (props, marker) => {
        // console.log("props:", props.mapCenter, "marker", marker)
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
        this.props.fetchForm()
        this.props.currentDelis.map(deliEl => {
            if(deliEl.name === this.state.selectedPlace.name) {
                this.props.setDeli(deliEl)
            }
        })
    }

    windowHasClosed = () => {
        this.props.fetchForm()
    }

    renderAddDeliFromHandler = () => {
        console.log("working")
        newDeli = {
            
        }
    }

    addDeliButtonsRender = () => {
        if(this.props.delis.includes(this.state.name)){
            return <button type="button" onClick={this.renderReviewFormHandler}>Review Me</button>
        } else {
            return <button type="button" onClick={this.renderReviewFormHandler}>Review Me</button>,
                    <button type="button" onClick={this.renderAddDeliFromHandler}>Add Me</button>
        }
    }

    render() {
        // console.log(this.props.deliLocation)
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
                        this.props.deliLocation
                            ?
                            this.searchMarker()
                            :
                            this.allMarkers()
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
                            {this.props.currentDelis.includes(this.state.name) ? null : <button type="button" onClick={this.renderAddDeliFromHandler}>Add Me</button>}
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
        deliFilter: state.deliFilter,
        deliLocation: state.deliLocation
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




//
//
//
// from roman
// {this.props.deliLocation.coordinates === null && this.props.currentDelis.length < 0 
//      ? 
//      <h1>Loading</h1> 
//              :
//              this.props.deliLocation.coordinates !== null
//                  ?
//                  this.searchMarker()
//                      :
//                      this.props.currentDelis.length > 0 
//                          ?
//                          this.allMarkers()
//                              :
//                              null }


// from james 1st
{/* {this.props.deliLocation.coordi !== null
                        ? 
                        this.searchMarker() 
                            :
                            this.props.currentDelis.length > 0
                                ?
                                this.allMarkers()
                                    :
                                    <h1>Loading</h1>} */}
//                                                                                          
{/* {
                            ? 
                            this.searchMarker()
                        }
                    {/* {this.props.deliLocation.coordinates && this.props.currentDelis.length < 0 
                        ? 
                        <h1>Loading</h1> 
                                :
                                this.props.deliLocation.coordinates !== null
                                    ?
                                    this.searchMarker()
                                        :
                                        this.props.currentDelis.length > 0 
                                            ?
                                            this.allMarkers()
                                                :
                                                // null } */} 
