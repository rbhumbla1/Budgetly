const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Expense extends Model { }



Expense.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amount_spent: {
            type: DataTypes.FLOAT,
        },
        note: {
            type: DataTypes.STRING(100),
        },
     
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
      
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'budget_category',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'expense',
    }
);

module.exports = Expense;

