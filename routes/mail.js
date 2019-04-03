import { Router } from 'express';
import { check } from 'express-validator';

const router = Router();
const config = require('config');
const { exec } = require('child_process');

router.post('/', [
	// check('address').isEmail().trim().escape(),
	// check('subject').trim().escape(),
], (req, res, next) => {
	const to = config.get('email');
	const { address } = req.body;
	const { subject } = req.body;
	exec(`mail -s "${address} -> ${subject}" ${to} < /dev/null`, (error, stdout, stderr) => {
		if (error !== null) {
			console.log(`exec error: ${error}`);
			return res.json({
				type: 'error',
				message: __('section_contact_fail'),
			}).send();
		}
		console.log(`${stdout}`);
		console.log(`${stderr}`);
		return res.json({
			type: 'success',
			message: __('section_contact_success'),
		}).send();
	});
	// res.send('Something happened');
});

module.exports = router;