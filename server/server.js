// import modules
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes');
const db = require('./config/connection.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// listener
db.once('open', () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}!`);
  });
});
