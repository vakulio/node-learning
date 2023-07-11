const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const feedRoutes = require('./routes/feed');
require('dotenv').config();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'images');
  },
  filename(req, file, cb) {
    const str = file.mimetype;
    const format = str.replace('image/', '');
    cb(null, `${uuidv4()}.${format}`);
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const app = express();

app.use(bodyParser.json());
app.use(multer({ storage, fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const { message } = error;
  const { data } = error;
  res.status(status).json({ message, data });
});

const port = 8080;

mongoose.connect(`${process.env.MONGODB_URI}posts`)
  .then((result) => {
    app.listen(port, () => {
      console.log(`\u001B[35mServer is running on port ${port}`);
    });
  }).catch((err) => console.log(err));
