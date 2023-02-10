const router = require('express').Router();
const withAuth = require("../utils/auth")


//will add withAuth soon as the routes are ready -deorren
router.get('/', (req, res) => {
    
    res.render('all');
    //res.render('all', loggedIn: req.session.loggedIn);
});


module.exports = router;
