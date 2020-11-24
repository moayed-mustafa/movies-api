
/** API abstracts the HTTP requests away from the routing logic
 *  Each funciton will make a request to hte intended destination
 * and return the result back to the routes.
 */

const axios = require('axios')
require('dotenv').config()

const API_KEY = process.env.API_KEY;

class MoviesApi{

    static async searchMovie(movie) {
        try {
            const test_req = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${movie}&page=1&language=en-US`)
            return test_req.data.results
        } catch (e) {
            console.log(e)
        }
    }

    static async getMovie(movie_id) {
        try {
            const test_req = await axios.get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
            return test_req.data
        } catch (e) {
            console.log(e)
        }


    }
}

module.exports = MoviesApi