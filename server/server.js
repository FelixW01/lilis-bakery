// import modules
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

// db
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERROR", err));


app.get('/', (req, res) => {
    res.send('Hello World!');
  }
)

// port
const port = process.env.PORT || 3000;

// listener
app.listen(port, () => {
      console.log(`Server running on port ${port}!`);
    });