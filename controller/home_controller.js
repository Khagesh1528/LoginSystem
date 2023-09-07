const User = require('../models/user'); // Import the User model
const fs = require('fs');
const passport = require('passport')

// Render the home page
module.exports.home = (req, res) => {
    return res.render('home');
}

// Render the sign-up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/login');
    }

    return res.render('signUp');
}

// Create a new user account
module.exports.createAccount = function (req, res) {
    console.log('body::', req.body);
    

    // Check if the provided password and confirm_password match
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back'); // Redirect back if they don't match
    }

    // Check if a user with the provided email already exists
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            console.log('Error in creating account', err); 
            return; // You might want to add more error handling here
        }

        if (!user) {
            // If the user with the provided email doesn't exist, create a new user
            User.create(req.body, function (err, user) {
                return res.redirect('/'); // Redirect to the home page or another appropriate page
            })
        } else {
            // If a user with the provided email already exists, redirect back
            return res.redirect('back');
        }
    });
}

// Create a user session (log in)

module.exports.profile = async function (req, res) {
    try {
        const user = await User.findOne({ email: req.body.email }); // Find the user by email

        if (!user) {
            // Handle the case where the user with the provided email doesn't exist
            return res.status(404).json({ message: 'User not found' });
        }

        // Assuming you want to render a user profile page, pass the user data to the view
        return res.render('user_profile', {
            myProfile: user
        });
    } catch (err) {
        // Handle any errors that may occur during database operations
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.destroySession = function (req,res){
    req.logout(function (err) {
        if (err) {
            console.log('Error In Logged Out !!');
        }
    });


    return res.redirect('/');
}
