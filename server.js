const express = require('express');
const connectDB = require('./dbconnection');
const studentRoutes = require('./routes/students');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);

// Connect to DB and start server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
