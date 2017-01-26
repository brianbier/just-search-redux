import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HeaderTemplate extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="dashboard">Dashboard</Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="logout">Logout</Link>
        </li>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="login">Login</Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="register">Register</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
          <div className="menu_container">
            <div className="menu_navigation">
              <ul className="nav flex-column">
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
