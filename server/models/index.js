const { Sequelize, DataTypes } = require('sequelize');

// Connect to Neon PostgreSQL
const sequelize = new Sequelize('postgres://Cardiology_dep_owner:npg_2FMReVQu6nkJ@ep-blue-waterfall-a2uswbsv-pooler.eu-central-1.aws.neon.tech:5432/Cardiology_dep', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// Import models
const Patient = require('./patient')(sequelize, DataTypes);
const Doctor = require('./doctors')(sequelize, DataTypes);
const Appointment = require('./appointments')(sequelize, DataTypes);
const MedicalHistory = require('./medical_history')(sequelize, DataTypes);
const Billing = require('./billings')(sequelize, DataTypes);
const TestResult = require('./test_results')(sequelize, DataTypes);

// Set up associations
if (Patient.associate) Patient.associate({ Appointment, MedicalHistory });
if (Doctor.associate) Doctor.associate({ Appointment, TestResult });
if (Appointment.associate) Appointment.associate({ Patient, Doctor, Billing });
if (MedicalHistory.associate) MedicalHistory.associate({ Patient, TestResult });
if (Billing.associate) Billing.associate({ Appointment });
if (TestResult.associate) TestResult.associate({ MedicalHistory, Doctor });

// Export everything
module.exports = {
  sequelize,
  Patient,
  Doctor,
  Appointment,
  MedicalHistory,
  Billing,
  TestResult,
};
