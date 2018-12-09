import React, { Component } from 'react';
import Map from './map';
import List from './list';
import * as Fetch from './Fetch';

export default class Contents extends Component{
    state = {
        locations: [],
        allLocations: [],
        query: ""
    }

    componentDidMount(){
        Fetch.getLocationDetails()
        .then(locations => this.setState({locations, allLocations: locations}))
    }

    // set content for InfoWindow
    setContens = (location) =>{
        return(
            `
            <div>
                <h3 className="title">Name: ${location.venue.name}</h3>
                <p className="address">Address: ${location.venue.location.address}</p>
            </div>
            `
        )
    }

    infoClick = (location) => {
        for(let i = 0; i < window.markers.length; i++){
            if(location.venue.id === window.markers[i].title){
                let contents = this.setContens(location);
                window.infowindow.setContent(contents)
                window.infowindow.open(window.map, window.markers[i])

                window.markers[i].setAnimation(window.google.maps.Animation.BOUNCE)
                    setTimeout(function(){
                        window.markers[i].setAnimation(null)
                    },1000)
            }
        }
    }

    filterLocations = (query, locations) => {
        return(
            locations.filter(location => location.venue.name.toLowerCase().includes(query.toLowerCase()))
        )
    }

    inputChange = (query) => {
        this.setState({query});
        if(query){
            this.setState({
                locations: this.filterLocations(query, this.state.locations)
            })
        }
        else{
            this.setState({
                locations: this.state.allLocations
            })
        }
    }

    render(){
        return(
            <div role="main" className="container">
                <List 
                    locations={this.state.locations}
                    inputChange={this.inputChange}
                    showInfo={this.infoClick}
                    query={this.state.query}
                />
                <Map 
                    locations={this.state.locations}
                    setContens={this.setContens}
                />
            </div>
        );
    }
};