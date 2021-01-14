import React from 'react'
import Banner from '../Components/Banner'
import Header from '../Components/Banner'
import FilterBar from '../Components/FilterBar'
import Sidebar from '../Components/FilterBar'
import Hours from '../Components/Hours'
import MapDisplay from '../Components/MapDisplay'
import TopSandwich from '../Components/TopSandwich'
import DetailsContainer from './DetailsContainer'


class HomeContainer extends React.Component{


    render(){
        return(
            <div class="homeContainerDiv">
                <div class="bannerDiv"><Banner/></div>
                <div class="buttonbarDiv"><FilterBar /></div>
                <div class="mapDiv"><MapDisplay/></div>
                <div class="detailsContainerDiv"><DetailsContainer/></div>
                {/* <div class="topSandwichesDiv"><TopSandwich/></div>
                <div class="hoursDiv"><Hours/></div> */}
            </div>
        )
    }

}

export default HomeContainer