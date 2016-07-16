'use strict';
var Server = require('./src/server.js');
var express = require('express');
var path = require('path');
var app = Server.app();
var db = require('./database/db.js');
db.ensureSchema();

app.use('/', express.static(path.join(__dirname, "../public")));
//http://localhost:3000/movies/all
app.route('/movies/all')
    .get(function (req, res) {
        db.selectAllMovies()
            .then(function (movies) {
                res.status(200).send(movies);
            });
    });

//http://localhost:3000/movies?id=1
app.route('/movies')
    .get(function (req, res) {

        var id = req.query.id;
  
        db.selectMovie(id)
            .then(function (movie) {
          
                res.status(200).send(movie);
            });
    });
//http://localhost:3000/movies/add?genre='western'&actors='will smith'&year='1979'&rating='5 stars'&title='made up'
app.route('/movies/add')
    .post(function (req, res) {
        var movie = {};
        movie.genre = req.query.genre;
        movie.actors = req.query.actors;
        movie.year = req.query.year;
        movie.rating = req.query.rating;
        movie.title = req.query.title;
        db.insertMovie(movie)
            .then(function () {
                res.sendStatus(200);
            })
    });
//http://localhost:3000/movies/search?term='made'
app.route('/movies/search')
    .get(function (req, res) {
        var term = req.query.term;

        db.searchMovies(term)
            .then(function (result) {
                res.status(200).send(result);
            })
    });

//http://localhost:3000/movies/delete?id=1
app.route('/movies/delete')
    .delete(function (req, res) {
     
        var id = req.query.id;
        db.deleteMovie(id)
            .then(function () {
                res.sendStatus(200);
            }).catch(function (err) {
                console.log(err.message);
                res.sendStatus(404);
            })
    });

console.log('running on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);