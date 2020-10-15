const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const actors = require('./routes/actor');
const movies = require('./routes/movie');
const app = express();

//Configuations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use("/", express.static(path.join(__dirname, "dist/movieAng")));

mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true}, function (err) {
  if (err) {
    return console.log('Mongoose - connection error:', err);
  }
  console.log('Connect Successfully');
});



//Configuring Endpoints

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.put('/movies/:movieID/:actorID', movies.addActor);
app.delete('/movies/:movieId/:actorId', movies.removeActor);
app.get('/movies/:year1/:year2', movies.getAllYear);


//Actor RESTFul endpoionts
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:actorId/:movieId', actors.removeMovie);



app.listen(8080);
