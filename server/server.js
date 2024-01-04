// import modules
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const Food = require("./models/Food.js");
const port = process.env.PORT || 3000;
const routes = require('./routes');
app.use(express.json());

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
app.get('/food', (req, res) => {
    res.send(food);
  }
)

app.post("/food", async (req, res) => {
	const newFood = new Food({
		name: "Rendang",
		price: 20,
	});
	await newFood.save((err, food) => {
		if (err) {
			res.send(err);
		} else {
			res.send(food);
		}
	})	
});


app.use(routes);

// port


// listener
app.listen(port, () => {
      console.log(`Server running on port ${port}!`);
    });