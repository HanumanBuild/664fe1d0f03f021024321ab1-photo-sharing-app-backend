const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Add the following lines to import the new routes
const authRoutes = require('./routes/auth');
const photoRoutes = require('./routes/photos');

app.get('/', (req, res) => {
  res.send('Photo Sharing App Backend');
});

// Add the following lines to use the new routes
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});