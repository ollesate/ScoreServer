export default {
  db: null,
  start: function() {
    var sqlite3 = require('sqlite3').verbose();
    this.db = new sqlite3.Database('database.sqlite');

    this.run(`create table if not exists scores (
      player TEXT NOT NULL,
      score INTEGER NOT NULL)`, []);

    this.select('select * from scores').then((rows) => {
      console.log("All rows " + JSON.stringify(rows));
    });

  },
  // select
  select: function(sql, parameters) {
    var db = this.db;
    var promise = new Promise(function(resolve, reject) {
      db.all(sql, parameters, function(err, rows) {
        if(err) {
          console.log("db: Select error -> " + JSON.stringify(err));
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    return promise;
  },
  // insert, update, delete
  // sql: insert into Table (name, title) values(?,?)
  // parameters: ['jonas', 'programmer']
  run: function(sql, parameters) {
    var db = this.db;

    var promise = new Promise(function(resolve, reject) {
      db.run(sql, parameters, function(err, result) {
        if (err) {
          console.log("db: Run sql error -> " + err);
          reject(err);
        }
        else {
          console.log("db: Run sql -> " + (result ? result : sql));
          resolve(result);
        }
      });
    });
    return promise;
  },
  end: function() {
    this.db.close();
    this.db = null;
  },
};
