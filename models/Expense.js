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
        savings: {
            type: DataTypes.FLOAT,
        },
        house_loan: {
            type: DataTypes.FLOAT,
        },
        food: {
            type: DataTypes.FLOAT,
        },
        transportation: {
            type: DataTypes.FLOAT,
        },
        personal: {
            type: DataTypes.FLOAT,
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
