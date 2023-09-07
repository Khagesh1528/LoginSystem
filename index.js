const express = require('express');
const port = 8000;
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/mongoose'); // Assuming this imports your database configuration

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

// Use body-parser middleware to parse request bodies
app.use(bodyParser.urlencoded());

// Set the view engine to EJS and specify the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static assets from the 'assets' directory
app.use(express.static('./assets'));
// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeial',

    // TODO change the secret before deployment in production mode
    secret: "loginSystem",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'

        },
        function (err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);


// Use the index route for handling requests
app.use('/', require('./routes/index'));

// Start the server on the specified port
app.listen(port, (err) => {
    if (err) {
        console.log('Error in Starting Server');
    }
    console.log('Server is running on port:', port);
});
