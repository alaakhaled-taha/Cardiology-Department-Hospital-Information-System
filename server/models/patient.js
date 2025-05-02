const { Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    patient_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blood_group: {
      type: DataTypes.STRING,
    },
    referred_by: {
      type: Sequelize.TEXT,
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    primary_mobile: {
      type: DataTypes.STRING,
      allowNull: false
    },
    secondary_mobile: {
      type: DataTypes.STRING,
    },
    landline: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.TEXT,
    },
    parent_name: {
      type: DataTypes.STRING,
    },
    spouse_name: {
      type: DataTypes.STRING,
    },
    is_corporate_patient: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    has_insurance: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    is_smoker: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    }
  }, {
    tableName: 'patients',
    timestamps: false, // Assuming you want to use createdAt, updatedAt
  });

  // Associations (if needed)
  Patient.associate = (models) => {
    // Assuming patient has medical history, test results, appointments, etc.
    Patient.hasMany(models.MedicalHistory, { foreignKey: 'patient_id' });
    Patient.hasMany(models.Appointment, { foreignKey: 'patient_id' });

  };

  return Patient;
};
