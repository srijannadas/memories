// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
const router = express.Router();

const app = express();
dotenv.config();


// Middleware
app.use(bodyParser.json());
app.use(cors());
const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/image');
const followerRoutes = require('./routes/follow');
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
if(mongoose){
    console.log("MongoDB Connected");
}

// Create MongoDB models (models/User.js and models/Image.js)

// API Routes (routes/auth.js and routes/image.js)
app.use('/auth', authRoutes);
app.use('/image', imageRoutes);
app.use('/user',  followerRoutes);
// Serve static images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
