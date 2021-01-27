import React from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import { connect } from "react-redux"
import { getDelis, renderDeliForm, renderReviewForm } from '../Redux/actions'
import InfoWindowEx from './InfoWindoEx'
import { currentDeli } from '../Redux/actions'
import { Button } from 'semantic-ui-react'


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
        const filteredSandwichArray = this.props.currentDelis.filter(deliEl => {
            if(deliEl.sandwiches.length){
                return deliEl.sandwiches[0].style === this.props.sandwichFilter
            } else {
                return null
            }
        })
        const filteredBoroughArray = this.props.currentDelis.filter(deliEl => deliEl.borough === this.props.boroughFilter)
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
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        } else if (filteredBoroughArray.length > 0) {
            return filteredBoroughArray.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
                return <Marker key={deliEl.id} onClick={this.onMarkerClick} name={deliEl.name} address={deliEl.address} hours={deliEl.hours_open}
                    position={{ lat: lat, lng: lng }} />
            })
        } else {
            return this.props.currentDelis.map(deliEl => {
                const lat = deliEl.lat
                const lng = deliEl.lng
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
                if(this.state.address === ""){

                    this.setState({ address: data.candidates[0]["formatted_address"], hours: data.candidates[0]["hours_open"] })
                }
            })
            const lat = this.props.deliLocation.coordinates["lat"]
            const lng = this.props.deliLocation.coordinates["lng"]
            return <Marker name={name} address={this.state.address} hours={this.state.hours} onClick={this.onMarkerClick} position={{ lat: lat, lng: lng }}/>
    }


    /// MAP ACTIONS ///
    onMarkerClick = (props, marker) => {
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props
        })
    }

    // centerMoved(mapProps, map) {
    //     // console.log(mapProps, map)
    // }

    // mapClicked(mapProps, map, clickEvent) {
    //     // console.log("Map props: ", mapProps, "map", map, "clickevent:", clickEvent)
    // }

    renderReviewFormHandler = () => {
        this.props.fetchForm()
        this.props.currentDelis.map(deliEl => {
            if(deliEl.name === this.state.selectedPlace.name) {
                this.props.setDeli(deliEl)
            }
        })
    }

    renderAddDeliFormHandler = () => {
        this.props.showDeliForm()
    }

    render() {
        console.log(this.props.boroughFilter)
        return (
            <div className="mapSizeDiv" >
                <Map
                    style={{ width: '48.8vw', height: '58vh' }}
                    containerStyle={{height: '58vh', width: '48.8vw'}}
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
                            {this.props.currentDelis.includes(this.state.name) ? null : <Button type="button" onClick={this.renderAddDeliFormHandler}>Add Me</Button>}
                            <Button type="button" onClick={this.renderReviewFormHandler}>Review Me</Button>
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
        boroughFilter: state.boroughFilter,
        deliLocation: state.deliLocation
    }
}

function mdp(dispatch) {
    return {
        fetchDelis: () => dispatch(getDelis()),
        fetchForm: () => dispatch(renderReviewForm()),
        setDeli: (deliObj) => dispatch(currentDeli(deliObj)),
        showDeliForm: () => dispatch(renderDeliForm())
    }
}

export default connect(msp, mdp)(GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_KEY)
})(MapDisplay))





