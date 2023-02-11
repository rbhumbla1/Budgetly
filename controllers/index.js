const router = require('express').Router();
const apiRoutes = require('./api');
const { User, Budget } = require('../models');
const withAuth = require('../utils/auth');

router.use('/api', apiRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>")
// });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});



// THIS IS PROFILE PAGE, WHICH CAN BE OUR HOME PAGE AFTER LOGGING IN
router.get('/', withAuth, async (req,res)=> {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{model: Budget}]
    })

    const user = userData.get({ plain: true})

    res.render('profile', {
      ...user,
      logged_in: true
    })
  } catch (err) {
    res.status(500).json(err)
  }
})


//USER WILL BE DIRECTED TO SIGNUP PAGE
router.get('/signup',(req,res)=> {
  res.render('signup')
})

router.get('/goals',(req,res)=> {
  res.render('goals')
})
module.exports = router;