const router = require('express').Router();
const { Budget, User, Expense, BudgetCategory } = require('../models');
const withAuth = require('../utils/auth');
const { QueryTypes } = require('sequelize');

class Budgetspent {
  constructor(budget) {
     budget = this.budget
  }

  amountSpent (spent)  {
    return this.budget - spent
  }

}

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {

    res.redirect('/api/budgets/goals')
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


// Added a route to get data to display expenses for a user
router.get('/expenses', withAuth, async (req, res) => {
  
  try {

    //Get current expenses for the user);

    const expenseData = await Expense.findAll({
      where: { user_id: req.session.user_id },
      attributes: ['category_id', 'amount_spent', 'note', 'date_created']
    });

    //Get the User Data
    const userData = await User.findByPk(req.session.user_id, {
      attributes: ['name']
    });
    const user = userData.get({ plain: true })




    // Get Budget cateories
    const nameData = await BudgetCategory.findAll({
      attributes: ['category'],
    });
    const names = nameData.map((name) => name.get({ plain: true }));
    

    const expenses = expenseData.map((expense) => expense.get({ plain: true }));


    //add category_name to the data send to goals.handlebar for displaying
    expenses.forEach((expense) => {
      expense.category_name = names[expense.category_id - 1].category;
    });
    //call the goals.handlebar to display
    res.render('expenses', {
      expenses, user,
      logged_in: true,
    });

  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
