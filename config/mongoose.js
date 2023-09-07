const mongoose = require('mongoose');


mongoose.connect(`mongodb://localhost/Login_System`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));


db.once('open', function () {
    console.log('Successfully Connected to Database :: Login System');
});


module.exports = db;