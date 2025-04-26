module.exports = (sequelize, DataTypes) => { 
    const Appointment = sequelize.define('Appointment', {
      appointment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'patients',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'doctors',
          key: 'doctor_id',
        },
    },
    appointment_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    status: {
        type: DataTypes.STRING(20),  
        defaultValue: 'pending',  
      },
      tableName: 'appointments', 
    });
  
    Appointment.associate = (models) => {
      Appointment.belongsTo(models.Patient, {foreignKey: 'patient_id'});
      Appointment.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
      Appointment.hasOne(models.Billing, { foreignKey: 'appointment_id' });
    };
  
    return Appointment;
  };

  