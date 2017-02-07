import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HeaderTemplate extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="primary_nav_list_item">
          <Link className="primary_nav_link" to="/">Home</Link>
        </li>,
        <li className="primary_nav_list_item">
          <Link className="primary_nav_link" to="dashboard">Dashboard</Link>
        </li>,
        <li className="primary_nav_list_item">
          <Link className="primary_nav_link" to="logout">Logout</Link>
        </li>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li className="primary_nav_list_item">
          <Link className="primary_nav_link" to="/">Home</Link>
        </li>,
        <li className="primary_nav_list_item">
          <Link className="primary_nav_link" to="login">Login</Link>
        </li>,
        <li className="primary_nav_list_item">
          <Link className="primary_nav_link" to="register">Register</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
          <ul className="primary_nav_list">
            {this.renderLinks()}
          </ul>
    );
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps)(HeaderTemplate);
