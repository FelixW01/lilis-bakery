const { connect, connection } = require('mongoose');
const mongoose = require("mongoose");
require("dotenv").config();

// db
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lilis-kitchen'  , {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERROR", err));

module.exports = connection;