
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const authRoutes = require('./src/routes/auth.routes');
const contentRoutes = require('./src/routes/content.routes');
const subjectRoutes = require('./src/routes/subject.routes');

// Increase the JSON payload limit
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.static('public'));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001']
}));
app.use(passport.initialize());
const dbURI = "mongodb+srv://abdulbasidhussain:Super1234@cluster0.yflxqwa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const PORT = process.env.PORT || 3000;
mongoose.connect(dbURI)
  .then(() => {
    app.listen(PORT, () => {
      console.log('App running on port 3000');
    });
  })
  .catch((err) => console.log('Connection error:', err));

// GridFS Setup
let gfs;
mongoose.connection.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'uploads'
  });
});


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.use(authRoutes);
app.use(contentRoutes);
app.use(subjectRoutes);

module.exports = app;


