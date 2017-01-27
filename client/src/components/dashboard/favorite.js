import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <li>
        {this.props.place.placeName}
      </li>
    );
  }
}

export default Profile;
