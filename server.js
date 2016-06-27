'use-strict';

import express from 'express';
import database from './database';
import bodyParser from 'body-parser';

let app = express();

app.use(bodyParser.json());

database.start();

app.all('/', (req, res) => {
  console.log("Hello world");
  res.send('Hello world2');
});

app.post('/score/add', (req, res) => {
  console.log("Body " + JSON.stringify(req.body));
  console.log("Inserted element %s with score %s", req.body['player'], req.body['score']);
  let query = 'insert or replace into scores (player, score) values(?,?)';
  let parameters = [req.body['player'], req.body['score']];
  database.run(query, parameters);
  res.send('inserted successfully');
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
