// endpoint for all routes
projectData = {};

// Require Express to run server and routes and dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express()


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Post Route
const data = [];
app.post('/postData', weather);

function weather(req, res) {
  projectData['date'] = req.body.date;
  projectData['temp'] = req.body.temp;
  projectData['content'] = req.body.content;
  res.send(projectData);
}

// Callback function to "get" "it"
app.get('/all', getData);

function getData(req, res) {
  res.send(projectData);
}

// Setup Server and port

const port = 3030;
const server = app.listen(port, listening);

function listening() {
  console.log(`server is running on localhost: ${port}`);
};