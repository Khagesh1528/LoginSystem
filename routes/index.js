const express = require('express');
const router = express.Router();
const passport = require('passport');

const homeController = require('../controller/home_controller');

// Define routes and their corresponding controller actions
router.get('/', homeController.home); // Handle the home route
router.get('/sign-up', homeController.signUp); // Handle the sign-up page
router.post('/signUp', homeController.createAccount); // Handle sign-up form submission
router.post('/login', passport.authenticate(
    'local',
    { failureRedirect: '/' },
), homeController.profile); // Handle login form submission (assuming this is your intention)
router.get('/log-out',homeController.destroySession) 

module.exports = router;
