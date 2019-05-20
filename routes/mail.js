import { Router } from 'express';

const router = Router();
const config = require('config');
const { exec } = require('child_process');

router.post('/', [
	// check('address').isEmail().trim().escape(),
	// check('subject').trim().escape(),
], (req, res, next) => {
	const to = config.get('email');
	const { address, subject } = req.body;
	exec(`mail -s "${address} -> ${subject}" ${to} < /dev/null`, (error, stdout, stderr) => {
		if (error !== null) {
			console.log(`exec error: ${error}`);
			return res.json({
				type: 'error',
				message: 'Could not send out email, please send email out manually to hannes.tarn@gmail.com',
			}).send();
		}
		console.log(`${stdout}`);
		console.log(`${stderr}`);
		return res.json({
			type: 'success',
			message: 'Email was sent out successfully!',
		}).send();
	});
});

module.exports = router;