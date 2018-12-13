import { Router } from 'express';

const router = Router();

// GET deals listing.
router.get('/', (req, res, next) => res.render('main', {
	locals: {
		title: 'SharkBac',
	},
}));

module.exports = router;
