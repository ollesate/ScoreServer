'use-strict';

var express = require('express');

var app = express();

app.use('/', (req, res) => {
  res.send('Hello world');
});

app.listen(4500, () => {
  console.log('Server is now listening on port 3000');
});
