
var path = require('path');
console.log('database is running sqlite3');
var knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./movies.db"
    },
    useNullAsDefault: true
});

module.exports = knex;

knex.ensureSchema = function () {
    return Promise.all([
        knex.schema.hasTable('movies').then(function (exists) {
            if (!exists) {
                knex.schema.createTable('movies', function (table) {
                    table.increments('movie_id').primary();
                    table.string('genre', 50);
                    table.string('actors', 300);
                    table.string('title', 50);
                    table.string('year', 6);
                    table.string('rating', 15);
                }).then(function () {
                    console.log('Created movies table.');
                });
            }
        })

    ]);
};
// selects movie by id
knex.selectMovie = function (movieid) {
    return knex('movies').where({ movie_id: movieid }).select();
};

//select all movies 
knex.selectAllMovies = function () {
    return knex('movies').select();
};

knex.searchMovies = function(term){
    var query = "select * from movies where movies.title like '%"+term+"%'";
 return  knex.raw(query); 
};

knex.insertMovie = function (movie) {
    return knex.insert({
        genre: movie.genre,
        actors: movie.actors,
        title: movie.title,
        year: movie.year,
        rating: movie.rating
    })
        .into('movies');

};

//delete movie by id
knex.deleteMovie = function (movieid) {
   
    return knex('movies').del().where({ movie_id: movieid });
};

//close database connection
knex.closeDb = function () {
    knex.destroy().then(function () {
        console.log("Closed db connection");
    });
};