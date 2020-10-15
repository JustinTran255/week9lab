const mongoose = require('mongoose');
const Actor = require('../models/actor');
const Movie = require('../models/movie');

module.exports = {

    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        })
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    //Delete a movie by its ID
    deleteOne: function(req, res){
      let movieID = new mongoose.Types.ObjectId(req.params.id);
      Movie.findOneAndDelete({_id: movieID }, req.body.id, function(err){
          if (err) return res.status(400).json(err);
          res.json();
      });
  },
    //Remove an actor from the list of actors in a movie
    removeActor: function (req, res) {
        Movie.updateOne({ _id: req.params.movieID}, { $pull: { actors: req.params.actorID } }, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    //GET movie made between two dates
    getAllYear: function (req, res) {
        Movie.where('year').gte(req.params.y1).lte(req.params.y2).exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);

        });
    },
    //PUT actor to movie
    addActor: function(req, res){
      Movie.findOne({ _id : req.params.movieID }, function (err, movie) {
          if (err) return res.status(400).json(err);
          if (!movie) return res.status(404).json();
          Actor.findOne({ _id : req.params.actorID }, function (err, actor) {
              if (err) return res.status(400).json(err);
              if (!actor) return res.status(404).json();
              actor.movies.push(movie._id);
              actor.save(function (err) {
                  if (err) return res.status(500).json(err);
                  res.json(actor);
              });
          })
      });
  },

};
