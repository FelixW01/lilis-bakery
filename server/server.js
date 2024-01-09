// import modules
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const db = require('./config/connection.js');
const path = require('path');

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
