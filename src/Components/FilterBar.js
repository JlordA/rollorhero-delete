import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { setSandwichFilter, setSearchLocation, setDeliFilter, renderDelisClick, userLoggedIn, logOutUser, setBoroughFilter } from '../Redux/actions'
import { Button } from 'semantic-ui-react'
import { GoogleComponent } from 'react-google-location'

const API_KEY = process.env.REACT_APP_API_KEY

class FilterBar extends React.Component {

    state = {
        sandwichStyle: "",
        deliStyle: "",
        boroughStyle: "",
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

    sandwichClickHandler = (e, data) => {
        // console.log(data.value)
        this.setState({ sandwichStyle: data.value })
        this.props.filterSandwiches(data.value)
    }

    deliStyles = [
        { key: '', text: '', value: '' },
        { key: 'Bodega', text: 'Bodega', value: 'Bodega' },
        { key: 'Diner', text: 'Diner', value: 'Diner' },
        { key: 'Jewish_Deli', text: 'Jewish Deli', value: 'Jewish Deli' },
        { key: 'Restaurant', text: 'Restaurant', value: 'Restaurant' },
        { key: 'Italian_Deli', text: 'Italian Deli', value: 'Italian Deli' },
        { key: 'Vietnamese_Deli', text: 'Vietnamese Deli', value: 'Vietnamese Deli' }
    ]

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

    deliClickHandler = (e, data) => {
        this.setState({ deliStyle: data.value })
        this.props.filterDelis(data.value)
    }

    boroughStyles = [
        { key: '', text: '', value: '' },
        { key: 'Manhattan', text: 'Manhattan', value: 'Manhattan' },
        { key: 'Brooklyn', text: 'Brooklyn', value: 'Brooklyn' },
        { key: 'Queens', text: 'Queens', value: 'Queens' },
        { key: 'Bronx', text: 'Bronx', value: 'Bronx' },
        { key: 'Staten Island', text: 'Staten Island', value: 'Staten Island' }
    ]

    boroughDropdown = () => (
        <Dropdown
            button
            onChange={this.boroughClickHandler}
            name="boroughStyle"
            className='icon'
            floating
            labeled
            icon='search'
            options={this.boroughStyles}
            search
            placeholder='Filter by Borough'
        />
    )

    boroughClickHandler = (e, data) => {
        this.setState({ boroughStyle: data.value })
        this.props.filterBoroughs(data.value)
    }

    delisClickHandler = () => {
        console.log("testing")
        this.props.renderDelis()
    }

    searchHandler = (e) => {
        this.setState({ place: e })
    }

    sendSearch = (e) => {
        e.preventDefault()
        this.props.findDeli(this.state.place)
    }

    logoutClickHandler = () => {
        this.props.logOutUser()
        this.props.userLoggedIn()
    }

    render() {
        // console.log(this.state.place)
        return (
            <div className="filters">
                <h2>Search The City</h2>
                <br></br>
                <br></br>
                <h3>Filters</h3>
                {this.sandwichDropdown()}
                <br></br>
                <br></br>
                {this.deliDropdown()}
                <br></br>
                <br></br>
                {this.boroughDropdown()}
                {/* <Button onClick={this.delisClickHandler}> Delis </Button> */}
                <br></br>
                <br></br>
                <h3>Find A Deli</h3>
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
                    <Button onClick={this.sendSearch}>Search</Button>
                </div>
                <br></br>
                <br></br>
                <Button onClick={this.logoutClickHandler}>Log Out</Button>
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
        filterBoroughs: (boroughStyle) => dispatch(setBoroughFilter(boroughStyle)),
        findDeli: (deliLocation) => dispatch(setSearchLocation(deliLocation)),
        renderDelis: () => dispatch(renderDelisClick()),
        userLoggedIn: () => dispatch(userLoggedIn()),
        logOutUser: () => dispatch(logOutUser())
    }
}
export default connect(msp, mdp)(FilterBar)