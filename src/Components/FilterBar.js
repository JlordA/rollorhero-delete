import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setSandwichFilter, setSearchLocation, setDeliFilter } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import { GoogleComponent } from 'react-google-location'

const API_KEY = process.env.REACT_APP_API_KEY

class FilterBar extends React.Component {

    state = {
        sandwichStyle: "",
        deliStyle: "",
        currentDateTime: Date().toLocaleString(),
        place: null
    }

    sandwichStyles = [
        { key: '', text: '', value: '' },
        { key: 'Burger', text: 'Burger', value: 'Burger' },
        { key: 'Cheese_Steak', text: 'Cheese Steak', value: 'Cheese Steak' },
        { key: 'Melt', text: 'Melt', value: 'Melt' },
        { key: 'Breakfast', text: 'Breakfast', value: 'Breakfast' },
        { key: 'Sub', text: 'SUB', value: 'Sub' },
        { key: 'Club', text: 'Club', value: 'Club' },
        { key: 'Cutlet', text: 'Cutlet', value: 'Cutlet' }
    ]

    sandwichDropdown = () => (
        <Dropdown
            button
            className='icon'
            onChange={this.sandwichClickHandler}
            name="sandwichStyle"
            floating
            labeled
            icon='search'
            options={this.sandwichStyles}
            search
            placeholder='Filter by Sandwich Style'
        />
    )

    deliStyles = [
        { key: '', text: '', value: '' },
        { key: 'Bodega', text: 'Bodega', value: 'Bodega' },
        { key: 'Diner', text: 'Diner', value: 'Diner' },
        { key: 'Jewish_Deli', text: 'Jewish Deli', value: 'Jewish Deli' },
        { key: 'Restaurant', text: 'Restaurant', value: 'Restaurant' },
        { key: 'Italian_Deli', text: 'Italian Deli', value: 'Italian Deli' },
        { key: 'Vietnamese_Deli', text: 'Vietnamese Deli', value: 'Vietnamese Deli' }
    ]

    sandwichClickHandler = (e, data) => {
        // console.log(data.value)
        this.setState({ sandwichStyle: data.value })
        this.props.filterSandwiches(data.value)
    }

    deliClickHandler = (e, data) => {
        // console.log(data.value)
        this.setState({ deliStyle: data.value })
        this.props.filterDelis(data.value)
    }

    deliDropdown = () => (
        <Dropdown
            button
            onChange={this.deliClickHandler}
            name="deliStyle"
            className='icon'
            floating
            labeled
            icon='search'
            options={this.deliStyles}
            search
            placeholder='Filter by Deli Style'
        />
    )

    hoursClickHandler = () => {
        console.log("clicked:", this.state.currentDateTime)
        // this.props.currentDelis.filter(deliEl => deliEl.hours_open.includes(this.state.currentDateTime))
    }

    searchHandler = (e) => {
        this.setState({ place: e }) 
    }
    
    sendSearch = (e) => {
        e.preventDefault()
        this.props.findDeli(this.state.place)
    }

    render() {
        // console.log(this.state.place)
        return (
            <div>
                <br></br>
                <h3>Search The City</h3>
                <br></br>
                <br></br>
                {this.sandwichDropdown()}
                <br></br>
                <br></br>
                {this.deliDropdown()}
                <br></br>
                <br></br>
                <Button onClick={this.hoursClickHandler}> Whats Open </Button>
                <br></br>
                <br></br>
                Find Your Spot
                <div>
                <GoogleComponent
                    apiKey={API_KEY}
                    language={'en'}
                    country={'country:in|country:us'}
                    coordinates={true}
                    locationBoxStyle={'custom-style'}
                    locationListStyle={'custom-style-list'}
                    onChange={this.searchHandler}
                     />
                     <button onClick={this.sendSearch}>Search</button>
                </div>
            </div>

        )
    }
}

function msp(state) {
    return {
        currentDelis: state.delis
    }
}

function mdp(dispatch) {
    return {
        filterSandwiches: (sandStyle) => dispatch(setSandwichFilter(sandStyle)),
        filterDelis: (deliStyle) => dispatch(setDeliFilter(deliStyle)),
        findDeli: (deliLocation) => dispatch(setSearchLocation(deliLocation))
    }
}
export default connect(msp, mdp)(FilterBar)