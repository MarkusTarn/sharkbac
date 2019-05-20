import { Router } from 'express';

const router = Router();

router.get('/', (req, res, next) => {
	res.setLocale(req.cookies.localeCookie || 'en');
	res.render('main', {
		locals: {
			locale: res,
		},
	});
});

router.get('/en', (req, res) => {
	res.cookie('localeCookie', 'en');
	res.redirect('/');
});

// router.get('/ru', (req, res) => {
// 	res.cookie('localeCookie', 'ru');
// 	res.redirect('/');
// });

// router.get('/de', (req, res) => {
// 	res.cookie('localeCookie', 'de');
// 	res.redirect('/');
// });

module.exports = router;
