// const pg = require("pg");
const { Pool } = require('pg');
// const uri = "postgres://dnohashi:ilovetesting@localhost/Fitness";

const pool = new Pool({
  user: 'bwjtiyme',
  host: 'raja.db.elephantsql.com',
  database: 'bwjtiyme',
  password: 'CeVodd7xBrsUwzUh9kC0doEswfcSEdvw',
  port: 5432,
  max: 20,
  idleTimeoutMillis: 30000,
  _connectionTimeoutMillis: 2000
});

// Global variable to store reference to 'db' object after connecting to postgresql database
// let dbo;

pool.connect((err, client, release) => {
  if (err) throw new Error(err);
  console.log('connecting...');

  client.query(`CREATE TABLE IF NOT EXISTS exercises (
    "_id" SERIAL, 
    "date" date, 
    "exercise" varchar(255), 
    "reps" int, 
    "time" time,
    "calories" int
    )`);

  client.query(`CREATE TABLE IF NOT EXISTS diet (
    "_id" SERIAL, 
    "date" date, 
    "food" varchar(255), 
    "calories" int
    )`);

  client.query(`CREATE TABLE IF NOT EXISTS users (
    "_id" SERIAL, 
    "weight" int, 
    "age" int, 
    "gender" varchar(255), 
    "bmi" int, 
    "bmr" int, 
    "height" int, 
    "date" date
    )`);
});

module.exports = serverController = {
  getExercises: function(req, res, next) {
    // Query database from all items in 'exercises' table
    pool.query("SELECT * FROM exercises", (err, data) => {
      if (err) return next(err); // Throw error if err occurs while querying database

      //After receiving data from database,
      //iterate through data and convert date in each object to desired format (MM DD YYYY)
      //before sending back to the client
      for (let obj of data.rows) {
        obj.date = obj.date.toString().slice(4, 15);
      }

      // console.log(data.rows);
      res.locals.exerciseData = data.rows;
      return next();
    });
  },

  addExercise: function(req, res, next) {
    console.log('In Server: ', req.body);
    // Query string to insert items in database
    const text =
      "INSERT INTO exercises (date, exercise, reps, time, calories) values ($1, $2, $3, $4, $5)";
    // Array to hold values to be passed into query to database
    const values = [
      new Date(),
      req.body.exercise,
      req.body.reps,
      req.body.time,
      req.body.calories
    ];

    pool.query(text, values, (err, data) => {
      if (err) return next(err); // Throw error if err occurs while querying database

      return next(); // If successful, set status to 200 and return success message to console
    });
  },

  getDiet: function(req, res, next) {
    // Query database from all items in 'diet' table
    pool.query("SELECT * FROM diet", (err, data) => {
      if (err) return next(err); // Throw error if err occurs while querying database

      //After receiving data from database,
      //iterate through data and convert date in each object to desired format (MM DD YYYY)
      //before sending back to the client
      for (let obj of data.rows) {
        obj.date = obj.date.toString().slice(4, 15);
      }

      res.locals.dietData = data.rows;
      return next();
    });
  },

  addDiet: function(req, res, next) {
    const text = "insert into diet (date, food, calories) values ($1, $2, $3)";
    const values = [new Date(), req.body.food, req.body.calories];

    pool.query(text, values, (err, inputData) => {
      if (err) return next(err);
      return next();
    });
  },

  getUser: function(req, res, next) {
    pool.query("select * from users", (err, data) => {
      if (err) return next(err);

      //After receiving data from database,
      //iterate through data and convert date in each object to desired format (MM DD YYYY)
      //before sending back to the client
      for (let obj of data.rows) {
        obj.date = obj.date.toString().slice(4, 15);
      }

      res.locals.userInfo = data.rows;
      return next();
    });
  },

  addUser: function(req, res, next) {
    const text = "insert into users (weight, age, gender, bmi, bmr, height, date) values ($1, $2, $3, $4, $5, $6, $7)";
    const values = [req.body.weight, req.body.age, req.body.gender, req.body.bmi, req.body.bmr, req.body.height, new Date()];
    
    pool.query(text,values, (err, inputData) => {
      if (err) return next(err);
      return next();
    });
  }
};

/*
  Connect to postgresql database
  If successful, store reference to 'db' variable in global 'dbo'
  Creates tables (if they do not already exist)
*/

// pool.connect(uri, (err, db) => {
//   if (err) throw new Error(err);
//   console.log("POSTGRESQL SERVER CONNECTED");
//   dbo = db;

//   db.query(`CREATE TABLE IF NOT EXISTS exercises (
//     "_id" SERIAL, 
//     "date" date, 
//     "exercise" varchar(255), 
//     "reps" int, 
//     "time" time,
//     "calories" int
//     )`);

//   db.query(`CREATE TABLE IF NOT EXISTS diet (
//     "_id" SERIAL, 
//     "date" date, 
//     "food" varchar(255), 
//     "calories" int
//     )`);

//   db.query(`CREATE TABLE IF NOT EXISTS users (
//     "_id" SERIAL, 
//     "weight" int, 
//     "age" int, 
//     "gender" varchar(255), 
//     "bmi" int, 
//     "bmr" int, 
//     "height" int, 
//     "date" date
//     )`);
// });