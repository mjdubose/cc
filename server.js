'use strict';
let Server = require('./src/server.js');
let express = require('express');
let path = require('path');
let app = Server.app();
let db = require('./database/db.js');
db.ensureSchema();

app.use('/', express.static(path.join(__dirname, "../public")));

app.route('/movies/all')
    .get(async (req, res) => {
        try {
            let movies = await db.selectAllMovies();
            res.status(200).send(movies);
        } catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    });


app.route('/movies')
    .get(async (req, res) => {
        try {
            let id = req.query.id;
            let movie = await db.selectMovie(id);
            res.status(200).send(movie);
        } catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    });

app.route('/movies/add')
    .post(async (req, res) => {
        try {
            let movie = {};
            movie.genre = req.query.genre;
            movie.actors = req.query.actors;
            movie.year = req.query.year;
            movie.rating = req.query.rating;
            movie.title = req.query.title;
            await db.insertMovie(movie);
            res.sendStatus(200);
        } catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }

    });

app.route('/movies/search')
    .get(async (req, res) => {
        try {
            let term = req.query.term;
            let result = await db.searchMovies(term);
            res.status(200).send(result);

        } catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }

    });


app.route('/movies/delete')
    .delete(async (req, res) => {

        let id = req.query.id;
        await db.deleteMovie(id);
        try {
            res.sendStatus(200);
        } catch (err) {
            console.log(err.message);
            res.sendStatus(404);
        }
    });

console.log('running on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);