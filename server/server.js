const express = require('express');
const path = require('path');
//https://www.npmjs.com/package/request
const request = require('request');

const app = express();
const PORT = process.env.PORT || 5000;

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


app.get('/api/recipes', function(req, res) {

  //using the request library to fetch our data to avoid CORS issues
  request('http://www.recipepuppy.com/api/?q=steak&i=sour%20cream', function(err, resp, body) {

    //This data comes back as a string, so we're turning back into an object.
    body = JSON.parse(body);

    res.send(body);
  });

  //
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
