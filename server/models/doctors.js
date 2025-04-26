module.exports = (sequelize, DataTypes) => {
    const Doctor = sequelize.define('Doctor', {
      doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      specialty: {
        type: DataTypes.STRING(100),
      },
      contact_info: {
        type: DataTypes.STRING(100),
      },
      profile_photo: {
        type: DataTypes.TEXT,
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
      },
    }, {
      tableName: 'doctors',
      timestamps: false,
    });
  
    Doctor.associate = (models) => {
      Doctor.hasMany(models.Appointment, { foreignKey: 'doctor_id' });
    };
  
    return Doctor;
  };
  