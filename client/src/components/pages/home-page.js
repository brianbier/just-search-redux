import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import * as actions from '../../actions/index';

class HomePage extends Component {  
  componentDidMount(){    
    // console.log(this.props)
    this.initializeMap(this.props);
  } 
    initializeMap(that){
        let markers = []

        function displaybutton(result){
          that.googlePostData(result)
        }

        if (navigator.geolocation) {
           
            navigator.geolocation.getCurrentPosition(function(position) {
              let coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              let map = new google.maps.Map(document.getElementById('map'), {
                center: coordinates,
                zoom: 15,
                disableDefaultUI: true
              });

              let inputBox = document.getElementById('map_input');
              
              let searchBox = new google.maps.places.SearchBox(inputBox);

              map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputBox);
              
              // the SearchBox results towards current map's viewport.
              map.addListener('bounds_changed', function() {
                searchBox.setBounds(map.getBounds());
              });

              searchBox.addListener('places_changed',function(){
                
                // places holds objects inside array.
                let places = searchBox.getPlaces();
                if (places.length == 0) {
                  return;
                }
                
                // Clear out the old markers.
                markers.forEach(function(marker) {
                  marker.setMap(null);
                });

                // clear out old markers
                markers = [];

                // LAT LONG bounds
                var bounds = new google.maps.LatLngBounds();
                
                // Loop through each object of places
                let i = 0
                let infoWindow = new google.maps.InfoWindow();

                let service = new google.maps.places.PlacesService(map);

                places.forEach(function(place){
                  if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                  }
                  let icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25)
                  };

                  markers.push(new google.maps.Marker({
                    map: map,
                    title: place.name,
                    position: place.geometry.location,
                    animation: google.maps.Animation.DROP
                  }));

                  bounds.extend(markers[i].position)
                  
                  // Don't zoom in too far on only one marker
                  if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
                     var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
                     var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
                     bounds.extend(extendPoint1);
                     bounds.extend(extendPoint2);
                  }

                  getInfo(place,markers[i]);
                  i++
                });
                
                map.fitBounds(bounds)
                  
                  function getInfo(place,marker){
                    google.maps.event.addListener(marker, 'click', function() {
                      map.setCenter(marker.getPosition());

                      service.getDetails(place, function(result, status) {
                        if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        return;
                        }
                        let content  = document.createElement('div');
                        content.className += "company_name";
                        content.innerHTML = result.name;
                        let line_break = document.createElement('br')
                        content.appendChild(line_break);

                        let button = document.createElement('input')
                        button.className += "info_button";
                        button.type = 'button';
                        button.value = 'Add To Favorite';
                        content.append(button);
                        google.maps.event.addDomListener(button, 'click', function () {
                            displaybutton(result);
                        })

                        infoWindow.setContent(content);
                        infoWindow.open(map, marker);
                      });
                    });
                  }
              });
            },function(error) {
              alert('Error occurred. Error code: ' + error.code);
            },{timeout:5000});
        } else {
          alert('Geolocation is not supported in your browser');
        }
    }
  renderMap(){
        return[
          <input id="map_input" className="controls" type="text" placeholder="Search Places"/>,
          <div id="map"></div> 
        ]
  }
  render() {
    return (
      <div className="map_container">
        {this.renderMap()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { 
    authenticated: state.auth.authenticated,
    profile: state.user.profile
  };
}

export default connect(mapStateToProps,actions)(HomePage);  