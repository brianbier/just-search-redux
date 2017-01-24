import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return (
      <div>
        {this.props.profile}
      </div>
    );
  }
}

export default Profile;
