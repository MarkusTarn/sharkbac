import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
	res.setLocale(req.cookies.localeCookie || 'en');
	res.render('main', {
		locals: {
			locale: res,
		},
	});
});

router.get('/en', (_req, res) => {
	res.cookie('localeCookie', 'en');
	res.redirect('/');
});

router.get('/fi', (_req, res) => {
	res.cookie('localeCookie', 'fi');
	res.redirect('/');
});

module.exports = router;
