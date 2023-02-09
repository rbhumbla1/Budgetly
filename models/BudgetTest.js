const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BudgetTest extends Model { }

BudgetTest.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.INTEGER,
        },
        category: {
            type: DataTypes.STRING,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'budgettest',
    }
);

module.exports = BudgetTest;
