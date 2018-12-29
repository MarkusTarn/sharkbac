import { join } from 'path';

const config = require('config');
const i18n = require('i18n');

i18n.configure({
	locales: config.get('locale.locales'),
	cookie: config.get('locale.cookie'),
	directory: join(__dirname, config.get('locale.path')),
});

module.exports = i18n;