import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class FooterTemplate extends Component {
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
    const date = new Date();
    const year = date.getFullYear();

    return (
      <footer>
        <div>
          <div>
            <div>
              <nav>
                <ul>
                  {this.renderLinks()}
                </ul>
              </nav>
              <p>© {year}, Your Site. All Rights Reserved.</p>
            </div>
          </div>
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
