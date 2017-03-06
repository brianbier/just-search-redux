const AuthenticationController = require('./controllers/authentication');
const UserController = require('./controllers/user');
const express = require('express');
const request = require('request');
const passport = require('passport');
const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;

const passportService = require('./config/passport');

//Middleware to require login/auth
// You would use requireAuth as a middleware for a route you want to protect. Maybe your app sends an email or something, but you only want authenticated users to be able to send an email:
// emailRoutes.post('/login', requireAuth, EmailController.sendEmail);
const requireAuth = passport.authenticate('jwt',{ session: false });
// This middle ware requires you to be login
const requireLogin = passport.authenticate('local',{ session: false });

module.exports = function(app) {  
  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router();
    bikesRoutes = express.Router();
  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  authRoutes.post('/favorite',requireAuth, AuthenticationController.favorite);

  authRoutes.get('/favorite/:userId',requireAuth, AuthenticationController.viewFavorites);

  //= ========================
  // User Routes
  //= ========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes);

  // View user profile route
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);

  // Set city routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/city',bikesRoutes)
  
  // Get city bikes data
  bikesRoutes.get('/bikes',function(req,res){
    request('https://gbfs.citibikenyc.com/gbfs/en/station_information.json',function(error,response,body){
    res.status(200).send(body)
    })

  })

  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });


  // Set url for API group routes
  app.use('/api', apiRoutes);
};

