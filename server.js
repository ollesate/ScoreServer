'use-strict';

import express from 'express';
import database from './database';

let app = express();

database.start();

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/score/add', (req, res) => {
  res.send('User: ' + req.query.test);
  let query = 'insert or replace into scores (player, score) values(?,?)';
  let parameters = [req.query.player, req.query.score];
  database.run(query, parameters);
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
