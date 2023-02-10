const router = require('express').Router();
const { Expense, User } = require('../../models');

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

module.exports = router;