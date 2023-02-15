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

Budget.hasMany(Expense, {
    foreignKey: 'user_id'
})

Expense.belongsTo(Budget, {
    foreignKey:'user_id'
})

Expense.belongsTo(User, {
    foreignKey: 'user_id'
});

Budget.belongsTo(BudgetCategory, {
    foreignKey: 'category_id'
});


BudgetCategory.hasMany(Budget, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});


module.exports = { User, Budget, Expense, BudgetCategory };
