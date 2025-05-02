const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer'); // Import multer for file uploads
require('dotenv').config();

const authRoutes = require('./routes/auth');
const profileRoute = require('./user/profile')
const doctorRoute = require('./routes/doctor')
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Serve uploaded files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);
app.use('/api/auth', profileRoute);
app.use('/api/auth', doctorRoute);



app.get('/', (req, res) => {
  res.send('Backend Server is Running!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
