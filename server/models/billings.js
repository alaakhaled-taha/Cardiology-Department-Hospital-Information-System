const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Billing = sequelize.define('Billing', {
    billing_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'appointments',
        key: 'appointment_id',
      },
      onDelete: 'CASCADE',
    },
    total_amount: {
      type: DataTypes.NUMERIC(10, 2),
      allowNull: false,
    },
    billing_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    payment_status: {
      type: DataTypes.STRING(20),
      defaultValue: 'pending',
    },
  });

  // Associations
  Billing.associate = (models) => {
    Billing.belongsTo(models.Appointment, { foreignKey: 'appointment_id' });
  };

  return Billing;
};
