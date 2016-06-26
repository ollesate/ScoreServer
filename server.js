'use-strict';

var express = require('express');

var app = express();

import database from './database';

database.start();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/score/add', (req, res) => {
  res.send('User: ' + req.query.test);
  let sqlInsert = database.createInsertOrReplaceSql('scores', {
    player: req.query.player,
    score: req.query.score,
  });
  database.run(sqlInsert.sql, sqlInsert.parameters);
});

app.get('/score', (req,res) => {
  database.select('select * from scores order by score desc').then((rows) => {
    console.log(JSON.stringify(rows));
    res.json(rows);
  });
});

app.get('/score/:player', (req, res) => {
  let player = req.params.player;
  database.select('select score from scores where player = ? ', [player]).then((rows) => {
    res.json(rows[0]);
  })
});

app.listen(4500, () => {
  console.log('Server is now listening on port 4500');
});
