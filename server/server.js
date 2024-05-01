// import modules
const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const db = require('./config/connection.js');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const corsOptions = {
  origin: ['http://127.0.0.1:5173', 'https://lilisbakery-81b213953aed.herokuapp.com'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'Set-Cookie'],
}

// middleware
app.use(compression());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// if we're in production, serve client/dist as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// listener
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });
});
