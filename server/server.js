// import modules
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const Food = require("./models/Food.js");

// db
mongoose.set("strictQuery", false);
mongoose
	.connect('mongodb://127.0.0.1:27017/lilis-kitchen' || process.env.MONGO_URI , {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("DB CONNECTED"))
	.catch((err) => console.log("DB CONNECTION ERROR", err));


app.get('/', (req, res) => {
    res.send('Hello World!');
  }
)

app.post("/food", async (req, res) => {
	res.send("You have reached the food endpoint");
	const newFood = new Food({
		name: "Rendang",
		price: 20,
	});
	await newFood.save((err, food) => {
		if (err) {
			console.log(err);
		} else {
			console.log(food);
		}
	})	
});


// app.use(routes);

// port
const port = process.env.PORT || 3000;

// listener
app.listen(port, () => {
      console.log(`Server running on port ${port}!`);
    });