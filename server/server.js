const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const pg = require('pg');
const uri = 'postgres://dnohashi:ilovetesting@localhost/Fitness'; 

app.use(cors()); // Cors middleware because cors sucks
app.use(bodyParser.json({ extended: true })); // Handle requests containing JSON data

// Global variable to store reference to 'db' object after connecting to postgresql database
let dbo;

/*
  Connect to postgresql database
  If successful, store reference to 'db' variable in global 'dbo'
  Creates tables (if they do not already exist)
*/
pg.connect(uri, (err, db) => {
  if (err) throw new Error(err);
  console.log('POSTGRESQL SERVER CONNECTED');
  dbo = db;
  
  db.query(`CREATE TABLE IF NOT EXISTS exercises (
    "_id" SERIAL, 
    "date" date, 
    "exercise" varchar(255), 
    "reps" int, 
    "time" time,
    "calories" int
    )`);

  db.query(`CREATE TABLE IF NOT EXISTS diet (
    "_id" SERIAL, 
    "date" date, 
    "food" varchar(255), 
    "calories" int
    )`);

  db.query(`CREATE TABLE IF NOT EXISTS users (
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

app.get('/', (req, res) => {
  res.status(200).send('WOOO');
});

/*
  GET REQUEST - queries psql database for all items contained in 'exercises' table in 'Fitness' database
*/
app.get('/getExercises', (req, res, next) => {
  // Query database from all items in 'exercises' table
  dbo.query('SELECT * FROM exercises', (err, data) => {
    if(err) return next(err); // Throw error if err occurs while querying database

    //After receiving data from database,
    //iterate through data and convert date in each object to desired format (MM DD YYYY)
    //before sending back to the client
    for(let obj of data.rows){
      obj.date = obj.date.toString().slice(4, 15);
    }
    
    return res.status(200).json(data.rows); // If successful, set status to 200 and return json data back to client
  })
});


/*
  POST REQUEST - posts to 'exercises' table in 'Fitness' database
*/
app.post('/addExercise', (req, res, next) => {
  // Query string to insert items in database
  const text = "INSERT INTO exercises (date, exercise, reps, time, calories) values ($1, $2, $3, $4, $5)";
  // Array to hold values to be passed into query to database
  const values = [new Date(), req.body.exercise, req.body.reps, req.body.time, req.body.calories];

  dbo.query(text, values, (err, data) => {
    if(err) return next(err); // Throw error if err occurs while querying database
    
    return res.status(200).json(data); // If successful, set status to 200 and return success message to console
  });
});

/*
  GET REQUEST - queries psql database for all items contained in 'diet' table in 'Fitness' database
*/
app.get('/getDiet', (req, res, next) => {
  // Query database from all items in 'diet' table
  dbo.query('SELECT * FROM diet', (err, data) => {
    if(err) return next(err); // Throw error if err occurs while querying database

    //After receiving data from database,
    //iterate through data and convert date in each object to desired format (MM DD YYYY)
    //before sending back to the client
    for(let obj of data.rows){
      obj.date = obj.date.toString().slice(4, 15);
    }
    
    return res.status(200).json(data.rows); // If successful, set status to 200 and return json data back to client
  })
});

/*
  POST REQUEST - posts to 'diet' table in 'Fitness' database
*/
app.post('/addDiet', (req, res, next) => {
  const text = "insert into diet (date, food, calories) values ($1, $2, $3)";
  const values = [new Date(), req.body.food, req.body.calories];

  dbo.query(text, values, (err, inputData) => {
    if (err) return next(err);
    return res.status(200).json(inputData);
  });
});

//add comment
app.get('/getUser', (req, res, next) => {
  dbo.query('select * from users', (err, data) => {
    if (err) return next(err);
    //After receiving data from database,
    //iterate through data and convert date in each object to desired format (MM DD YYYY)
    //before sending back to the client
    for(let obj of data.rows){
      obj.date = obj.date.toString().slice(4, 15);
    }
    
    return res.status(200).json(data.rows);
  });
});

/*
  POST REQUEST - posts to 'users' table in 'Fitness' database
*/
app.post('/addUser', (req, res, next) => {
  const text = "insert into users (weight, age, gender, bmi, bmr, height, date) values ($1, $2, $3, $4, $5, $6, $7)";
  const values = [req.body.weight, req.body.age, req.body.gender, req.body.bmi, req.body.bmr, req.body.height, new Date()];
  
  dbo.query(text,values, (err, inputData) => {
    if (err) return next(err);
    return res.status(200).json(inputData);
  });
});

/*
  Middleware to handle unknown routes
  Sets status to 404 and returns back 'not found' message
*/
app.use((req, res, next) => {
  return res.status(404).send('404: NOT FOUND');
});

/*
  Middleware for error handling - are you a teapot?
*/
app.use((err, req, res, next) => {
  if(err) return res.status(418).send(err);
});

const PORT = 5000;

//You're never safe. They're always listening. Hide yo kids. Hide yo wife. 
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT ${PORT}`);
})