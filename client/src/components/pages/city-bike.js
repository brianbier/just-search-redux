import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Google from './google-map';
import { fetchCityBikes } from '../../actions/index';

class cityBike extends Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount(){
  //   this.initializeMap();
  // }

  componentWillMount(){
   this.props.fetchCityBikes();
  }

  renderMap(){
        return(
          <Google {...this.props} />
        )
  }

  renderLoad(){
        return[
          <p>loading...</p>
        ]
  }
  render() {
    return (
      <div className="map_container">
        {this.props.bikes.length ?this.renderMap(): this.renderLoad()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.bikes.error,
    message: state.bikes.message,
    bikes: state.bikes.cityBikes,
  };
}

export default connect(mapStateToProps,{ fetchCityBikes })(cityBike);  
