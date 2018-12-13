// Import dependencies
import i18n from 'i18n';
import express from 'express';
import { join } from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import middelware from './helpers/middleware';

const config = require('config');
const logger = require('./helpers/logger');

// Import routes
const main = require('./routes/main');
const es6Renderer = require('express-es6-template-engine');

// Create app
const app = express();

// View engine setup for app
app.engine('html', es6Renderer);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'html');

// Set locale
i18n.configure({
	locales: config.get('locale.locales'),
	cookie: config.get('locale.cookie'),
	directory: join(__dirname, config.get('locale.path')),
});

// Dependencies setup for app
app.use(favicon(join(__dirname, 'public', 'favicon.png')));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(join(__dirname, 'public')));

// Routes setup for app
app.use(middelware.response);
app.use('/main', main);
app.use('/', (req, res) => res.redirect('/main'));
app.use(middelware.error);

// Migrate database and run application or exit with error
const startMsg = `${process.env.npm_package_name} service started on port ${config.get('service.port') || 3000}.`;
app.listen(config.get('service.port'), () => logger.log('info', startMsg));

export default app;