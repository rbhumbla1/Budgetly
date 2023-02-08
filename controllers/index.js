const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('all');
});

module.exports = router;
