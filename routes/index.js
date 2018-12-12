import { Router } from 'express';
// import { get } from 'request';

const router = Router();

// GET deals listing.
router.get('/', (req, res, next) => {
    return res.render('index', {
        locals: {
            title: 'SharcBac',
        },
    });
});

module.exports = router;
