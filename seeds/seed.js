const sequelize = require('../config/connection');
const { User, Budget, Expense, BudgetCategory } = require('../models');

const userData = require('./userData.json');
const budgetData = require('./budgetData.json');
const expenseData = require('./expenseData.json');
const budgetCategoryData = require('./budgetCategoryData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const budgetCategories = await BudgetCategory.bulkCreate(budgetCategoryData, {
    individualHooks: true,
    returning: true,
  });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const budgets = await Budget.bulkCreate(budgetData, {
    individualHooks: true,
    returning: true,
  });

  const expenses = await Expense.bulkCreate(expenseData, {
    individualHooks: true,
    returning: true,
  });



  process.exit(0);
};

seedDatabase();
