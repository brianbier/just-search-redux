  import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import { protectedTest, fetchUser } from '../../actions/auth';
import { fetchFavorite } from '../../actions/index';
import Profile from './profile';
import Favorite from './favorite';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.props.protectedTest();
    console.log(this.props)
  }

  componentDidMount(){
    const userId = cookie.load('user');
    this.props.fetchUser(userId._id);
    this.props.fetchFavorite(userId._id);
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
  
  favoriteList(){
    const favoritePlaces = this.props.favorites
    
    return (
      favoritePlaces.map((place,index)=> <Favorite {...this.props} key={index} i={index} place={place}/>)
    )
  }
  
  render() {
    return (
      <div>
        {this.isRole('Admin', this.adminMenu())}
        {this.isRole('Member', this.memberMenu())}
        <p>{this.props.content}</p>
        <div>
        {this.favoriteList()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { content: state.auth.content, authenticated: state.auth.authenticated, profile: state.user.profile, favorites: state.google.favoritePlaces};
}

export default connect(mapStateToProps, { protectedTest, fetchUser, fetchFavorite})(Dashboard);
