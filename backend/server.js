const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Setting up the server
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8060;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setting up routing
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

// Include annex routes
app.use("/annex", require("./routes/annex.route"));
app.use("/bike", require("./routes/bike.route"));

// app.use("/users", require("./routes/UserRoutes"));

app.listen(PORT, () => {
  console.log("Server up with port : " + PORT);
});

// Setting up the database connection
const URL = process.env.MONGODB_URL;

mongoose.set("strictQuery", true);
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully!");
});
