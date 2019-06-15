const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const serverController = require('./controllers/serverController.js');

app.use(cors()); // Cors middleware because cors sucks
app.use(bodyParser.json({ extended: true })); // Handle requests containing JSON data

/*
  Default GET root URL - serves 0 purpose
*/
app.get('/', (req, res) => {
  res.status(200).send('WOOO');
});

/*
  GET REQUEST - queries psql database for all items contained in 'exercises' table in 'Fitness' database
*/
app.get('/getExercises', serverController.getExercises, (req, res, next) => {
  return res.status(200).json(res.locals.exerciseData);
});

/*
  POST REQUEST - posts to 'exercises' table in 'Fitness' database
*/
app.post('/addExercise', serverController.addExercise, (req, res, next) => {
  return res.status(200).send('SUCCESSFUL ADDED EXERCISE');
});

/*
  GET REQUEST - queries psql database for all items contained in 'diet' table in 'Fitness' database
*/
app.get('/getDiet', serverController.getDiet, (req, res, next) => {
  return res.status(200).json(res.locals.dietData);
});

/*
  POST REQUEST - posts to 'diet' table in 'Fitness' database
*/
app.post('/addDiet', serverController.addDiet, (req, res, next) => {
  return res.status(200).send('SUCCESSFULLY ADDED DIET ITEM');
});

/*
  GET REQUEST - queries psql database for all items contained in 'user' table in 'Fitness' database
*/
app.get('/getUser', serverController.getUser ,(req, res, next) => {
  return res.status(200).json(res.locals.userInfo);
});

/*
  POST REQUEST - posts to 'users' table in 'Fitness' database
*/
app.post('/addUser', serverController.addUser, (req, res, next) => {
  return res.status(200).send('SUCCESSFULLY ADDED USER DATA');
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