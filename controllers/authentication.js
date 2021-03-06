const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const Favorite = require('../models/favorite');
const setUserInfo = require('../helpers').setUserInfo;
const getRole = require('../helpers').getRole;
const config = require('../config/main');

// Generate JWT
// TO-DO Add issuer and audience
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 604800 // in seconds
  });
}

//= =======================================
// Login Route
//= =======================================
exports.login = function (req, res, next) {
  const userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: `JWT ${generateToken(userInfo)}`,
    user: userInfo
  });
};



//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {  
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const zipCode = req.body.zipCode;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  // Return error if no Zipcode provided
  if (!zipCode) {
    return res.status(422).send({ error: 'You must enter a Zipcode.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        profile: { firstName: firstName, lastName: lastName,zipCode: zipCode }
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

        // Subscribe member to Mailchimp list
        // mailchimp.subscribeToNewsletter(user.email);

        // Respond with JWT if user was created

        let userInfo = setUserInfo(user);

        res.status(201).json({
          token: `JWT ${generateToken(userInfo)}`,
          user: userInfo
        });
      });
  });
}

//= =======================================
// Authorization Middleware
//= =======================================

// Role authorization check
exports.roleAuthorization = function (requiredRole) {
  return function (req, res, next) {
    const user = req.user;

    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (getRole(foundUser.role) >= getRole(requiredRole)) {
        return next();
      }

      return res.status(401).json({ error: 'You are not authorized to view this content.' });
    });
  };
};


// Need to create "forgot password" and "reset password" routes in the future

//= =======================================
// Favorite Route
//= =======================================
exports.favorite = function (req, res, next) {

  // console.log(req);

  // Check for place errors
  const placeId = req.body.id;
  const placeName = req.body.name;
  const user = req.user._id;

  Favorite.findOne({ placeId: placeId, user:user }, 'placeId user', (err, existingUser) => {
    if (err) { 
      return next(err); 
    }
    console.log('we found the user');

    console.log(existingUser)
    // If is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'You have already saved to your list' });
      }

    // If user is unique, create new favorite
    const favorite = new Favorite({
      placeId,
      placeName,
      user
    });

    favorite.save((err, user) => {
      if (err) { 
        return next(err); 
      }
      res.status(201).json({
        success: 'Success location was saved to database'
      });
    });
  });
};


exports.viewFavorites = function (req, res, next) {

  const userId = req.params.userId;
  if (req.user._id.toString() !== userId) { return res.status(401).json({ error: 'You are not authorized to view this user profile.' }); }
  
  Favorite.find({user: userId },'placeId placeName user', (err, userData) => {
    console.log(userData)  
    if (err) {
      res.status(400).json({ error: 'Search for favorite places and begin to populate this list' });
      return next(err);
    }

    return res.status(200).json({ favorites: userData });
  });
};










