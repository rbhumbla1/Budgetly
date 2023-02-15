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

User.hasMany(Expense, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Expense.belongsTo(User, {
    foreignKey: 'user_id'
});

Budget.belongsTo(BudgetCategory, {
    foreignKey: 'category_id'
});

Expense.belongsTo(BudgetCategory, {
    foreignKey: 'category_id'
});

BudgetCategory.hasMany(Budget, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

BudgetCategory.hasMany(Expense, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});


module.exports = { User, Budget, Expense, BudgetCategory };
