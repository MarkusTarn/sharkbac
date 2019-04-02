// Import dependencies
import express from 'express';
import { join } from 'path';
import favicon from 'serve-favicon';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import { urlencoded } from 'body-parser';
import middelware from './helpers/middleware';

const config = require('config');
const logger = require('./helpers/logger');
const i18n = require('./helpers/i18n');

// Import routes
const main = require('./routes/main');
const mail = require('./routes/mail');
const es6Renderer = require('express-es6-template-engine');

// Create app
const app = express();

// View engine setup for app
app.engine('html', es6Renderer);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'html');

// Dependencies setup for app
app.use(favicon(join(__dirname, 'public', 'favicon.png')));
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'localeCookie',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge: 60000 },
}));
app.use(i18n.init);
app.use(express.static(join(__dirname, 'public')));

// Routes setup for app
app.use(middelware.response);
app.use('/', main);
app.use('/mail', mail);
app.use(middelware.error);

// Start the service application
const startMsg = `${process.env.npm_package_name} service started on port ${config.get('service.port') || 3000}.`;
app.listen(config.get('service.port'), () => logger.log('info', startMsg));

export default app;