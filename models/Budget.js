const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Budget extends Model { }

Budget.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        amount: {
            type: DataTypes.FLOAT,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        // category: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'budget_category',
        //         key: 'id',
        //     },
        // },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'budget',
    }
);

module.exports = Budget;
