  import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { protectedTest, fetchUser } from '../../actions/auth';
import Profile from './profile';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.props.protectedTest();
    console.log(this.props)
  }

  componentDidMount(){
    const userId = cookie.load('user');
    this.props.fetchUser(userId._id);
  }

  isRole(roleToCheck, toRender) {
    if(this.props.authenticated){
      const userRole = cookie.load('user').role;
      if (userRole == roleToCheck) {
        return toRender;
      }
    }
    return false; 
  }

  adminMenu() {
    return (
      <div className="admin-menu">
        <Link to="/admin">Admin</Link>
        <p>Admin Menu coming soon</p>
      </div>
    );
  }

  memberMenu() {
    return (
      <div className="client-menu">
        <Profile profile={this.props.profile.email} />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.isRole('Admin', this.adminMenu())}
        {this.isRole('Member', this.memberMenu())}
        <p>{this.props.content}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content, authenticated: state.auth.authenticated, profile: state.user.profile };
}

export default connect(mapStateToProps, { protectedTest, fetchUser})(Dashboard);
