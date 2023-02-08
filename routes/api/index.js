const router = require('express').Router();
const userRoutes = require('./user-routes');
const budgetRoutes = require('./budget-routes');
const expenseRoutes = require('./expense-routes');

router.use('/user', userRoutes);
router.use('/budget', budgetRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;
