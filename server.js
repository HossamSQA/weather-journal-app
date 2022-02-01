// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// require cors
const cors = require("cors");
//require body parser
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));
// Setup Server
app.listen(8080, () => {
  console.log("server running on port: 8080");
});

//posting data
app.post("/postData", (req, res) => {
  //all data whatever the variable name is
  projectData = { ...req.body };
  res.end();
});

// Getting data
app.get("/getData", (req, res) => {
  res.send(projectData);
});
