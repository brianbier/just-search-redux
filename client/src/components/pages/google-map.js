import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Google extends Component {  
  componentDidMount(){ 
    this.initializeMap();
  } 
    initializeMap(){
        function displaybutton(result){
          that.googlePostData(result)
        }
      
        let markers = []
        let bikes = this.props.bikes
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
            map.controls[google.maps.ControlPosition.TOP_LEFT];
            
            let i = 0
            let infoWindow = new google.maps.InfoWindow();
            bikes.forEach(function(bike){
              markers.push(new google.maps.Marker({
                map: map,
                title: bike.name,
                position: {lat: bike.lat, lng: bike.lon },
                animation: google.maps.Animation.DROP
              }));

              setInfo(bike,markers[i]);
              i++


            });
            function setInfo(bike,marker){
              google.maps.event.addListener(marker, 'click', function() {
                map.setCenter(marker.getPosition());

                  let content  = document.createElement('div');
                  content.className += "company_name";
                  content.innerHTML = bike.name;
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
            }

          });
              
      } else {
          alert('Geolocation is not supported in your browser');
      }
  }

  renderMap(){
        return[
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


export default Google;  