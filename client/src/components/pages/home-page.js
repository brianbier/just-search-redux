import React, { Component } from 'react';

class HomePage extends Component {  
  renderMap(){
        return[
          <input id="map_input" className="controls" type="text" placeholder="Search Box"/>,
          <div id="map"></div> 
        ]
  }

  componentDidMount(){
      let pos = {}
      let markers = []

      // function displaybutton(result){
      //   console.log('It works')
      //   console.log(result)
      // }

      if (navigator.geolocation) {
         
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            let map = new google.maps.Map(document.getElementById('map'), {
              center: pos,
              zoom: 15
            });

            let input = document.getElementById('map_input');
            
            let searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
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
                      let content  = document.createElement('p')
                      content.innerHTML = result.name
                      let button = content.appendChild(document.createElement('input'));
                      button.type = 'button';
                      button.value = 'click here';
                      google.maps.event.addDomListener(button, 'click', function () {
                          this.displaybutton(result).bind(this);
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
  render() {
    return (
      <div className="map_container">
        {this.renderMap()}
      </div>
    );
  }
}

export default HomePage;  