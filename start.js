/* eslint-disable import/no-extraneous-dependencies */
require('babel-register')({
	presets: ['env'],
});

// Import the rest of our application.
module.exports = require('./app.js');