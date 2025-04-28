const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const MedicalHistory = sequelize.define('Medical_history', {
      history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'patients',
          key: 'id',
        },
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'doctors',
          key: 'doctor_id',
        },
      },
      description: {
        type: Sequelize.TEXT,
      },
      diagnosis: {
        type: Sequelize.TEXT,
      },
      treatment: {
        type: Sequelize.TEXT,
      },
      date_recorded: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      tableName: 'medical_history', 
    });
  
    MedicalHistory.associate = (models) => {
      MedicalHistory.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    };
  
    return MedicalHistory;
  };
  