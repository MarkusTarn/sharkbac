import { Router } from 'express';

const router = Router();
const config = require('config');
const nodemailer = require('nodemailer');
// const { exec } = require('child_process');

router.post('/', [
	// check('address').isEmail().trim().escape(),
	// check('subject').trim().escape(),
], (req, res, next) => {
	const recipient = config.get('email.recipient');
	const { address, subject } = req.body;

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.get('email.user'),
			pass: config.get('email.password'),
		},
	});

	const mailOptions = {
		from: address,
		to: recipient,
		subject: `Inquiry from sharkbac, ${address}`,
		text: subject,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
			return res.json({
				type: 'danger',
				message: 'Could not send out email, please send email out manually to hannes.tarn@gmail.com',
			}).send();
		}
		console.log(`Email sent: ${info.response}`);
		return res.json({
			type: 'success',
			message: 'Email was sent out successfully!',
		}).send();
	});

	// exec(`mail -s "${address} -> ${subject}" ${recipient} < /dev/null`, (error, stdout, stderr) => {
	// 	if (error !== null) {
	// 		console.log(`exec error: ${error}`);
	// 		return res.json({
	// 			type: 'danger',
	// 			message: 'Could not send out email, please send email out manually to hannes.tarn@gmail.com',
	// 		}).send();
	// 	}
	// 	console.log(`${stdout}`);
	// 	console.log(`${stderr}`);
	// 	return res.json({
	// 		type: 'success',
	// 		message: 'Email was sent out successfully!',
	// 	}).send();
	// });
});

module.exports = router;