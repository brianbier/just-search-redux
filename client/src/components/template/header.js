import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HeaderTemplate extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li>
          <Link to="/">Home</Link>
        </li>,
        <li>
          <Link to="dashboard">Dashboard</Link>
        </li>,
        <li>
          <Link to="logout">Logout</Link>
        </li>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li>
          <Link to="/">Home</Link>
        </li>,
        <li>
          <Link to="login">Login</Link>
        </li>,
        <li>
          <Link to="register">Register</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
      <div>
          <Link to="/">{this.props.siteName}</Link>
            
            <div>
              <ul>
                {this.renderLinks()}
              </ul>
            </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(HeaderTemplate);
