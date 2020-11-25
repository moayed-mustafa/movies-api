
/**Data base Logic */

const db = require('./db');
class MovieModel{
    static async vote(delta, direction, title) {


        const movieExist = await db.query(`SELECT * FROM movies WHERE title = $1`, [title])
        console.log(movieExist.rows.length)
        if (movieExist.rowCount === 0) {
            if (direction == 'up') {
                await db.query(
                    `INSERT INTO movies
                        (title, thumbs_up)
                        VALUES ($1, $2)
                    `,
               [title, delta] )
            } else {
                await db.query(
                    `INSERT INTO movies
                        (title, thumbs_down)
                        VALUES ($1, $2)
                    `,
               [title, 1])
            }


        } else {
            if (direction == "up") {
                await db.query(`
                    UPDATE movies
                    SET thumbs_up = thumbs_up + $1
                    WHERE title = $2
                `, [delta, title])
            } else {
                await db.query(`
                    UPDATE movies
                    SET thumbs_down = thumbs_down - $1
                    WHERE title = $2
                `, [delta, title])
            }
            }
    }
}

module.exports = MovieModel
