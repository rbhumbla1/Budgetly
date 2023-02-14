const router = require('express').Router();
const { Budget, User } = require('../models');
const withAuth = require('../utils/auth');
const { QueryTypes } = require('sequelize');

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});


//HOMEPAGE ROUTE
router.get('/', (req, res) => {
  res.render('homepage');
});

// THIS IS PROFILE PAGE, WHICH CAN BE OUR HOME PAGE AFTER LOGGING IN
router.get('/profile', withAuth, async (req, res) => {
  console.log("PROFILE in HOMEROUTE");
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Budget }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//USER WILL BE DIRECTED TO SIGNUP PAGE
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/goals', (req, res) => {
  res.render('goals');
});

router.get('/expenses', (req, res) => {
  res.render('expenses');
});

module.exports = router;
