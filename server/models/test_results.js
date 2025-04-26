// models/test_result.js

const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const TestResult = sequelize.define('TestResult', {
    test_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    history_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'medical_history', // assumes your MedicalHistory table is named this
        key: 'history_id',
      },
      onDelete: 'CASCADE',
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'doctors', // assumes your Doctors table is named this
        key: 'doctor_id',
      },
      onDelete: 'SET NULL', // or CASCADE depending on your logic
    },
    test_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    test_result: {
      type: DataTypes.TEXT,
    },
    test_date: {
      type: DataTypes.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  }, {
    tableName: 'test_results', 
    timestamps: false, 
  });

  // Associations
  TestResult.associate = (models) => {
    TestResult.belongsTo(models.MedicalHistory, { foreignKey: 'history_id' });
    TestResult.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
  };

  return TestResult;
};
