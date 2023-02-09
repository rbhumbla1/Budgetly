const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class BudgetCategory extends Model {}

BudgetCategory.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'budget_category',
  }
);

module.exports = BudgetCategory;
