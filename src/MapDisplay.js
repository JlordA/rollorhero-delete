import React from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class MapDisplay extends React.Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    onMarkerClick = (props, marker) => {
        console.log("clicked:", props)
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props
        })
    }

    centerMoved(mapProps, map) {
        console.log(mapProps, map)

    }

    mapClicked(mapProps, map, clickEvent) {
        console.log(mapProps, map, clickEvent)
    }

    onMouseoverMarker = (props, marker) => {
        console.log(props.name)
        this.setState({
            showingInfoWindow: true,
            activeMarker: marker,
            selectedPlace: props
        })
    }

    render() {

        return (
            <><h1>Map section</h1>
                <Map
                    style={{ width: '50%', height: '50%', position: 'relative' }}
                    google={this.props.google}
                    zoom={13}
                    initialCenter={{
                        lat: 40.683436,
                        lng: -73.941249
                    }}
                    onDragend={this.centerMoved}
                    onClick={this.mapClicked}
                    >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Emilys Pork Store'}
                        position={{
                            lat: 40.717850604253265, lng: -73.94484766128053
                        }} />
                    <Marker
                        title={'The marker`s title will appear as a tooltip.'}
                        name={'MeatHook'}
                        position={{ lat: 40.71690731819477, lng: -73.94494422080037 }}
                        onClick={this.onMarkerClick}
                        onMouseover={this.onMouseoverMarker} />
                    <Marker
                        name={'Beer Street'}
                        website={"https://www.beerstreetny.com/"}
                        position={{ lat: 40.71837103221931, lng: -73.94477255943177 }} 
                        onClick={this.onMarkerClick} />
                    <Marker />
                    <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                            <div>
                                <h3>{this.state.selectedPlace.name}</h3>
                                <h3>{this.state.selectedPlace.website}</h3>
                            </div>
                    </InfoWindow>
                </Map>
            </>
        )
    }
}


export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_API_KEY)
})(MapDisplay)