const router = require('express').Router();

const goalRoutes = require('./goal-routes.js');

router.use('/goals', goalRoutes);

module.exports = router;