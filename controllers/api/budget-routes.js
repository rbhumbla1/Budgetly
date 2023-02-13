const router = require('express').Router();
const { Budget, User, BudgetCategory } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all budgets
router.get('/', async (req, res) => {
    try {
      const budgetData = await Budget.findAll({
        include: [{ model: User }, { model: BudgetCategory }],
      });
      res.status(200).json(budgetData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Added a route to get data to diaply budget goals for a user
router.get('/goals', withAuth, async (req, res) => {
  
  try {

    const budgetData = await Budget.findAll({ where: { user_id: req.session.user_id } },
      {
        attributes: ['category_id', 'amount'],
      });

      const budgets = budgetData.map((budget) => budget.get({ plain: true }));
  
      res.render('goals', {
        budgets,
        logged_in: true,
      });

  } catch (err) {
    res.status(500).json(err);
  }

});

// Get a single budget
router.get('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const budgetData = await Budget.findByPk(req.params.id, {
      include: [{ model: User }, { model: BudgetCategory }],
    });

    if (!budgetData) {
      res.status(404).json({ message: 'No budget found with that id!' });
      return;
    }
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});



// Create a budget
router.post('/', async (req, res) => {
  try {
    const budgetData = await Budget.create({
        budget_id: req.body.budget_id,
    });
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a budget
router.put('/:id', async (req, res) => {
    try {
      const budgetData = await Budget.update(req.body, {
        where: {
          id: req.params.id,
        },
        individualHooks: true
      });
      if (!budgetData[0]) {
        res.status(404).json({ message: 'No user with this id!' });
        return;
      }
      res.status(200).json(budgetData);
    } catch (err) {
      res.status(500).json(err);
    }
});

// Delete a budget
router.delete('/:id', async (req, res) => {
  try {
    const budgetData = await Budget.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!budgetData) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }
    res.status(200).json(budgetData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
