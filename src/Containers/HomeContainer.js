import React from 'react'
import Banner from '../Components/Banner'
import FilterBar from '../Components/FilterBar'
import MapDisplay from '../Components/MapDisplay'
import DetailsContainer from './DetailsContainer'


class HomeContainer extends React.Component{


    render(){
        return(
            <div className="homeContainerDiv">
                <div className="bannerDiv"><Banner/></div>
                <div className="buttonbarDiv"><FilterBar /></div>
                <div className="mapDiv"><MapDisplay/></div>
                <div className="detailsContainerDiv"><DetailsContainer/></div>
            </div>
        )
    }

}

export default HomeContainer
