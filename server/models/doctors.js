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
      allowNull: false
    },
    profile_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    secondary_mobile: {
      type: DataTypes.STRING(20),
    },
    landline: {
      type: DataTypes.STRING(20),
    },
    university_name: {
      type: DataTypes.STRING(100),
    },
    graduation_year: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1700,
        max: new Date().getFullYear(),
      }
    },
    salary_per_session: {
      type: DataTypes.DECIMAL(10, 2),
      validate: {
        min: 0,
      }
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
