import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FooterTemplate extends Component {
  renderLinks() {
    if (this.props.authenticated) {
      return [
        <li className="footer_nav_list_item">
          <Link className="footer_nav_link" to="/">Home</Link>
        </li>,
        <li className="footer_nav_list_item">
          <Link className="footer_nav_link" to="dashboard">Dashboard</Link>
        </li>,
        <li className="footer_nav_list_item">
          <Link className="footer_nav_link" to="logout">Logout</Link>
        </li>,
      ];
    } else {
      return [
        // Unauthenticated navigation
        <li className="footer_nav_list_item">
          <Link className="footer_nav_link" to="/">Home</Link>
        </li>,
        <li className="footer_nav_list_item">
          <Link className="footer_nav_link" to="login">Login</Link>
        </li>,
        <li className="footer_nav_list_item">
          <Link className="footer_nav_link" to="register">Register</Link>
        </li>,
      ];
    }
  }

  render() {
    return (
          <ul className="footer_nav_list">
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

export default connect(mapStateToProps, null)(FooterTemplate);
