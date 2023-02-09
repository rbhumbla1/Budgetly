const User = require('./User');
const Budget = require('./Budget');
const BudgetCategory = require('./BudgetCategory');
const Expense = require('./Expense');

User.hasMany(Budget, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Budget.belongsTo(User, {
    foreignKey: 'user_id'
});

User.hasOne(Expense, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Expense.belongsTo(User, {
    foreignKey: 'user_id'
});

Budget.hasOne(BudgetCategory, {
    foreignKey: 'budget_category_id',
    onDelete: 'CASCADE'
});

BudgetCategory.belongsTo(Budget, {
    foreignKey: 'budget_category_id'
});

module.exports = { User, Budget, Expense, BudgetCategory };
