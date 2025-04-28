const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./routes/auth');

// 👉 Import sequelize (this line connects your server to your database)
const { sequelize } = require('./models');  // <-- ADD THIS LINE

const app = express(); // FIRST, create app
const PORT = process.env.PORT || 5000;

// Allow requests from React frontend
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Use body parser and JSON middleware before routes
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// THEN use app
app.use('/api/auth', authRoutes);

// Example route
app.get('/', (req, res) => {
  res.send('Backend Server is Running!');
});

// 👉 BEFORE starting the server, test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    // Start server ONLY AFTER database connects
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
