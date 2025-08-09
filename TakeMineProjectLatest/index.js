// index.js

const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());

// Import route filess
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const adminRoutes = require('./routes/adminRoutes');
const prova = require('./routes/prova');

// Middleware
app.use(express.json());
app.use(cors());

// Use routes with a base path
app.use('/users', userRoutes);
app.use('/resources', resourceRoutes);
app.use('/borrows', borrowRoutes);
app.use('/ratings', ratingRoutes);
app.use('/admin', adminRoutes);

app.get('/', function(req, res) {
  res.send('Hey')
});




// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
