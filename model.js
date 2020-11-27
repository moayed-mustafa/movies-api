
/**Database Logic */

const db = require('./db');
class MovieModel{
    static async vote(delta, direction, title) {
        const movieExist = await db.query(`SELECT * FROM movies WHERE title = $1`, [title])
        if (movieExist.rows.length === 0) {
            if (direction == 'up') {
                await db.query(
                    `INSERT INTO movies
                    (title, thumbs_up)
                    VALUES ($1, $2)
                    `, [title, delta])

            } else {
                await db.query(
                    `INSERT INTO movies
                    (title, thumbs_down)
                    VALUES ($1, $2)
                    `, [title, 1])
            }
        } else {
            if (direction == "up") {
                await db.query(`
                    UPDATE movies
                    SET thumbs_up = thumbs_up + $1
                    WHERE title = $2`, [delta, title])

            } else {
                await db.query(`
                    UPDATE movies
                    SET thumbs_down = thumbs_down - $1
                    WHERE title = $2`, [delta, title])
            }
        }

    }

    static async getVotes(title) {
        const movieExist = await db.query(`SELECT * FROM movies WHERE title = $1`, [title]);
        if (movieExist.rows.length === 0) {
            return {message: "movie does not exist", movieExist: false}
        }
        else {
            const res = await db.query(`SELECT thumbs_up, thumbs_down FROM movies
            WHERE title = $1`, [title])
            return {movieExist: true, votes: res.rows[0]}
        }

    }
}

module.exports = MovieModel
