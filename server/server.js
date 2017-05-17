const express = require('express');
const path = require('path');
//https://www.npmjs.com/package/request
const request = require('request');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.js');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))

// This is what establishes my connection with Mongo
var mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost:27020/test';
mongoose.connect(mongoUrl);

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


app.get('/api/recipes', function(req, res) {

  //query string parameters are put in an object called "query" and you can pull them out like so:
  const url = `http://www.recipepuppy.com/api/?q=${req.query.foodQuery}&i=${req.query.ingredientQuery}`

  //console.log(req.query, 'url', url);

  //using the request library to fetch our data to avoid CORS issues
  request(url, function(err, resp, body) {

    //This data comes back as a string, so we're turning back into an object.
    body = JSON.parse(body);

    res.send(body);
  });

  //
});

app.post('/api/recipe', function(req, res) {

  console.log('posting recipe', req.body);

  var recipe = new Recipe();
  recipe.name = req.body.title;
  recipe.url = req.body.href;
  recipe.save(function() {
    console.log('done saving');
  });

  res.send('you did it');
});

app.get('/api/savedrecipes', function(req, res) {

  Recipe.find({})
    .exec(function(err, data) {
//      console.log(arguments);
      res.send(data);
    });

});

// All remaining requests return the React app, so it can handle routing.
// app.get('*', function(request, response) {
//   response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
// });

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
