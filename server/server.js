const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer'); // Import multer for file uploads
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { sequelize } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: true,
  credentials: true
}));


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure multer to store images in the 'uploads' folder and give unique names
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save uploaded files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Generate a unique file name
  }
});

// File filter for allowed image types (JPG, PNG, JPEG, GIF)
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);  // Accept the file
  } else {
    cb(new Error('Invalid file type, only JPG, JPEG, PNG, and GIF are allowed'), false);
  }
};

// Initialize multer with storage and file filter configurations
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Set limit for file size (5MB max)
});

// Serve uploaded files from the 'uploads' folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/api/auth', authRoutes);

// Route for file upload
app.post('/api/upload/profile-photo', upload.single('profile_photo'), (req, res) => {
  try {
    res.status(200).json({ filePath: req.file.filename });  // Return the file path to be saved in DB
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Error uploading file' });
  }
});


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
