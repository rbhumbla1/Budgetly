const router = require('express').Router();
const { User } = require('../../models');

// Get a user

router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get('/:id', (req, res) => {
//   User.findOne({
//     where: {
//       id: req.params.id
//     },
//     attributes: ['id', 'name'],
//     // include: [
//     //   {
//     //     model: Product,
//     //     attribute: ['id', 'product_name', 'price', 'stock', 'category_id']
//     //   }
//     // ]
//   })
//   .then(UserDB => {
//     if(!UserDB) {
//       res.status(404).json(err);
//       return;
//     }
//     res.json(UserDB)
//   })
//   .catch(err =>{
//     res.status(500).json(err);
//   })
// });


// Create a user
router.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(()=> {
      req.session.loggedIn = true
    })
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login route
router.post('/login', async (req, res) => {
  console.log(req.body.email)
  try {
    // console.log(req.body.email)
    const userData = await User.findOne({ where: { email: req.body.email } });
    console.log(userData)
    
    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true
    });
    if (!userData[0]) {
      res.status(404).json({ message: 'No user with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const User = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//USER LOGOUT

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
