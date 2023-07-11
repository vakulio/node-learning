const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const feedRoutes = require('./routes/feed');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

const port = 8080;

mongoose.connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`\u001B[35mServer is running on port ${port}`);
    });
  }).catch((err) => console.log(err));

// app.listen(8080, () => console.log(`\x1b[34mServer is running on port ${port}
