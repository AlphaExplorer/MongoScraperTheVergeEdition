// DEPENDENCIES---------------------------------
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
var axios = require("axios");
// Initialize Express
const express = require("express");
const app = express();
app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(express.static(process.cwd() + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars",exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";   
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

// Routes
const routes = require("./controller/controller");
app.use("/", routes);

// Start the ser
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
