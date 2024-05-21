const express = require('express');
const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path')

// Parse JSON bodies (as sent by API clients)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));



const DATABASE_URL =  process.env.MONGO_URI;
const PORT = 3000;
mongoose.connect(process.env.MONGO_URI);

// Connect to DATABASE
const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to database'));

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

