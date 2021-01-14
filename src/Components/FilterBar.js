import React from 'react'
import { Dropdown } from 'semantic-ui-react'


class FilterBar extends React.Component {

    state = {
        sandwichStyle: "",
        deliStyle: ""
    }

    sandwichStyles = [
        { key: '', text: '', value: '' },
        { key: 'Burger', text: 'Burger', value: 'Burger' },
        { key: 'Cheese_Steak', text: 'Cheese Steak', value: 'Cheese_Steak' },
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
            onChange={this.deliClickHandler}
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
        { key: 'Jewish_Deli', text: 'Jewish Deli', value: 'Jewish_Deli' },
        { key: 'Restaurant', text: 'Restaurant', value: 'Restaurant' },
        { key: 'Italian_Deli', text: 'Italian Deli', value: 'Italian_Deli' },
        { key: 'Vietnamese_Deli', text: 'Vietnamese Deli', value: 'Vietnamese_Deli' }
    ]

    deliClickHandler = (e, data) => {
        // console.log(data.value)
        this.setState({ [data.name]: data.value})
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


    render() {
        console.log(this.state)
        return (
            <>
                <br></br>
                <h3>Search The City</h3>
                <br></br>
                <br></br>
                {this.sandwichDropdown()}
                <br></br>
                <br></br>
                {this.deliDropdown()}
            </>

        )
    }
}
export default FilterBar