const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./src/config/mongoooseDB");
require("dotenv").config({ path: "./src/config/config.env" });

// environment variables..
const PORT = process.env.PORT || 3000;

// app
const app = express();

// view engine
app.set('view engine', 'ejs');

// MongoDB connection
connectDB();

// middlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(helmet());

// routes 
const API_VERSION = '/api/v1'

app.use(`${API_VERSION}/auths`, require('./src/routes/auth.routes'));
app.use(`${API_VERSION}/lessons`, require('./src/routes/lesson.routes'));
app.use(`${API_VERSION}/subjects`,require('./src/routes/subject.routes'));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// Health Route
app.get("/", (req, res) => {
  res.send({message: "API is running", status: 200});
});

module.exports = app;