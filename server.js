var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var PORT = process.env.PORT || 3000;

//set up server
var app = express();

// Serve static content for the app from the "public" directory
app.use(express.static("public"));

// setting up body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set Handlebars up
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//to be able to use different methods than html allows
app.use(methodOverride('_method'));

// Import routes and give the server access to them
var routes = require("./controllers/burgers_controller.js");
app.use(routes);

app.listen(PORT, function () {
  console.log("App now listening at localhost:" + PORT);
});