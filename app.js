//  This is the main app

const express = require('express');
const app = express()
const cors = require('cors');
app.use(express.json())
app.use(cors())
const MoviesApi = require('./API')
const ExpressError = require('./expressError')



/** GET a list of movies by title */
app.get('/:movie', async (req,res, next) => {
    try {
        const {movie }= req.params
        const movies = await MoviesApi.searchMovie(movie)
        return res.send(movies)

    } catch (e) {
        return next(new ExpressError("Something went wrong", 404))
    }

})
/** GET a movie by id */

app.get('/movie/:id', async (req,res, next) => {
    try {
        const {id} = req.params
        const movie = await MoviesApi.getMovie(id)
        return res.send(movie)

    } catch (e) {
        return next(new ExpressError("Something went wrong", 404))

    }

})

/** 404 handler */

app.use((req, res, next)=> {
    const err = new ExpressError("Not Found", 404);
    return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
    res.status(err.status || 500);

    return res.json({
      message: err.message,
    });
  });

module.exports = app