const router = require('express').Router();
const { Expense, User } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all expenses
router.get('/', async (req, res) => {
    try {
      const expenseData = await Expense.findAll({
        include: [{ model: User }],
      });
      res.status(200).json(expenseData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get a single expense
router.get('/:id', async (req, res) => {
  try {
    const expenseData = await Expense.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!expenseData) {
      res.status(404).json({ message: 'No expense found with that id!' });
      return;
    }

    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create an expense
router.post('/', async (req, res) => {
  try {
    const expenseData = await Expense.create({
        expense_id: req.body.expense_id,
    });
    res.status(200).json(expenseData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
    try {
      const expenseData = await Expense.update(req.body, {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      });
      if (!expenseData[0]) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(expenseData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expenseData = await Expense.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!expenseData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }
    res.status(200).json(expenseData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Added a route to get data to diaply budget goals for a user
router.get('/spending', withAuth, async (req, res) => {
  
  try {

    //Get current budgets goals for the user
      const expenseData = await Expense.findAll({ where: { user_id: req.session.user_id },
        attributes:['category_id','amount','date_created'] 
      });
       //Get the User Data
       const userData = await User.findByPk(req.session.user_id, {
        attributes:  ['name'] 
      });
      const user = userData.get({plain:true})
  
      // Get Budget cateories
      const nameData = await BudgetCategory.findAll({
        attributes: ['category'],
      });
      const names = nameData.map((name) => name.get({ plain: true }));
    
      const budgets = budgetData.map((budget) => budget.get({ plain: true }));
     
      //add category_name to the data send to goals.handlebar for displaying
      budgets.forEach((budget) => {
        budget.category_name = names[budget.category_id - 1].category;
      });
      
      //call the goals.handlebar to display
      res.render('goals', {
        budgets, user,
        logged_in: true,
      });

  } catch (err) {
    res.status(500).json(err);
  }

});




module.exports = router;