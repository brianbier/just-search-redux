import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FooterTemplate extends Component {
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
    const date = new Date();
    const year = date.getFullYear();

    return (
      <footer className="footer_container">
        <div className="footer_navigation">
          <ul className="nav">
            {this.renderLinks()}
          </ul>
          <p>© {year}, Your Site. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterTemplate);
