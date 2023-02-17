const router = require('express').Router();
const { Expense, User, BudgetCategory,Budget } = require('../../models');
const withAuth = require('../../utils/auth');


// Get all expenses
router.get('/', withAuth, async (req, res) => {
    try {
      const expenseData = await Expense.findAll({where: {
        id:req.session.user_id
      }});

      const budgets = await Budget.findAll({where: {
        id:req.session.user_id
      }})
      
      res.render('expenses', expenseData)
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Get a single expense
router.get('/:id', async (req, res) => {
  try {
    const expenseData = await Expense.findByPk({where: { id: req.session.user_id},
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

// Added a route to get data to display expenses for a user
router.get('/spending', withAuth, async (req, res) => {
 
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
    const budgetData = Budget.findAll({where: {
      id: req.session.user_id
    }})

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

// Create an expense
router.post('/', withAuth, async (req, res) => {
  console.log('@@@@@@@@@@@@@@@@@@@',req.body)
  try {
    const newExpense = await Expense.create({
      amount_spent: req.body.amount,
      note: req.body.note,
      category_id: req.body.category,
      user_id: req.session.user_id
    });

    if (!newExpense) {
      res.status(404).json({ message: 'New expense creation failed' });
      return;
    }

    res.status(200).json(newExpense);
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
        category_id: req.params.id,
      },
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




module.exports = router;