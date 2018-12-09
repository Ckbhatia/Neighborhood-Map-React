import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Map extends Component{
    markers = [];
    addMarker = (locations) =>{
        // checking google as window object
        if(window.google){
            let infowindow = new window.google.maps.InfoWindow();
            for(let i = 0; i < locations.length; i++){
                let marker = new window.google.maps.Marker({
                    position:{
                        lat: locations[i].venue.location.lat,
                        lng: locations[i].venue.location.lng
                    },
                    animation: window.google.maps.Animation.DROP,
                    map: window.map,
                    title: locations[i].venue.id
                });
                marker.addListener('click', () =>{
                    let contents = this.props.setContens(locations[i]);
                    infowindow.setContent(contents);
                    infowindow.open(window.map, marker);

                    //animate marker on click
                    marker.setAnimation(window.google.maps.Animation.BOUNCE)
                    setTimeout(function(){
                        marker.setAnimation(null)
                    },500)
                });
                this.markers.push(marker)
            }
            // making infowindow and markers as a window object, so that we can use this in parent component
            window.infowindow = infowindow;
            window.markers = this.markers; 
        }
    };

    removeMarker = () => {
        this.markers.forEach(marker => marker.setMap(null))
    }

    render(){
        this.removeMarker()
        this.addMarker(this.props.locations)
        return(
            <div role="main" id="map"></div>
        );
    }
}

Map.propTypes = {
    locations: PropTypes.array.isRequired,
    setContens: PropTypes.func.isRequired
}