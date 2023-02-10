const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('all');
});

const homeRoutes = require('./home-routes');
router.use('/', homeRoutes);

const apiRoutes = require('./api');
router.use('/api', apiRoutes);

module.exports = router;
